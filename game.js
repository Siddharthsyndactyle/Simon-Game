var gamePattern=[];
var userClickedPattern=[]
var buttonColors=['red','blue','green','yellow'];
var level=0;
var step=0;
function nextSequence()
{
    randomNumber=Math.floor(Math.random()*3);
    playSound(buttonColors[randomNumber]);
    animatePress(buttonColors[randomNumber]);
    if(level!=0)
    {
        $("h1").text("Level "+(level++));
    }
    else{
        level++;
    }
    return randomNumber;
}
$(".btn").on("click",function(event)
{
    var a=event.target;
    userChosenColor=$(a).attr("class").slice(4,);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if(userClickedPattern[step]==gamePattern[step])
    {
        step++;
        if(step==level)
        {
            setTimeout(function () {

                randomChosenColor=buttonColors[nextSequence()];
                gamePattern.push(randomChosenColor);
                userClickedPattern=[];
                step=0;
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
        level=0;
        gamePattern=[];
        userClickedPattern=[];
        step=0;
    }
    
})
function playSound(a)
{
    var ar=new Audio("sounds/"+a+".mp3");
    ar.play();
}
function animatePress(ar) {
    $("."+ar).addClass("pressed");
    setTimeout(function () {
        $("."+ar).removeClass("pressed")
    },100);
}
$(document).on("keypress",function () {
    if(level==0)
    {
        $("h1").text("Level "+level);
        randomChosenColor=buttonColors[nextSequence()];
        gamePattern.push(randomChosenColor);
    }
});


