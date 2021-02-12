function beginQuiz () 
{
    $('#begin-button').on('click',event =>
    {
        event.preventDefault();
        $('.quiz-container').toggle();
        $('.begin-container').toggle();
    });
}

$(beginQuiz);
// Next section includes quiz js.

const QUIZQUESTIONS = 
[   
    {
        question: "Who is the current head coach of the Pittsburgh Steelers?",
        answers : ["Chuck Noll","Urban Myer","Mike Ditka", "Mike Tomlin"],
        correct: "Mike Tomlin"
    },

    {

        question:"How many superbowls have the Steelers won?",
        answers:["1", "5","7", "6"],
        correct:"6"
    },

    {
        question:"Which steelers quarterback has the most superbowl wins?",
        answers:["Terry Bradshaw","Ben Rothlisberger","Mason Rudolph","Tommy Maddox"],
        correct:"Terry Bradshaw"
    },

    {
        question:"What year did the Steelers last win the superbowl?",
        answers: ["2016", "2009", "2011", "2006"],
        correct:"2009"
    },

    {
        question:"What year did the Steelers franchise begin?",
        answers: ["1933","1960","1972","1945"],
        correct:"1933"
    },

//displays correct an incorrect scores
];
var USERSCORE =
{
    correct: 0,
    incorrect: 0
};


var start = 0
$(confirmQuizLoad(start));

function renderQuestion(object)
{
    let question = object.question;
    $('.question-header').html(question);
}

function renderUserScore(correct,incorrect, quiz)
{
    let userScore = correct + ': correct ' + incorrect +
    ': incorrect';
    let currentQuestion = start + 1;
    let questionNumber = currentQuestion + " out of " + quiz.length;

    $('.question-number').html(questionNumber);
    $('.quiz-score').html(userScore); 
}

function renderChoices(object)
{
    let quizArray = object.answers;
    let radioButtonFormat = quizArray.map((item,index) =>
    toRadioButtonFormat(quizArray[index]));
    $('fieldset').html(radioButtonFormat.join(""));
}


function toRadioButtonFormat(string)
{
    return `<label for = '${string}'> ${string}</label>
            <input type="radio" id = '${string}' class = "choices" name="answer" value="${string}">
            <br>`;
}

//evaluation of answer
function evaluate(userAnswer)
{
    let correctAnswer = QUIZQUESTIONS[start].correct;

    if (userAnswer == correctAnswer)
    {
        return true;
    }
    else
    {
        return false;
    }
}


function submitButton()
{
    $('.submit-button').unbind("click").on('click', event =>
    {
        event.preventDefault();
        $('.submit-button').prop("disabled",true);

        let userAnswer = $('input[name=answer]:checked').val();

        
        if (userAnswer == null)
        {
            $(".feedback").html('Please Select an answer');
            $('.submit-button').prop("disabled", false);
        }
       //evaluates the answer for correctness
        let isCorrect = evaluate(userAnswer);
        if (isCorrect)
        {
            $(".feedback").html('You chose the correct answer!');
            USERSCORE.correct++;
            $('.next-button').prop("disabled", false);

        }

        else if (!isCorrect && userAnswer != null)
        {
            $(".feedback").html(`You put ${userAnswer} the correct answer was ${QUIZQUESTIONS[start].correct}`);
            USERSCORE.incorrect++;;
            $('.next-button').prop("disabled", false);
        }
    });

}


//once next question is clicked, a new question will render.
function nextButton()
{
    $('.next-button').unbind("click").on('click', event => 
    {
        event.preventDefault();
        if(start == QUIZQUESTIONS.length-1)
        {
            $('.results').html(`You got ${USERSCORE.correct} out of ${QUIZQUESTIONS.length}`);
            $('.final-message').html("Think you can do better? Retry the quiz");
            $('.quiz-container').toggle();    
            $('.final-container').toggle();
        }
        else
        {

            start ++;
            $('.submit-button').prop("disabled",false);
            $(".feedback").html("");
            confirmQuizLoad(start);

        }

    });

}

//this will reset score, and restart quiz.
function restartButton()
{
    $('.restart-quiz').unbind("click").on('click',event =>
    {
        event.preventDefault();
        USERSCORE.correct = 0;
        USERSCORE.incorrect = 0;
        start = 0;
    
        $(".feedback").html("");
        $('.final-results').toggle();
        $('.quiz-container').toggle();
        confirmQuizLoad(start);
    });
}


function confirmQuizLoad(index)
{

    let question = QUIZQUESTIONS[start];
    let userCorrect = USERSCORE.correct;
    let userIncorrect = USERSCORE.incorrect;
    let choices = QUIZQUESTIONS[start];

    renderQuestion(question);
    renderUserScore(userCorrect,userIncorrect,QUIZQUESTIONS);
    renderChoices(choices);
    submitButton();
    nextButton();
    restartButton();

    $('.submit-button').prop("disabled",false);
    $('.next-button').prop("disabled",true);
}