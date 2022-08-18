const buttonColors=["red", "blue", "green", "yellow"]
var gamePattern=[];
var userClickedPattern=[];
var level=0;

$(document).keypress(function (e) {
    nextSequence();
});

function nextSequence(){
 var randomNumber=Math.floor(Math.random()*4);
 var randomChosenColor=buttonColors[randomNumber];
 gamePattern.push(randomChosenColor);

 console.log(gamePattern);

 $("#"+randomChosenColor).animate({opacity:0.2});
    setTimeout(100);
 $("#"+randomChosenColor).animate({opacity:1});

 playSound(randomChosenColor);

 $("h1").text("Level "+level)
 level=level+1;
}

$(".btn").click(function (e) {
    var userChosenTarget=$(e).attr("target");
    var userChosenColor=$(userChosenTarget).attr("id");

    console.log(userChosenColor);

    animateClick(userChosenColor);
    playSound(userChosenColor)

    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
});

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animateClick(name)
{
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed")},100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("true")
        if(currentLevel+1===level)
        {
            userClickedPattern=[];
            console.log(userClickedPattern);
            setTimeout(nextSequence,1000);
        }
    }
    else
    {
        console.log("false")
        gameOver();
    }
}

function gameOver(){ //gameOver animation and starts a new game
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}