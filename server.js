const http = require("http");
const fs = require('fs');
const path = require('path');
const questions = require('./data/question.json');

const returnRandomQuestion = () => {
    const randomNumber = Math.floor(Math.random() * 24) + 1;

    return questions.find(elem => elem.id === randomNumber);
}

const PORT = 8000;

const app = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url.startsWith('/static/')) {
            const filePath = path.join(__dirname, req.url);
            const ext = path.extname(filePath);
            const contentType = ext === '.css' ? 'text/css' : 'text/plain';
            
            res.setHeader('Content-Type', contentType);
            fs.readFile(filePath, (err, content) => {
                if (err) { res.writeHead(404); res.end(); return; }
                res.writeHead(200);
                res.end(content);
            });
            return;
        }

        if (req.url === '/' || req.url === '/home') {
            const indexPage = path.join(__dirname, 'static', 'index.html');

            fs.readFile(indexPage, (err, content) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                    return;
                }

                res.writeHead(200);
                res.end(content);
            })
        }
    }

    if (req.url.startsWith('/api/')) {
        if (req.method === 'POST') {
            let body = '';
            let parsedData;

            req.on('data', function (data) {
                body += data.toString();
            });

            req.on('end', function () {
                parsedData = JSON.parse(body);

                console.log(parsedData);

                if (req.url.includes('check_answer')) {
                    let answer = {};
                    let questionAnswer = questions.find(elem => elem.id == parsedData.id).answer
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    
                    console.log(questions.find(elem => elem.id));
                    console.log(parsedData.answer);
                    console.log(questionAnswer);
                    console.log(parsedData.answer == questionAnswer);
                    
                    if (parsedData.answer == questionAnswer) {
                        answer.status = 'good';
                        answer.text = 'Right answer!'; 
                    } else {
                        answer.status = 'bad'
                        answer.text = 'Wrong answer!'; 
                    }

                    res.end(JSON.stringify(answer));
                }
            });


        }

        if (req.method === 'GET') {
            if (req.url.includes('random_question')) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(returnRandomQuestion()));
            }
        }

    }
})

app.listen(PORT, () => {console.log(`Server running on ${PORT} port.`)});