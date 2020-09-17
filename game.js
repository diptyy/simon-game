var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "yellow", "green"];
var level = 0;

start();

function start(){
  $(document).one("keydown", function(){
  $("h1").text("Level 0");
  nextSequence();
})
}

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var chosenButton = "#" + randomChosenColour;
  $(chosenButton).fadeOut(150).fadeIn(150);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  level++ ;
}

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  var userAnswer = userClickedPattern.length - 1;
  checkAnswer(userAnswer);
});

function playSound(name){
  var clickSound = "sounds/" + name + ".mp3";
  var audio = new Audio(clickSound);
  audio.play();
}

function animatePress(currentColour){
var clickedButton = "#" + currentColour;
$(clickedButton).addClass("pressed");
setTimeout(function(){
  $(clickedButton).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  console.log("Success");
  if (gamePattern.length === userClickedPattern.length){
    setTimeout(function(){
      nextSequence()
    }, 1000);
    userClickedPattern = [];
  }
} else {
  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start();
}
