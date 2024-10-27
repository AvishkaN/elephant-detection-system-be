module.exports.save = (body) =>
  new Promise((resolve, reject) => {
    body
      .save()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports.findOne = (model, query, projection) =>
  new Promise((resolve, reject) => {
    model
      .findOne(query, projection)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports.updateOne = (model, query, body, options) =>
  new Promise((resolve, reject) => {
    model
      .findOneAndUpdate(query, body, options)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports.insertMany = (model, body, options) =>
  new Promise((resolve, reject) => {
    model
      .insertMany(body, options)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
