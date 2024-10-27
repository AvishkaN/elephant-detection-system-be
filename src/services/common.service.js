require("dotenv").config();

module.exports.setLimitToPositiveValue = (limit, recordsTotal) => {
  let positiveLimit;
  if (!limit || limit <= 0 || Number.isNaN(limit)) {
    if (recordsTotal > 0) {
      positiveLimit = recordsTotal;
    } else {
      positiveLimit = 1;
    }
  } else {
    positiveLimit = limit;
  }

  return positiveLimit;
};
