const joi = require("joi");

const maxLimit = 100;

module.exports.saveData = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().required(),
  company: joi.string().required(),
  phone: joi.string(),
  distance: joi.number().required(),
});

module.exports.getData = joi.object().keys({
  limit: maxLimit
    ? joi.number().integer().min(0).max(maxLimit).required()
    : joi.number().integer().min(0).required(),
  page: joi.number().integer().min(1).required(),
  column: joi.number().integer().min(-1),
  order: joi.string().valid("asc", "desc", null, ""),
});
