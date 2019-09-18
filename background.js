const settings = {
  oldName: '',
  newName: '',
  enabled: false
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSettings') {
    sendResponse(settings);
  }
});

browser.storage.local.get(settings, (res) => {
  if (res.oldName) {
    settings.oldName = res.oldName;
  }
  if (res.newName) {
    settings.newName = res.newName;
  }
});
