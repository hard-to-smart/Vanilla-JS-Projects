import questionsArray from './questions.js'

const start = document.getElementById('start-section');
const timerSpace = document.getElementById("timer");
const questionSpace = document.querySelector('h2');
const optionsSpace = document.querySelectorAll('li');

let currentQuestion = 0;
let correctAnswerCount = 0;
let canAnswer = true;
// a function to shuffle the questions in random ordered array
function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}
//initializing the questions and returning the shuffled array from the function
const questions = shuffleArray(questionsArray)

// this triggers the starting page code
start.addEventListener('click', ()=>{
    start.style.display = "none";
    timerSpace.style.display="block";
    addTimer()
    changeQuestion();
})


function addTimer() {
    let time = 5;
    const timer = setInterval(() => {
        timerSpace.innerHTML = time--;
        
        if (time < 0) {
            clearInterval(timer)
            currentQuestion++;
            if (currentQuestion >= questions.length) {
                resultSection()
                return
            }
            canAnswer=true
            changeQuestion()
            addTimer()
        }
    }, 1000)

}

function changeQuestion(){
    questionSpace.innerHTML = questions[currentQuestion].question;
    optionsSpace.forEach(( option, index) => {
        option.textContent = questions[currentQuestion].options[index];
        option.classList.remove("disabled", "li-selected");
        option.classList.add("color-li")
        option.onclick = () => {
            if (canAnswer) {
                checkAnswer(option);
            }
        };
    })
}

function checkAnswer(selectedOption){
    console.log(selectedOption.textContent);
    selectedOption.classList.add("li-selected")
    if(selectedOption.textContent === questions[currentQuestion].answer){
        correctAnswerCount++;
    }
    canAnswer = false; 
    disableOptions();
} 

function disableOptions(){
    optionsSpace.forEach((option) => { option.classList.add("disabled");  })
}
function resultSection(){
    timerSpace.style.display="none";
    optionsSpace.forEach((option)=>{option.style.display="none";})
    questionSpace.innerHTML = "Your Score : " + correctAnswerCount + "/" + questions.length;
}
