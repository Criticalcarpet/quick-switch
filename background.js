chrome.commands.onCommand.addListener((command) => {
    let toggle = false;
    if(command === "quick-switch") {
      
      toggle = !toggle;
      if(toggle) {
         chrome.action.setIcon({path: "icons/active-16.png"});
      } else {
        chrome.action.setIcon({path: "icons/icon-16.png"});
      }
      // default to off after 5 seconds
      setTimeout(() => {
        if(toggle) {
          toggle = false;
          chrome.action.setIcon({path: "icons/icon-16.png"});
        }
      }, 5000);
    }
  });