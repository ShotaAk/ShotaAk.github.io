
var currentRobotID = 0;
var answer1=0, answer2=0, answer3=0;
var currentStep=0;
var isEndGame=false;

var QUIZ_MAX = 10;
var ID_MAX = 15;


function judge(id){
    if(isEndGame){
        init();
    }else{
        if(id == currentRobotID){
            update();
        }else{
            finish(true);
        }
    }
}

function update(){
    currentStep++;

    if(currentStep > QUIZ_MAX){
        finish(false);
    }

    // 前回とはちがうIDを出題する
    currentRobotID = getRandomID([currentRobotID]);

    answers = getRandomAnswers(currentRobotID);
    answer1 = answers[0];
    answer2 = answers[1];
    answer3 = answers[2];

    updateHTML();
}

function finish(isGameOver){
    if(isGameOver){
        isEndGame = true;
        endGame();
    }else{
        alert("GAME CLEAR \nYou are ﾛﾎﾞｶｯﾌﾟﾁｮｯﾄﾃﾞｷﾙ");
        init();
    }
}

function init(){
    currentRobotID = getRandomID();

    answers = getRandomAnswers(currentRobotID);
    answer1 = answers[0];
    answer2 = answers[1];
    answer3 = answers[2];
    currentStep=1;

    isEndGame = false;

    updateHTML();
}

function endGame(){
    document.getElementById("answer1-text").innerHTML = "restart";
    document.getElementById("answer2-text").innerHTML = "restart";
    document.getElementById("answer3-text").innerHTML = "restart";
    document.getElementById("score").innerHTML = "This robot is No."+currentRobotID;
}

function updateHTML(){
    document.getElementById("answer1-text").innerHTML = answer1;
    document.getElementById("answer2-text").innerHTML = answer2;
    document.getElementById("answer3-text").innerHTML = answer3;
    document.getElementById("score").innerHTML = currentStep + "/" + QUIZ_MAX;
    document.getElementById("currentImg").src="img/ID"+currentRobotID+".png";
}

function getRandomID(excludeIDs){
    var arrayIDs = [];
    for(let i=0; i<=ID_MAX; i++){
        arrayIDs[i] = i;
    }

    if(excludeIDs){
        excludeIDs.forEach(function(excludeID){
            arrayIDs = arrayIDs.filter(function(a){
                return a !== excludeID;});
        });
    }

    return arrayIDs[Math.floor(Math.random() * arrayIDs.length)];
}


function getRandomAnswers(correctID){
    let target = Math.round(Math.random()*2); // returns 0 ~ 2
    let answers = [];
    let excludeIDs = [correctID];

    for(let i=0; i<3; i++){
        let randomID = getRandomID(excludeIDs);

        excludeIDs.push(randomID);
        answers[i] = randomID;
    }

    answers[target] = correctID;

    return answers;
}

document.getElementById("answer1-button").onclick = function() {
    judge(answer1);
};

document.getElementById("answer2-button").onclick = function() {
    judge(answer2);
};

document.getElementById("answer3-button").onclick = function() {
    judge(answer3);
};

init();
