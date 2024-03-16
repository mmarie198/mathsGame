//application.js
$(document).ready(function(){

    var currentQuestion;
    var interval;
    var timeLeft = 10;
    var score = 0;
    var highScore = 0;
    var numberLimit = 10;
    
    var updateTimeLeft = function (amount) {
      timeLeft += amount;
      $('#time-left').text(timeLeft);
    };
    
    var updateHighScore = function () {
        if (score > highScore) {
          highScore = score;
          $('#high-score').text(highScore);
        }
      };

    var updateScore = function (amount) {
      score += amount;
      $('#score').text(score);
      updateHighScore();
    };

    var resetHighScore = function () {
        highScore = 0;
        $('#high-score').text(highScore);
    };
    
    var startGame = function () {
      if (!interval) {
        resetHighScore;
        if (timeLeft === 0) {
          updateTimeLeft(10);
          updateScore(-score);
        }
        interval = setInterval(function () {
          updateTimeLeft(-1);
          if (timeLeft === 0) {
            clearInterval(interval);
            interval = undefined;
          }
        }, 1000);  
      }
    };

    var setNumberLimit = function (value) {
      numberLimit = value;
      renderNewQuestion();
    };


    
    var randomNumberGenerator = function (size) {
      return Math.ceil(Math.random() * size);
    };
    
    var questionGenerator = function () {
      var question = {};
      var num1 = randomNumberGenerator(numberLimit);
      var num2 = randomNumberGenerator(numberLimit);
      
      question.answer = num1 + num2;
      question.equation = String(num1) + " + " + String(num2);
      
      return question;
    };
    
    var renderNewQuestion = function () {
      currentQuestion = questionGenerator();
      $('#equation').text(currentQuestion.equation);  
      $('#number-limit-input').val(numberLimit);
    };
    
    var checkAnswer = function (userInput, answer) {
      if (userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
      }
    };

    $('.rangeInput').on('input', function() {
      var value = $(this).val(); // Get the value of the range input
      
      // Display the value
      $('#output').text("" + value);
    });

    $('#user-input').on('keyup', function () {
      startGame();
      checkAnswer(Number($(this).val()), currentQuestion.answer);
    });
    
    $('#number-limit-input').on('input', function () {
      setNumberLimit($(this).val());
    });

    renderNewQuestion();
  });
