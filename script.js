
var active = 0;

var level = 0;

var userClickedPattern = [];

var gamePattern = [];

const buttonColors = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
    if(active === 0){
        active = 1
        nextSequence()
    }
})

function nextSequence(){


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).animate({
            opacity: '0.25'
        },150).animate({
            opacity : '1'
        },150);
    playSound(randomChosenColor)

    
    level++
    $("h1").text("level "+ level)
    
    userClickedPattern = []
}

$(".btn").click(function (){
    var userChosenColor = this.id
    if(active===1){
        userClickedPattern.push(userChosenColor)
        checkPattern(level)
    }
    animatePress(userChosenColor)
    playSound(userChosenColor)
})



function checkPattern(currentLevel){
        if(userClickedPattern[userClickedPattern.length-1] != gamePattern[userClickedPattern.length-1]){
            $("h1").text("game over")
            $(".Score").text(Math.max(currentLevel,Number($(".Score").text())))
            $("body").addClass("game-over")
            setTimeout(function(){
                $('body').removeClass("game-over")
            },200)
            setTimeout(function(){playSound("wrong")},150)
            active = 0
            level = 0
            userClickedPattern = []
            gamePattern = []
        } else {
            if(userClickedPattern.length === currentLevel){
            setTimeout(function(){nextSequence()},500)
        }
    }
}

function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("."+currentColor).addClass("pressed")
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed")
    },100)
}

