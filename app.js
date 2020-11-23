const STORE = {
  questionsList: [{
    question: 'The color Sarcoline is closest to:',
      answers: [
        'red',
        'yellow',
        'green',
        'tan'
      ],
    correctAnswer: 'tan'
    },
    {
    question: 'The color Coquelicot is closest to:',
    answers: [
        'red',
        'yellow',
        'green',
        'tan'
    ],
    correctAnswer: 'red'
    },
    {
    question: 'The color Falu is closest to:',
    answers: [
        'red',
        'yellow',
        'green',
        'tan'
    ],
    correctAnswer: 'red'
    },
    {
    question: 'The color Smaragdine is closest to:',
    answers: [
        'red',
        'yellow',
        'green',
        'tan'
    ],
    correctAnswer: 'green'
    },
    {
    question: 'The color Mikado is closest to:',
    answers: [
        'red',
        'yellow',
        'green',
        'tan'
    ],
    correctAnswer: 'yellow'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};
console.log(STORE.questionNumber)
//Run the start page, Title and start button Html script
//set up counters for questions progress and #correct
function startPage() {
  console.log("starting..");
  return `
  <div class="container">
    <h1>Try some colors you might have never heard of!</h1>
    <button type="button" id="start"> Let's Go </button>
  </div>
  `;
  
}
//what is the current question count/Total q's and what is my current score?
function countScore(){
  return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${STORE.questionNumber + 1}/${STORE.questionsList.length}
      </li>
      <li id="score">
        Score: ${STORE.score}/${STORE.questionsList.length}
      </li>
    </ul>
  `;
}
  
function generateAnswersHtml() {
  const answersArray = STORE.questionsList[STORE.questionNumber].answers
  let answersHtml = '';
  let i = 0;
  answersArray.forEach(answer => {
    answersHtml += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return answersHtml;
}
//display the question and answers with 2 buttons
function generateQuestionHtml() {
  let questionNumber = STORE.questionsList[STORE.questionNumber];
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${questionNumber.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswersHtml()}
          </div>
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6"> Next &gt;></button>
      </fieldset>
    </form >
  `;

}

//how to see if the answer is right
function generateFeedbackHTML(answerStatus) {
  let correctAnswer = STORE.questionsList[STORE.questionNumber].correctAnswer;
  let html = '';
  console.log(STORE.questionNumber+1)
  if (answerStatus === 'correct') {
    html = `
    <div class="right-answer">That is correct! The color looks like this:</div>
  
    <img src="colors/${STORE.questionNumber+1}.webp" class="pic" alt="">
    `;
        /*/add picture    <div class="question">
          <legend> ${(STORE.questionNumber.question).slice(0,-11)}</legend>
        </div>   */


  }
  else if (answerStatus === 'incorrect') {
    html = `
      <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}. The color looks like this:</div>
      <img src="colors/${STORE.questionNumber+1}.webp" class="pic" alt="">

    `;
    //add picture    <img src="${questionNumber}.webp" class="pic" alt="">

  }
  //html += displayColor
  return html;
}
/*
function displayColor (){
  return '<div> The color looks like this: <br><img src="colors/${STORE.questionNumber+1}.webp" class="pic" alt="">'
}
*/

//Final page: Final score, show all 5 colors, retake the quiz
function generateResultsScreen() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${STORE.score}/${STORE.questionsList.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}





function render(){
  console.log("rendering")
  //console.log(STORE.quizStarted)

  let code = '';
  if (STORE.quizStarted === false){
    $('main').html(startPage());
    return;
  }
  else if (STORE.questionNumber>= 0 && STORE.questionNumber<STORE.questionsList.length){
    code = countScore();
    code +=generateQuestionHtml();
    //console.log(code)
    $('main').html(code);
  }
  else {
    $('main').html(generateResultsScreen());
  }
}


function handleStartClick(){
  console.log("starting...")
  //1. Wathc for event - click
  //2. quizStarted = true
  //3. render
  $('main').on('click', '#start', function (event) {
    STORE.quizStarted = true;
    render();
  });
}



function handleNextQuestionClick(){
  console.log("clicked next quesiton")
  //1. generateQuestionHtml -render
  //2. listen for click of next questions button
  
 
  //5. render
  $('body').on('click', '#next-question-btn', (event) => {
    render();
  });
}


function handleQuestionFormSubmission(){
  console.log("form submission")
  //1. listen for click of radio button
  //3. generateFeedbackHTML
   //4. add to counter (generateAnswersHtml)
   $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const questionNumber = STORE.questionsList[STORE.questionNumber];

    // get value from checkbox checked by user
    let selectedOption = $('input[name=options]:checked').val();
    /**
     * Creates an id '#option-container' + the index of 
     * the current question in the answers array.
     * 
     * Example: #option-container-0
     */
    let optionContainerId = `#option-container-${questionNumber.answers.findIndex(i => i === selectedOption)}`;

    if (selectedOption === questionNumber.correctAnswer) {
      STORE.score++;
      $(optionContainerId).append(generateFeedbackHTML('correct'));
    }
    else {
      $(optionContainerId).append(generateFeedbackHTML('incorrect'));
    }
    STORE.questionNumber++;
    // hide the submit button
    $('#submit-answer-btn').hide();
    // disable all inputs
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    // show the next button
    $('#next-question-btn').show();

  });

}



function handleRestartButtonClick() {
  $('body').on('click', '#restart', () => {
    restartQuiz();
    render();
  });
}


function restartQuiz(){
  STORE.quizStarted = false;
  STORE.questionNumber = 0;
  STORE.score = 0;
}
function handleRestartButtonClick(){

  console.log("restarting..")
  //listen for click
  $('body').on('click', '#restart', () => {
  restartQuiz();
  //go to start page
  render();
  });
}
// This function conditionally replaces the contents of the <main> tag based on the state of the STORE

/********** EVENT HANDLER FUNCTIONS **********/
function handleQuizApp() {
  render();
  handleStartClick();
  handleNextQuestionClick();
  handleQuestionFormSubmission();
  handleRestartButtonClick();
}

$(handleQuizApp);

//HTML page Question X
/* 
1. Question counter
2. Question 
3. radio buttons
  a. If radio button selected .on('click) has the value that matches the correct answer: 
    1. open box that says correct!
    2. open picture of color
    3. update score
    4. show button for next question
  b. else 
    1. open box that says incorrect! Correct answer is: 
    2. open color
    3. update score
    4. show button for next question
*/