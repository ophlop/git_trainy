const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405);
        return res.end();
    }

    if (req.url.startsWith('/static/')) {
        const filePath = path.join(__dirname, '..', req.url);
        const ext = path.extname(filePath);

        const contentType = ext === '.css'
            ? 'text/css'
            : 'text/html';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                return res.end();
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });

        return;
    }

    if (req.url === '/' || req.url === '/home') {
        const indexPath = path.join(__dirname, '..', 'static', 'index.html');

        fs.readFile(indexPath, (err, content) => {
            if (err) {
                res.writeHead(404);
                return res.end();
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    }
};