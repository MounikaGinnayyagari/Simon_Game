var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = false;

$(".btn").on("click", function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress($(this));
    checkAnswer((userClickedPattern.length) - 1);

});

$(document).on("keydown", function() {

    if(!gameStarted) {
        gameStarted = true;
        nextSequence();
    }

});

function nextSequence() {

    level++;
    $("h1").text("Level " +level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    $("#" +randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function playSound(colorSelected) {

    var audio = new Audio("sounds/" + colorSelected + ".mp3");
    audio.play();

}

function animatePress(currentColor) {

    currentColor.addClass("pressed");
    setTimeout(function() {
        currentColor.removeClass("pressed"); 
    }, 100);

}

function checkAnswer(currentLevel) {
     
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = []; 
            }, 1000);
        }

    }  else {
            console.log("Wrong");
            playSound("wrong");
            animateWrong(this);
            startOver();
    }
}

function animateWrong(selectedWrong) {

    $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over"); 
        }, 200);

    $("h1").text("Game Over, Press Any Key To Restart");

}

function startOver() {

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;

}


