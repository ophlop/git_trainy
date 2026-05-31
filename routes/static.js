const fs = require('fs');
const path = require('path');



module.exports = (req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405);
        return res.end();
    }

    if (req.url.startsWith('/static/')) {
        const safePath = path.join(__dirname, '..', req.url);
        const baseDir = path.join(__dirname, '..', 'static');

        if (!safePath.startsWith(baseDir)) {
            res.writeHead(403);
            return res.end();
        }

        const ext = path.extname(safePath);

        const contentType = ext === '.css'
            ? 'text/css'
            : 'text/html';

        fs.readFile(safePath, (err, content) => {
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