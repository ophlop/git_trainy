const startButton = document.querySelector('.button');
const queSection = document.querySelector('#question_section');
const questionParagraph =  document.querySelector('.question');

startButton.addEventListener('click', () => {
    (async () => {
        try {
            const res = await fetch('/api/random_question')
            const data = await res.json();
                
            questionParagraph.textContent = data.question;

            queSection.classList.remove('question_section_none');
            queSection.classList.add('question_section');
        } catch (err) {
            console.error('Failed to load question:', err);
        }
    })();
})