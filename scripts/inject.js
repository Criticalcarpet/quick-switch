// Listen for any keypress of numbers by user and toggle
let receivedData;
(async () => {
  await chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Access the data passed from the background script
    receivedData = message.message;
    if (receivedData === "remove") {
        receivedData = false
        return
    }
  });

  window.addEventListener("keydown", async (event) => {
    if (receivedData) {
      if (event.key >= 0 && event.key <= 9) {
        await chrome.storage.local.get(null, (items) => {
          let allKeys = Object.keys(items);
          for (let i = 0; i < allKeys.length; i++) {
            if (items[allKeys[i]]["shortcut"] == event.key) {
              if (receivedData) {
                // chrome.tabs.create({ url: items[allKeys[i]]["url"] });
                chrome.runtime.sendMessage({ action: 'performAPIOperation', url: items[allKeys[i]]["url"] });
              } 
            }
          }
        });
      }
    }
  });
})();
