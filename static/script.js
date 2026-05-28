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
        startButton.hidden = true;
        nextButton.hidden = true;
        questionParagraph.hidden = true;
        answerParagraph.hidden = true;

        answerInput.value = '';
        answerInput.disabled = false;

        const res = await fetch('/api/random_question')
        currentQuestion = await res.json();
            
        questionParagraph.textContent = 'q: ' + currentQuestion.question;

        questionParagraph.hidden = false;
        answerButton.disabled = false;
        answerButton.hidden = false;
        

        queSection.classList.remove('question_section_none');
        queSection.classList.add('question_section');
    } catch (err) {
        console.error('Failed to load question:', err);
    }
}