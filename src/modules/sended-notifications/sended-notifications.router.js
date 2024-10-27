const express = require("express");

const {
  validateBody,
  validateQueryParameters,
} = require("../../services/validator.service");
const { permissions } = require("./sended-notifications.permission");
const controller = require("./sended-notifications.controller");
const schema = require("./sended-notifications.schema");

const router = express.Router();

router
  .route(permissions.getData.path)
  .get(validateQueryParameters(schema.getData), controller.getData);

router
  .route(permissions.saveData.path)
  .post(validateBody(schema.saveData), controller.saveData);

module.exports = router;
