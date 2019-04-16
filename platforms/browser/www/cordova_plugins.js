cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-sms-plugin/www/sms.js",
        "id": "cordova-sms-plugin.Sms",
        "pluginId": "cordova-sms-plugin",
        "clobbers": [
            "window.sms"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-sms-plugin": "1.0.0"
}
// BOTTOM OF METADATA
});