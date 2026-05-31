const startButton = document.querySelector('#start_btn');
const nextButton = document.querySelector('#next_btn');
const answerButton = document.querySelector('#answer_btn');

const queSection = document.querySelector('#question_section');

const questionParagraph = document.querySelector('.question');
const answerParagraph = document.querySelector('.answer');
const answerInput = document.querySelector('#answer_input');


answerParagraph.hidden = true;
nextButton.hidden = true;
let currentQuestion = null;

startButton.addEventListener('click', getRandomQuestion);
nextButton.addEventListener('click', getRandomQuestion);

answerButton.addEventListener('click', async () => {
    try {
        const reqObj = {};

        if (answerInput.value.trim() !== "") {
            reqObj.answer = answerInput.value;
            reqObj.id = currentQuestion.id
            answerInput.disabled = true;
            answerButton.disabled = true;
            answerButton.hidden = true;

            console.log(reqObj);

            const res = await fetch('/api/check_answer', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqObj)
            })

            const data = await res.json();

            answerParagraph.textContent = data.text;
            answerParagraph.classList.add(data.status);
            answerParagraph.hidden = false;

            nextButton.hidden = false;
        }

    } catch (err) {
        console.error('Failed to load question:', err);
    }
});

async function getRandomQuestion () {
    try {
        let params = '';

        startButton.hidden = true;
        nextButton.hidden = true;
        nextButton.disabled = true;
        questionParagraph.hidden = true;
        answerParagraph.hidden = true;
        answerParagraph.classList.remove('good', 'bad')

        answerInput.value = '';
        answerInput.disabled = false;

        const answersId = localStorage.getItem('answersId');
        if (!!answersId) {
            params = '?qIds=' + JSON.parse(answersId).map(e => {let str = ''; return str + e.id}).join(",");
        }

        const res = await fetch('/api/random_question' + params);
        currentQuestion = await res.json();

        if (!!currentQuestion.isEnd && currentQuestion.isEnd == true) {
            questionParagraph.textContent = "Вопросы кончились! Рестарт?"
            questionParagraph.hidden = false;

            nextButton.textContent = 'Restart';
            nextButton.hidden = false;
            nextButton.disabled = false;
            answerInput.hidden = true;

            localStorage.removeItem('answersId');

            return;
        } else {
            answerInput.hidden = false;
        }

        saveAnswerToStorage('answersId', currentQuestion);
            
        questionParagraph.textContent = 'q: ' + currentQuestion.question;

        questionParagraph.hidden = false;
        answerButton.disabled = false;
        answerButton.hidden = false;

        queSection.classList.remove('question_section_none');
        queSection.classList.add('question_section');
    } catch (err) {
        console.error('Failed to load question:', err);
        nextButton.disabled = false;
        nextButton.hidden = false;
    }
}

function saveAnswerToStorage (attr, value) {
    let arr = [];
    let obj = localStorage.getItem(attr);

    if (!!obj) {
        arr = arr.concat(JSON.parse(obj));
    }

    arr.push(value);

    localStorage.setItem(attr, JSON.stringify(arr));
}