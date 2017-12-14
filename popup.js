function StartClick(){
	document.getElementById("timeclick").setAttribute("value", "click!");
	saveValue("timecalibrate",document.getElementById("timecalibrate").value);
	saveValue("timeclick",document.getElementById("timeclick").value);
	chrome.tabs.executeScript({file: "content.js"});
	window.close();
};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("Start").addEventListener('click', StartClick);
    getSavedValue("timecalibrate",(valueReturn) => {
        if (valueReturn)
	    {
	        document.getElementById("timecalibrate").value = valueReturn;
        }
	    else
	    {
	        document.getElementById("timecalibrate").value = 500;
	    }
    });
	getSavedValue("timeclick",(valueReturn) => {
    if (valueReturn)
	{
	    document.getElementById("timeclick").value = valueReturn;
    }
	else
	{
	    document.getElementById("timeclick").value = 2;
	}
    });
});
function saveValue(key, value) {
  var items = {};
  items[key] = value;
  chrome.storage.sync.set(items);
}
function getSavedValue(key, callback) {
  chrome.storage.sync.get(key, (items) => {
    callback(items[key]);
  });
}