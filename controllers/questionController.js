const questions = require('../data/question.json');
const getRandom = require('../utils/getRandomQuestion');

const checkAnswer = (req, res) => {
    let body = '';

    req.on('data', data => {
        body += data.toString();
    });

    req.on('end', () => {
        const parsedData = JSON.parse(body);

        const question = questions.find(q => q.id == parsedData.id);

        if (!question) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: 'Question not found' }));
        }

        const isCorrect = parsedData.answer == question.answer;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: isCorrect ? 'good' : 'bad',
            text: isCorrect ? 'Right answer!' : 'Wrong answer!'
        }));
    });
};

const getRandomQuestion = (req, res, query) => {
    const result = getRandom(query.qIds);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
};

module.exports = {
    checkAnswer,
    getRandomQuestion
};