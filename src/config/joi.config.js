const joi = require("joi");

module.exports.maxRecords = 100;

module.exports.id = joi.object().keys({
  id: joi.string().alphanum().min(24).max(24).required(),
});

module.exports.pagination = (maxLimit) => {
  return {
    limit: maxLimit
      ? joi.number().integer().min(1).max(maxLimit).required()
      : joi.number().integer().min(0).required(),
    page: joi.number().integer().min(1).required(),
    column: joi.number().integer().min(-1),
    order: joi.string().valid("asc", "desc", null, ""),
    search: joi.string().allow(null, ""),
    _id: joi.string().alphanum().min(24).max(24),
  };
};

module.exports.paginationSchema = (maxLimit) => {
  return joi.object().keys({
    ...this.pagination(maxLimit),
  });
};
