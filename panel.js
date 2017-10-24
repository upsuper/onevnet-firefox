async function main() {
  let bg = await browser.runtime.getBackgroundPage();

  document.body.addEventListener('click', async function(evt) {
    let dataset = evt.target.dataset;
    if (dataset.proxy !== undefined) {
      await bg.switchProxy(dataset.proxy);
      updateButton();
    } else if (dataset.link) {
      browser.tabs.create({url: dataset.link});
    }
    window.close();
  });

  function updateButton() {
    for (let elem of document.querySelectorAll("button")) {
      let active = elem.dataset.proxy === bg.currentProxy;
      elem.classList.toggle("active", active);
    }
  }

  updateButton();
}

main();
