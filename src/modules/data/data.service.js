const mongoose = require("mongoose");
require("dotenv").config();
const repository = require("../../services/repository.service");
const itemModel = require("./data.model");
const axios = require("axios");

const sliceNumber = 11;

function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = now - past;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return years === 1 ? "1 year ago" : `${years} years ago`;
  if (months > 0) return months === 1 ? "1 month ago" : `${months} months ago`;
  if (days > 0) return days === 1 ? "1 day ago" : `${days} days ago`;
  if (hours > 0) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  if (minutes > 0)
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  return seconds <= 1 ? "Just now" : `${seconds} seconds ago`;
}

function getAverageTimeDifference(data) {
  // Helper function to parse Timestamp and get Date objects
  const getDateFromTimestamp = (timestamp) =>
    new Date(timestamp.replace(" ", "T"));

  // Calculate time differences
  const timeDiffs = [];
  for (let i = 1; i < data.length; i++) {
    const prevDate = getDateFromTimestamp(data[i - 1].Timestamp);
    const currentDate = getDateFromTimestamp(data[i].Timestamp);
    const timeDiff = currentDate - prevDate; // Difference in milliseconds
    timeDiffs.push(timeDiff);
  }

  // Calculate the average difference in milliseconds
  const avgTimeDiff =
    timeDiffs.reduce((sum, diff) => sum + diff, 0) / timeDiffs.length;

  // Convert milliseconds to human-readable format
  const formatTimeDifference = (diff) => {
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;

    if (months >= 1) return `${Math.round(months)} month`;
    if (days >= 1) return `${Math.round(days)} day`;
    if (hours >= 1) return `${Math.round(hours)} hour`;
    if (minutes >= 1) return `${Math.round(minutes)} minute`;
    return `${Math.round(seconds)} second`;
  };

  return formatTimeDifference(avgTimeDiff);
}

module.exports.saveData = async (body) => {
  const { name, email, company, phone, distance } = body;

  let data = {
    name,
    email,
    company,
    phone,
    distance,
  };

  const dataTransaction = new itemModel(data);

  const saveResult = await repository.save(dataTransaction);

  return saveResult;
};

module.exports.getData = async (body) => {
  // const data = await dataService.getData(req.query);

  const response = await axios.get(process.env.SYSTEM_DEFAlT_GET_ALL, {
    params: body, // Pass the `body` as query parameters
  });

  data = response.data;

  const totalDetectedCount = data.filter(
    (item) => item.Status === "True"
  ).length;

  console.log(`Total Detected Count: ${totalDetectedCount}`);

  const hourlyDetections = {};

  const FRUITS = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
  const citrus = FRUITS.slice(1, 3);

  data.slice(0, sliceNumber).forEach((item) => {
    const hour = item.Timestamp.slice(0, 13); // Extract YYYY-MM-DD HH
    if (item.Status === "True") {
      hourlyDetections[hour] = (hourlyDetections[hour] || 0) + 1;
    }
  });

  const hours = Object.keys(hourlyDetections).map((hour) => `${hour}:00`);
  const detectionCounts = Object.values(hourlyDetections);

  console.log("Hours:", hours);
  console.log("Detection Counts:", detectionCounts);

  const dailyDetections = {};

  data.slice(0, sliceNumber).forEach((item) => {
    const date = item.Timestamp.slice(0, 10); // Extract YYYY-MM-DD
    if (item.Status === "True") {
      dailyDetections[date] = (dailyDetections[date] || 0) + 1;
    }
  });

  const dates = Object.keys(dailyDetections);
  const dailyDetectionCounts = Object.values(dailyDetections);

  const detections = data.filter((item) => item.Status === "True");

  const lastDetection = timeAgo(detections[detections.length - 1].Timestamp);
  const avgTime = getAverageTimeDifference(data);

  const lastObj = {
    totalDetectedCount: totalDetectedCount,
    hourlyDetections: {
      hours: hours,
      detectionCounts: detectionCounts,
    },
    dailyDetectionCount: {
      dates: dates,
      detectionCounts: dailyDetectionCounts,
    },
    lastDetection: lastDetection,
    avgTimeDifference: avgTime,
    // env_conditions_during_detections: {
    //   temperatures: temperatures,
    //   humidities: humidities,
    //   luxLevels: luxLevels,
    // },
    // avgTimeBetweenDetections: avgTimeBetweenDetectionsFormatted,
    // lastDetectionTime: lastDetectionTimeFormatted,
  };

  console.log("lastObj:", lastObj);

  return {
    data: lastObj,
  };
};

module.exports.getReportData = async (body) => {
  try {
    // Replace 'https://api.example.com/data' with your actual API endpoint
    const response = await axios.get(
      "http://iotprojects.mypressonline.com/php/get_data.php",
      {
        params: {
          // Include any query parameters from 'body' if needed
          // Example: key: body.key
        },
        headers: {
          // Include any headers if required
          // Example: Authorization: `Bearer ${body.token}`
        },
      }
    );

    console.log(response);

    return {
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw new Error("Failed to fetch report data"); // Handle the error as needed
  }
};
