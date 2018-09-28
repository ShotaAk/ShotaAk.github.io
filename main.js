
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

var ballRadius = 10;
var ballColor = "#0095DD";

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var dPaddleX = 5;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 4;
var brickColumnCount = 4;
var brickWidth = 40;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 20;
var bricks = [];
for(var c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, exist: 1};
    }
}

var score = 0;
var lives = 3;

function initialize(){
    x = canvas.width/2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;

    ballRadius = 10;
    ballColor = "#0095DD";

    paddleHeight = 10;
    paddleWidth = 75;
    paddleX = (canvas.width - paddleWidth)/2;

    rightPressed = false;
    leftPressed = false;
}


function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(var c=0; c<brickColumnCount; c++){
        for(var r=0; r<brickRowCount; r++){
            if(bricks[c][r].exist == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    x += dx;
    y += dy;
    drawBall();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx *= -1.0;
        ballColor = colorGen();
    }

    if(y + dy < ballRadius){
        dy *= -1.0;
        ballColor = colorGen();
    }else if(y + dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy *= -1.0;

            dx *= 1.1;
            dy *= 1.1;
        }else{
            lives--;
            if(!lives){
                alert("GAME OVER");
                initialize();
                document.location.reload();
            }else{
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    drawPaddle();
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += dPaddleX;
    }else if(leftPressed && paddleX > 0){
        paddleX -= dPaddleX;
    }
    collisionDetection();

    drawBricks();

    drawScore();
    drawLives();

    requestAnimationFrame(draw);
}

function colorGen(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function collisionDetection(){
    for(var c=0; c<brickColumnCount; c++){
        for(var r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.exist == 1){
                if(x > b.x && x < b.x+brickWidth 
                    && y > b.y && y < b.y+brickHeight){
                    dy *= -1.0;
                    b.exist = 0;
                    ballColor = colorGen();

                    score++;
                    if(score == brickRowCount*brickColumnCount){
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }else if(e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }else if(e.keyCode == 37){
        leftPressed = false;
    }
}

function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}

function touchHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("touchstart", touchHandler, false);
document.addEventListener("touchmove", touchHandler, false);


draw();
