alert("通过鼠标点击，复述被按压下的按钮序列，看看你最多能记忆到第几个！");
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameover = false;
var level = 0;
var curindex = 0;
keyStartListen();

function keyStartListen() {
$(document).keypress(function() {
  if (gameover == false) {
    countDown($("#level-title"),3);
    setTimeout(()=>{

      nextSequence();},3600);
      buttonStartListen();
      $(document).unbind("keypress");
  }
});}



function buttonStartListen() {
  $(".btn").click(function () {
    curindex ++;
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(curindex - 1);
  });
}

function checkAnswer(currentLevel) {
if (currentLevel >= gamePattern.length) {
  gameOver("too many inputs!");
  return;
}
if (userClickedPattern[currentLevel] != gamePattern[currentLevel])
 {
gameOver("wrong sequence!");
}
}

function gameOver(loseMessage) {
  new Audio("sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  $("#level-title").text(loseMessage);
  setTimeout(function () {$("body").removeClass("game-over")},200);
  setTimeout(function () {$("#level-title").text("Game Over, Press Any Key to Restart");},2000);
  $(".btn").unbind("click");
  initial();
}

function initial() {
gamePattern = [];
 userClickedPattern = [];
  gameover = true;
level = 0;
 curindex = 0;
 keyStartListen();
}

function countDown(title, time) {
  showtime();
  function showtime() {
    if (time == 0) {
      title.text("Go!");
      return;
    }
    title.text(time+"");
    time --;
    setTimeout(showtime,1000);
  }

}

function nextSequence() {
  if (gameover) {//在别处已经over了
    gameover = false;
    return;}
  if (curindex != level) {
   gameOver("time out!");
   gameover = false;
   return;
  }
  level ++;
  $("#level-title").text("level   "+level);
  curindex = 0;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  $("#"+randomChosenColour).animate({opacity:0.0},300).animate({opacity:1.0},300);
  gamePattern.push(randomChosenColour);
  userClickedPattern = [];
  setTimeout(nextSequence,level*500 + 1800);
}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColour) {
  var target = $("#"+currentColour);
  target.addClass("pressed");
  setTimeout(function (){$(target.removeClass("pressed"))},100);
}
