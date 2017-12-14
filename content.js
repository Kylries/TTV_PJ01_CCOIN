var calibrating = 0;
var delay_click = 3000;
var count = 2;
var delay_out_of_min;
var delay_out_of_second;
var delay_click_again;
getSavedValue("timecalibrate",(valueReturn) => {
   if (valueReturn)
   {
       calibrating = valueReturn;
   }
   else
   {
       calibrating = 500;
   }
   console.log(calibrating);
});
getSavedValue("timeclick",(valueReturn) => {
   if (valueReturn)
   {
       count = valueReturn;
   }
   else
   {
       count = 2;
   }
   console.log(count);
});
restart();
function out_of_min() 
{
    clearInterval(delay_out_of_min);
    mm = parseInt(document.getElementById("ico-open-mm").textContent, 10);
    if(mm>0){
        ss = parseInt(document.getElementById("ico-open-ss").textContent, 10);
        console.log(ss);
        delay_out_of_second = setInterval(out_of_second, ss*1000-calibrating);
    }
    else
    {
        restart();
    }
};
function out_of_second()
{
    clearInterval(delay_out_of_second);
    document.querySelectorAll("button[type='submit']")[0].click();
    delay_click_again = setInterval(click_button, delay_click);
};

function click_button()
{
    document.querySelectorAll("button[type='submit']")[0].click();
    count = count - 1;
    if(count ==0 )
    {
        clearInterval(delay_click_again);
        restart();
    }
};

function restart()
{
    var delay = 1000000;
    count = 2;
    //hh = parseInt(document.getElementById("ico-open-hh").textContent, 10);
    //mm = parseInt(document.getElementById("ico-open-mm").textContent, 10);
    //ss = parseInt(document.getElementById("ico-open-ss").textContent, 10);var hh=0;
    var hh=0;
    var mm=1;
    var ss =10;

    delay = hh*3600 + mm*60 + ss;
    if(delay >30)
        delay = delay - 30;
    else
        delay = 1;
    delay_out_of_min = setInterval(out_of_min, delay*1000);
    console.log(delay);
}
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