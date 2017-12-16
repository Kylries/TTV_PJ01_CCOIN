var calibrating = 0;
var delay_click = 5000;
var count = 2;
var delay_out_of_min;
var delay_out_of_second;
var delay_click_again;
var delay_precision_ms;
var precision = true;
var target_ss = 0;
var hh=0;
var mm=0;
var ss =50;
start();
getSavedValue("timecalibrate",(valueReturn) => {
   if (valueReturn)
   {
       calibrating = parseInt(valueReturn,10);
   }
   else
   {
       calibrating = 500;
   }
   console.log("Calibrating: " + calibrating + "ms");
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
   console.log("Times Click: " + count);
});
function getSavedValue(key, callback) {
  chrome.storage.sync.get(key, (items) => {
    callback(items[key]);
  });
}
function out_of_min() 
{
    clearInterval(delay_out_of_min);
    target_ss = parseInt(document.getElementById("ico-open-ss").textContent, 10) -1;
    if(precision)
    {
        delay_precision_ms = setInterval(precision_ms, 10);
        console.log("Precision miliseconds mode");
    }
    else
    {
        delay_out_of_second = setInterval(out_of_second, ss*1000+calibrating);
        console.log("Precision seconds mode");
    }
};
function precision_ms()
{
    console.log("target: "+target_ss);
    ss = parseInt(document.getElementById("ico-open-ss").textContent, 10);
    console.log("curent: "+ss);
    if(ss===target_ss)
    {
        console.log("get precision done");
        clearInterval(delay_precision_ms);
        delay_out_of_second = setInterval(out_of_second, ss*1000+calibrating);
    }
}
function out_of_second()
{
    clearInterval(delay_out_of_second);
    click_button();
    delay_click_again = setInterval(click_button, delay_click);
};

function click_button()
{
    document.querySelectorAll("button[type='submit']")[0].click();
    count = count - 1;
    console.log("Click Buy");
    if(count ==0)
    {
        clearInterval(delay_click_again);
        console.log("Done");
    }
};

function start()
{
    var delay = 1000000;
    count = 2;
    //var hh = parseInt(document.getElementById("ico-open-hh").textContent, 10);
    //var mm = parseInt(document.getElementById("ico-open-mm").textContent, 10);
    //var ss = parseInt(document.getElementById("ico-open-ss").textContent, 10);
    hh=0;
    mm=0;
    ss =50;

    delay = hh*3600 + mm*60 + ss;
    if(delay >20)
        delay = delay - 20;
    else
        delay = 1;
    delay_out_of_min = setInterval(out_of_min, delay*1000);
    console.log("Time delay: " + delay + "s");
}