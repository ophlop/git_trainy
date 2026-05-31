const http = require("http");
const handleApiRoutes = require('./routes/api');
const handleStaticRoutes = require('./routes/static');

const PORT = 8000;

const app = http.createServer((req, res) => {
    if (req.url.startsWith('/api/')) {
        return handleApiRoutes(req, res);
    }

    return handleStaticRoutes(req, res);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});