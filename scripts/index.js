let version = chrome.runtime.getManifest().version;
document.getElementById(
  "title"
).textContent = `Welcome to Quick Switch v${version}`;

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
  location.reload();
});

document.getElementById("removeButton").addEventListener("click", async () => {
  // get the current focused tab's URL
  let tabTitle = prompt("Enter website name");
  chrome.storage.local.remove(tabTitle);
  location.reload();
});
