const startButton = document.querySelector('.button');

startButton.addEventListener('click', () => {
    console.log('btn work!')

    const queSection = document.querySelector('#question_section');

    let question;

    fetch('http://localhost:8000/api/random_question', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        question = data;

        const questionParagraf =  document.querySelector('.question');
        questionParagraf.innerText = question.question;
    })
    .catch(err => console.log(err))

    console.log(JSON.stringify(question));



    queSection.classList.remove('question_section_none');
    queSection.classList.add('question_section');
})