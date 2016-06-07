var Appbase = require("appbase-js");
var config = {
  "appname": "bitcoin-price-monitoring",
  "username": "Fww0TsmAN",
  "password": "41d86ed1-d2b9-4797-9310-724a8a650b80",
  "type": "prices"
};
var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: config.appname,
  username: config.username,
  password: config.password
});

exports.appbaseRef = appbaseRef;
exports.config = config;
