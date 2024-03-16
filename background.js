let toggle = false;
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "quick-switch") {
    toggle = !toggle;
    let tabResult = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    let tabId = tabResult[0].id;
    if (toggle) {
      chrome.action.setIcon({ path: "icons/active-16.png" });
      await chrome.scripting.executeScript({
        target: {tabId : tabId, allFrames: true},
        files: ["scripts/inject.js"]
      })
      chrome.tabs.sendMessage(tabId, { message: toggle });
      toggle = false;
    } else {
      chrome.action.setIcon({ path: "icons/icon-16.png" });
    }
  }
});
