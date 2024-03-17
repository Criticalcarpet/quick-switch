let toggle = false;

/**
 * @description To create tabs from listening to the injected script and message the script to remove itself
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "performAPIOperation") {
    chrome.tabs.create({ url: message.url });
    chrome.action.setIcon({ path: "icons/icon-16.png" });
    chrome.tabs.sendMessage(sender.tab.id, { message: "remove" });
  }
});

/**
 * @description To toggle the quick switch feature
 * @var toggle @type {Boolean} - true if the quick switch feature is on, false otherwise.
 * @var tabResult @type {Array} - data of the current focused tab
 * @var tabId @type {Number} - id of the current focused tab
 */
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
        target: { tabId: tabId, allFrames: true },
        files: ["scripts/inject.js"],
      });
      chrome.tabs.sendMessage(tabId, { message: toggle });
      toggle = false;
    } else {
      chrome.action.setIcon({ path: "icons/icon-16.png" });
    }
  }
});
