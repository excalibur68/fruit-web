var playing = false;
var score;
var trialsLeft;
var step;
var action
var fruits = ['apple', 'banana', 'cherry', 'grape', 'mango','peach', 'pineapple', 'watermelon'];
$(function(){
$("#startreset").click(function(){
  //if we are playing
  if(playing == true){
     //reload the page
      location.reload();
  }else{
      //we are not playing yet
      playing = true;
      //hide the game over
      $("#gameOver").hide();
      //set score to 0 
      score = 0;
      $("#scoreValue").html(score);
      //show trials left
      $("#trialsLeft").show();
      trialsLeft = 3;
      addHearts(trialsLeft);
      //change the button to reset game 
      $("#startreset").html("Reset Game");
      //start generating fruit
      generatingFruit();

  }
});
$("#myFruit").mouseover(function(){
    score++;
    $("#scoreValue").html(score);
//    document.getElementById("sound").play();
    $("#sound")[0].play();//play sound
    //stopfruit
//    stopAction();
    clearInterval(action);
    $("#myFruit").hide("explode", 500);
//    $("#myFruit").hide();
    //send new fruit
//    generatingFruit();
    setTimeout(generatingFruit, 800);
    
});
function addHearts(trialsLeft){
    $("#trialsLeft").empty();
    for(var i = 0; i < trialsLeft ; i++){
              $("#trialsLeft").append('<img src="images/heart.png" class="heart">');
          }
}
function generatingFruit(){
//    $("#fruitContainer").append('<img src="images/apple.png" class="fruit">');
    //append method will cost a lot of memory therefore we choose not to use it
    initFruit();
    //move the fruit down by one step every 10ms
    action = setInterval(function(){
        //move the fruit
        $("#myFruit").css('top', $("#myFruit").position().top + step);
        //check if the fruit is too low
        if($("#myFruit").position().top > $("#fruitContainer").height()){
            if(trialsLeft > 1){
                initFruit();
                trialsLeft--;
                addHearts(trialsLeft);
            }else{
                //no trials left game over
                playing =false;
                $("#startreset").html("Start Game");
                $("#trialsLeft").hide();
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is  ' + score+'</p>');
                stopAction();
            }
        }
    }, 10);
}
function initFruit(){
    $("#myFruit").show();
    chooseFruit();//choose a random fruit
    $("#myFruit").css({//random position
        'left': Math.floor(550*Math.random()),
        'top': -50
    });
    //generate random set for the speed of the fruit
//    step = 0;
    step = 1+Math.round(5*Math.random());//change step
}
function chooseFruit(){
    $("#myFruit").attr('src', 'images/' + fruits[Math.floor(8*Math.random())] + '.png'); 
    
}
//stop dropping fruit
function stopAction(){
    clearInterval(action);
    $("#myFruit").hide();
}
});

    //play sound 
    //explode 