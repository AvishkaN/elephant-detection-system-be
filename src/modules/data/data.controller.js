const dataService = require("./data.service");
const {
  successWithData,
  customError,
} = require("../../services/response.service");

module.exports.saveData = async (req, res) => {
  try {
    const data = await dataService.saveData(req.body);
    return successWithData(data, res);
  } catch (error) {
    return customError(`${error}`, res);
  }
};

module.exports.getData = async (req, res) => {
  try {
    const data = await dataService.getData(req.query);
    return successWithData(data, res);
  } catch (error) {
    return customError(`${error}`, res);
  }
};
module.exports.getDataReportData = async (req, res) => {
  try {
    const data = await dataService.getReportData(req.query);
    return successWithData(data, res);
  } catch (error) {
    return customError(`${error}`, res);
  }
};
