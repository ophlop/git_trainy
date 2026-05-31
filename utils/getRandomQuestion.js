const questions = require('../data/question.json');

module.exports = (ids) => {
    let editQuestions = [...questions];

    if (ids) {
        const arrIds = ids.split(",");
        editQuestions = editQuestions.filter(e => !arrIds.includes(String(e.id)));
    }

    if (editQuestions.length === 0) {
        return { questions: "", isEnd: true };
    }

    const randomIndex = Math.floor(Math.random() * editQuestions.length);
    return editQuestions[randomIndex];
};