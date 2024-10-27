const mongoose = require("mongoose");
require("dotenv").config();
const repository = require("../../services/repository.service");
const itemModel = require("./sended-notifications.model");

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
  const { limit, page, address, type } = body;

  const filter = address ? { address } : {};

  if (type) {
    filter["type"] = type;
  }

  const pageLimit = parseInt(limit);
  const pageNumber = parseInt(page);
  const skip = (pageNumber - 1) * pageLimit; // Calculate the number of documents to skip

  const transactions = await itemModel
    .find(filter)
    .sort({ updated_at: -1 })
    .skip(skip)
    .limit(pageLimit);

  const totalDocuments = await itemModel.countDocuments({});

  const filteredDocuments = await itemModel.countDocuments(filter);

  return {
    records: transactions,
    recordsTotal: totalDocuments,
    recordsFiltered: filteredDocuments,
  };
};
