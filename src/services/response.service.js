module.exports = {
  successWithData(data, res) {
    return res.json({
      status: true,
      data,
    });
  },

  successWithMessage(message, res) {
    return res.json({
      status: true,
      msg: message,
    });
  },
  customError(message, res) {
    return res.status(422).json({
      status: false,
      msg: message,
    });
  },
};
