 chrome.tabs.create

 chrome.browserAction.onClicked.addListener(function(tab) {
	 console.log("run background");
      chrome.tabs.executeScript({file: "content.js"});
});