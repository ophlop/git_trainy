const { checkAnswer, getRandomQuestion } = require('../controllers/questionController');

module.exports = (req, res) => {
    if (req.method === 'POST' && req.url.includes('check_answer')) {
        return checkAnswer(req, res);
    }

    if (req.method === 'GET' && req.url.includes('random_question')) {
        const parsedUrl = new URL(req.url, 'http://localhost');
        const qIds = parsedUrl.searchParams.get('qIds');
        return getRandomQuestion(req, res, qIds);
    }

    res.writeHead(404);
    res.end();
};