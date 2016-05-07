document.body.addEventListener('click', evt => {
  var dataset = evt.target.dataset;
  if (dataset.proxy !== undefined) {
    self.port.emit("proxy-switch", dataset.proxy);
  } else if (dataset.link) {
    self.port.emit("link", dataset.link);
  }
});
self.port.on("proxy", name => {
  for (var elem of document.querySelectorAll("button")) {
    var active = elem.dataset.proxy === name;
    elem.classList.toggle("active", active);
  }
});
