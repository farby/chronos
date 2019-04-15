cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-sms-plugin.Sms",
      "file": "plugins/cordova-sms-plugin/www/sms.js",
      "pluginId": "cordova-sms-plugin",
      "clobbers": [
        "window.sms"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-sms-plugin": "1.0.0"
  };
});