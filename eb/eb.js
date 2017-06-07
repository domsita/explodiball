// PRIMARY GAME LOGIC
var shapeNum = 1;
var bombNum = 1;
var canvas;
var ctx;
var score = 0;
var board;
var timeleft;
var inProgress = true;
var moves;
var player;
var gameMode;

function load() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    board = new Board(20);

    window.setInterval(function () {
        board.draw();
        board.update();
    }, 20);
}

// starts a game with a finite amount (x) of bombs that can be placed  ----------------------------
function startMoves(x) {
    moves = x;
    gameMode = x;
    board = new Board(300);

    // updates/ draws the board and display every 20 ms. Also checks for the end of the game.
    window.setInterval(function() {
        $('#score').text("Score: " + score);
        $('#bombs').text("Bombs: " + moves);

        if (moves == 0 && board.bombs.length == 0) {
            board.freeze();
            $('#winScore').text(score);
            $('#winScreen').css("visibility", "visible");
        }
    }, 20);

    clickHandler();
}

// "practice" mode - no limit on the amount of bombs or time. starts with 200 circles and 20
// more are added every 3 seconds.
        // todo: possibly take this out and allow demoing on the main start screen.
function startPractice () {
    board = new Board(100);
    moves = 999999;

    window.setInterval(function() {
        $('#score').text("Score: " + score);
    }, 20);

    addPeriodically(20, 3000);

    clickHandler();
}

// adds "amount" of circles every "period" of time.
function addPeriodically(amount, period) {
    window.setInterval(function() {
        if (inProgress) {
            board.add(amount);
        }
    }, period);
}

// Timed Version - Starts with 30 seconds and 200 circles. Player has unlimited bombs. every
// 3 seconds, 20 circles are added. the timer function keeps track of the countdown and if a Player
// drops the number of shapes left to under 125 they get 3 extra seconds and 50 more circles.
// If the player has cleared all but 50 circles, 100 circles are added and 5 extra seconds are awarded.
function startTimed() {
    board = new Board(100);
    moves = 999999;

    gameMode = '2';

    window.setInterval(function() {
        $('#score').text("Score: " + score);
        $('#timer').text("Time: " + timeleft);
    }, 20);

    addPeriodically(25, 3000);

    timeleft = 30;
    timer();

    if (timeleft < 1) {
        inProgress = false;
        board.freeze();
    }

    clickHandler();
}

function timer() {
    window.setInterval(function () {
        if (board.list.length < 75) {
            timer+=3;
            board.add(25);
        } else if (board.list.length < 50) {
            timer+=5;
            board.add(50);
        }

        if (timeleft > 0) {
            timeleft--;
        } else {
            inProgress = false;
            board.freeze();
            $('#winScore').text(score);
            $('#winScreen').css("visibility", "visible");
        }
    }, 1000);
}


// Display functions --------------------------------------------------------------------------------------------

// toggles button visbility when the game begins
function clearDisplay() {
    $('#welcome').css("visibility", "hidden");
    $('#timed').css("visibility", "hidden");
    $('#practice').css("visibility", "hidden");
    $('#one').css("visibility", "hidden");
    $('#three').css("visibility", "hidden");
    $('#quit').css("visibility", "visible");
}


// Helper Functions ---------------------------------------------------------------------------------------------
function clickHandler() {
    $('#myCanvas').click(function (e) {
        var xClicked = e.pageX - this.offsetLeft;
        var yClicked = e.pageY - this.offsetTop;
        if (inProgress) {
            board.click(xClicked, yClicked);
        }
    });
}

function getRan (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function colorPicker() {
    var color = "#"
    for (var i = 0; i < 6; i++) {
        var value = getRan(0, 16);
        if (value > 9) {
            value = String.fromCharCode(value - 10 + 65);
        }
    color += (value);
    }
    return color;
}
