/**
 * @description Change the title of default popup to the version in manifest file
 * @var version @type {String} - version of the extension by the manifest file
 */
let version = chrome.runtime.getManifest().version;
document.getElementById(
  "title"
).textContent = `Welcome to Quick Switch v${version}`;

/**
 * @description Get all the data from extension local storage and add it to the table in default popup
 * @var allKeys @type {Array} - all the keys in extension local storage
 */
chrome.storage.local.get(null, (items) => {
  let allKeys = Object.keys(items);
  // set all the table rows
  for (let i = 0; i < allKeys.length; i++) {
    document.getElementById("table").innerHTML +=
      "<tr><td>" +
      allKeys[i] +
      "</td><td>" +
      items[allKeys[i]]["shortcut"] +
      "</td></tr>";
  }
});

/**
 * @description Add data from extension local storage
 * @var tabResult @type {Array} - data of the current focused tab
 * @var tabUrl @type {String} - url of the current focused tab 
 * @var tabTitle @type {String} - title provided the by the user
 * @var tabShortcut @type {Number} - shortcut number provided the by the user
 * @var tabData @type {Object} - data of the current focused tab to be stored in extension local storage
 */
document.getElementById("addButton").addEventListener("click", async () => {
  // get the current focused tab's URL
  let tabResult = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  let tabUrl = tabResult[0].url;
  let tabTitle = prompt("Enter website name");
  let tabShortcut = prompt("Enter shortcut number");
  let tabData = {
    shortcut: tabShortcut,
    url: tabUrl,
  };
  chrome.storage.local.set({ [tabTitle]: tabData });
  // to refresh the table in default popup
  location.reload();
});

/**
 * @description Remove data from extension local storage
 * @var tabTitle @type {String} - title of the data to be removed provided by the user
 */
document.getElementById("removeButton").addEventListener("click", async () => {
  // get the current focused tab's URL
  let tabTitle = prompt("Enter website name");
  chrome.storage.local.remove(tabTitle);
  // to refresh the table in default popup
  location.reload();
});
