const app = require("./api/auth");

module.exports = (req, res) => {
  app(req, res);
};
