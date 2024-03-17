// Listen for any keypress of numbers by user and toggle
let receivedData;

/**
 * @description Listen to the message sent from the background script for remove or toggle feature
 * @var receivedData @type {Boolean} @type {String} - data sent from the background script. boolean for the script to toggle and string for the script to remove
 */
(
  async () => {
    await chrome.runtime.onMessage.addListener(
      (message, sender, sendResponse) => {
        // Access the data passed from the background script
        receivedData = message.message;
        if (receivedData === "remove") {
          receivedData = false;
          return;
        }
      }
    );

    /**
     * @description Listen to the keypress of numbers
     * @var receivedData @type {Boolean} - Look for keypress only if true from the background script
     * @var allKeys @type {Array} - all the keys in extension local storage
     */
    window.addEventListener("keydown", async (event) => {
      if (receivedData) {
        if (event.key >= 0 && event.key <= 9) {
          await chrome.storage.local.get(null, (items) => {
            let allKeys = Object.keys(items);
            for (let i = 0; i < allKeys.length; i++) {
              if (items[allKeys[i]]["shortcut"] == event.key) {
                if (receivedData) {
                  // send the url to the background script to create the tab
                  chrome.runtime.sendMessage({
                    action: "performAPIOperation",
                    url: items[allKeys[i]]["url"],
                  });
                }
              }
            }
          });
        }
      }
    });
  }
)();
