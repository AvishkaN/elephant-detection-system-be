const express = require("express");

const {
  validateBody,
  validateQueryParameters,
} = require("../../services/validator.service");
const { permissions } = require("./notify-users.permission");
const controller = require("./notify-users.controller");
const schema = require("./notify-users.schema");

const router = express.Router();

router
  .route(permissions.getData.path)
  .get(
    validateQueryParameters(schema.getData),
    controller.getData
  );

router
  .route(permissions.saveData.path)
  .post(validateBody(schema.saveData), controller.saveData);

module.exports = router;
