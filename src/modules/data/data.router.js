const express = require("express");

const {
  validateBody,
  validateQueryParameters,
} = require("../../services/validator.service");
const { permissions } = require("./data.permission");
const controller = require("./data.controller");
const schema = require("./data.schema");

const router = express.Router();

router
  .route(permissions.getData.path)
  .get(validateQueryParameters(schema.getData), controller.getData);
router
  .route(permissions.getALReportData.path)
  .get(validateQueryParameters(schema.getData), controller.getDataReportData);

router
  .route(permissions.saveData.path)
  .post(validateBody(schema.saveData), controller.saveData);

module.exports = router;
