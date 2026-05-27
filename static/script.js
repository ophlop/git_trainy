const startButton = document.querySelector('#start_btn');
const answerButton = document.querySelector('#answer_btn');
const queSection = document.querySelector('#question_section');
const questionParagraph = document.querySelector('.question');
const answerInput = document.querySelector('#answer_input');

startButton.addEventListener('click', async () => {
    try {
        const res = await fetch('/api/random_question')
        const data = await res.json();
            
        questionParagraph.textContent = 'q: ' + data.question;

        startButton.hidden = true;

        queSection.classList.remove('question_section_none');
        queSection.classList.add('question_section');
    } catch (err) {
        console.error('Failed to load question:', err);
    }
});


answerButton.addEventListener('click', async () => {
    try {
        const reqObj = {};

        if (answerInput.value.trim() !== "") {
            reqObj.answer = answerInput.value;

            console.log(reqObj);

            const res = await fetch('/api/check_answer', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqObj)
            })

            const data = await res.json();

            console.log(data);
        }

    } catch (err) {
        console.error('Failed to load question:', err);
    }
});