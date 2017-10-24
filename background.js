window.currentProxy = "";

async function switchProxy(name) {
  if (name) {
    await browser.proxy.register(`pac/${name}.pac`);
  } else {
    await browser.proxy.unregister();
  }
  currentProxy = name;
}
