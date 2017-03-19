var { ToggleButton } = require('sdk/ui/button/toggle');
var { Panel } = require('sdk/panel');
var prefs = require('sdk/preferences/service');
var tabs = require("sdk/tabs");
var self = require('sdk/self');

const PROXY_AUTOCONFIG_PREF = "network.proxy.autoconfig_url";
const PROXY_TYPE_PREF = "network.proxy.type";
const PROXY_TYPE_DEFAULT = 5; // 使用系统代理设置
const PROXY_TYPE_PAC = 2; // 使用PAC

var button = ToggleButton({
  id: "onenet",
  label: "点击启用或关闭OneVnet服务",
  icon: "./img/128x128.png",
  onChange: state => {
    if (state.checked) {
      panel.show({position: button});
    }
  }
});

var panel = Panel({
  contentURL: "./panel.html",
  contentScriptFile: "./panel.js",
  width: 200,
  height: 485,
  onHide: () => {
    button.state('window', {checked: false});
  }
});
panel.port.on("proxy-switch", switchProxy);
panel.port.on("link", link => {
  tabs.open(link);
  panel.hide();
});

function switchProxy(name = "") {
  if (name) {
    prefs.set(PROXY_AUTOCONFIG_PREF, self.data.url(`pac/${name}.pac`));
    prefs.set(PROXY_TYPE_PREF, PROXY_TYPE_PAC);
  } else {
    prefs.set(PROXY_AUTOCONFIG_PREF, "");
    prefs.set(PROXY_TYPE_PREF, PROXY_TYPE_DEFAULT);
  }
  panel.port.emit("proxy", name);
  panel.hide();
}

switchProxy();
exports.onUnload = reason => {
  switchProxy();
};
