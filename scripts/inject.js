// Listen for any keypress of numbers by user and toggle
let receivedData;
(async () => {
  await chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Access the data passed from the background script
    receivedData = message.message;
    console.log("Received data in injected script:", receivedData);
  });

  window.addEventListener("keydown", (event) => {
    console.log(receivedData)
    if (receivedData) {
      if (event.key >= 0 && event.key <= 9) {
        chrome.storage.local.get(null, (items) => {
          let allKeys = Object.keys(items);
          console.log(allKeys)
          for (let i = 0; i < allKeys.length; i++) {
            if (items[allKeys[i]]["shortcut"] == event.key) {
              if (receivedData) {
                chrome.tabs.create({ url: items[allKeys[i]]["url"] });
                chrome.action.setIcon({ path: "icons/icon-16.png" });
              } else {
                chrome.action.setIcon({ path: "icons/icon-16.png" });
              }
            }
          }
        });
      }
    }
  });
})();
