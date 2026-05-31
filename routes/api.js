const { checkAnswer, getRandomQuestion } = require('../controllers/questionController');
const url = require('url');

module.exports = (req, res) => {
    if (req.method === 'POST' && req.url.includes('check_answer')) {
        return checkAnswer(req, res);
    }

    if (req.method === 'GET' && req.url.includes('random_question')) {
        const parsedUrl = url.parse(req.url, true);
        return getRandomQuestion(req, res, parsedUrl.query);
    }

    res.writeHead(404);
    res.end();
};