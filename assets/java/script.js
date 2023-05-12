//selects element from html file
var timeEl = document.querySelector(".time");
var startQuizBtn = document.querySelector(".start-quiz")
var homeSection = document.querySelector(".home-section")
var questionSection = document.querySelector(".question-section")
var answerEls = document.querySelectorAll(".answer")
var questionEl = document.querySelector(".question")
var aText = document.querySelector("#a-text")
var bText = document.querySelector("#b-text")
var cText = document.querySelector("#c-text")
var dText = document.querySelector("#d-text")
var nextEL = document.querySelector("#next")
var resultEl = document.querySelector("#result")
var finalSection = document.querySelector(".final-section")
var finalScore = document.querySelector(".final-score")
var SubmitEl = document.querySelector("#submit")
var InputInitial = document.querySelector("#input-initial")
var recordEL = document.querySelector(".score")
var highScores = JSON.parse(localStorage.getItem("UserRecord")) || [];
console.log(highScores)
//Variable for code
var secondsLeft = 50;
var score = 0;
var currentQues = 0;

// var UserRecord = {
//     finalResult : score,
//     initial: InputInitial.value,
// }
var questions = [
    {
        question: "How do you round the number 7.25, to the nearest whole number?",
        a: 'Math.rnd(7.25)',
        b: 'round(7.25)',
        c: 'rnd(7.25)',
        d: 'Math.round(7.25)',
        correct: 'd'
    },
    {
        question: 'What is the correct JavaScript syntax to write "Hello World"?',
        a: 'response.write("Hello World")',
        b: '"Hello World"',
        c: 'document.write("Hello World")',
        d: '("Hello World")',
        correct: 'c'
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        a: 'Both the <head> section and the <body> section are correct',
        b: 'The <body> section',
        c: 'The <head> section',
        d: 'None of them',
        correct: 'a'
    },
    {
        question: 'How do you find the largest number of 2 and 4?',
        a: 'Math.ceil(2,4)',
        b: 'Math.max(2,4)',
        c: 'ceil(2,4)',
        d: 'top(2,4)',
        correct: 'b'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        a: 'alert("Hello World")',
        b: 'msgBox("Hello World")',
        c: 'alertBox="Hello World"',
        d: 'alertBox("Hello World")',
        correct: 'a'
    },
    {
        question: "How do you create a function?",
        a: 'function:myFunction()',
        b: 'function=myFunction()',
        c: 'function myFunction()',
        d: 'myFunction():function',
        correct: 'c'
    },
    {
        question: 'How do you call a function named "myFunction"?',
        a: 'call myFunction()',
        b: 'myFunction()',
        c: 'call function myFunction',
        d: 'Call.myFunction()',
        correct: 'b'
    },
    {
        question: 'How do you write a conditional statement for executing some statements only if "i" is equal to 5?',
        a: 'if i==5 then',
        b: 'if (i==5)',
        c: 'if i=5 then',
        d: 'if i=5',
        correct: 'b'
    },
    {
        question: 'How do you write a conditional statement for executing some statements only if "i" is NOT equal to 5?',
        a: 'if (i != 5)',
        b: 'if =! 5 then',
        c: 'if (i <> 5)',
        d: 'if <>5',
        correct: 'c'
    },
    {
        question: 'How does a "for" loop start?',
        a: 'for (i = 0; i <= 5)',
        b: 'for (i = 0; i <= 5; i++)',
        c: 'for i = 1 to 5',
        d: 'for (i <= 5; i++)',
        correct: 'b'
    }
]

//Timer funtion
function setTime() {
    var timerInterval = setInterval( function(){
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
        } else {
            secondsLeft--;
            timeEl.textContent = "Time: " + secondsLeft;
        }
    },1000);
    question();
}
startQuizBtn.addEventListener("click",function(){
    setTime();
    homeSection.classList.add('hide')
    questionSection.classList.remove('hide')
});
//Funtion to load question
function question () {
    hideSelectAnswer()
    var currentQuesData = questions[currentQues]
    questionEl.innerHTML = currentQuesData.question
    aText.innerHTML = currentQuesData.a
    bText.innerHTML = currentQuesData.b
    cText.innerHTML = currentQuesData.c
    dText.innerHTML = currentQuesData.d
}

function hideSelectAnswer (){
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getselectAnswer () {
   var answer;
   answerEls.forEach (answerEl =>{
        if(answerEl.checked){
            answer = answerEl.id;
        }
   })
   return answer
}

function checkAnswerResult () {
    var checkAnswer = questions[currentQues].correct;
    var answer1 = getselectAnswer();
    if(checkAnswer === answer1){
        resultEl.innerHTML = "Your answer is correct!"
    } else {
        resultEl.innerHTML = "Your answer is incorrect!"
    }   
}
//Next button
nextEL.addEventListener('click', function(){
    var answer = getselectAnswer();
    if (answer) {
        if(answer === questions[currentQues].correct) {
            score++;
        }else {
            secondsLeft = secondsLeft - 5;
        }
        currentQues++;
        if((currentQues < questions.length) && (secondsLeft > 0)){
            question();
        } else{
            finalSection.classList.remove('hide')
            questionSection.classList.add('hide')
            finalScore.innerHTML= "Your score is " + score;
            return;
        }
    }
    console.log("score is  "+ score)
})
var saveRecord = function(e) {
    var userRecord = {
        score1: score,
        initial: InputInitial.value
    }
    highScores.push(userRecord)
    localStorage.setItem("UserRecord", JSON.stringify(highScores))
}

//Submit button 
SubmitEl.addEventListener('click', function(e) {
    e.preventDefault();
    saveRecord();
    finalSection.classList.add('hide')
    homeSection.classList.remove('hide')
    secondsLeft = 50;
    score = 0;
    currentQues = 0;
})
