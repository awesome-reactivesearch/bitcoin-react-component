var Appbase = require("appbase-js");
var config = {
  "appname": "jsfiddle-demo",
  "username": "7eJWHfD4P",
  "password": "431d9cea-5219-4dfb-b798-f897f3a02665",
  "type": "1463991450935"
};
var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: config.appname,
  username: config.username,
  password: config.password
});

exports.appbaseRef = appbaseRef;