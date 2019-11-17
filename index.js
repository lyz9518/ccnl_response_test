//Variables for Button
var cue_remain_times = [100, 2000, 500, 3000, 1000, 2000, 500, 3000];
var record = [];
var cue_color = "red";

//Variables for web
var start = false;
var green_sign = false;

//Variables for Timer
var hour,minute,second;//hr min sec
hour=minute=second=0;//initialization
var millisecond=0;//ms
var int;
var temp_time;



// Timer
function reset_timer()//reset
{
    console.log("reset is done");
    window.clearInterval(int);
    millisecond=hour=minute=second=0;
}

function start_timer()//start the timer
{
    console.log("start is done");
    int=setInterval(timer,1);
}

function timer()//timer algorithm
{
    console.log("timer is done");
    millisecond=millisecond+1;
    if(millisecond>=1000)
    {
    millisecond=0;
    second=second+1;
    }
    if(second>=60)
    {
    second=0;
    minute=minute+1;
    }

    if(minute>=60)
    {
    minute=0;
    hour=hour+1;
    }
    temp_time = hour+":"+minute+":"+second+":"+millisecond;
    console.log(temp_time);
}

function stop_timer()//pause and put the time into the record
{
    console.log("stop is done");
    window.clearInterval(int);
    var node = document.createElement("LI");
    var textnode = document.createTextNode(temp_time);
    node.appendChild(textnode);
    document.getElementById("record_list").appendChild(node);
}


// Buttons
function start_trail() //start the test and start the timer
{
    start = true;
    reset_timer();
    var single_record = 0;
    document.getElementById("start_button").hidden = true;
    setTimeout(function()
        {
            document.getElementById("cue").style.backgroundColor = "green";
            cue_color = "green";
            green_sign = true;
            console.log("weird");
            start_timer();
        }, cue_remain_times.pop());
}

function user_interact() //execute when user hit the button and further stop the timer
{
    if(start==true)
    {
        document.getElementById("cue").style.backgroundColor = "red";

        stop_timer();
        if(cue_remain_times.length>0)
        {
            green_sign = false;
            start_trail(); 
        }
        else
        {
            document.getElementById("test_over_sign").hidden=false;
            start = false;
            green_sign = false;
        }
    }
}



// Detect the spacebar press
document.addEventListener('keyup', (event) => 
{
    if (event.code === 'Space' && start == true && green_sign==true) 
    {
        console.log('Space pressed');
        user_interact();
    }
})