const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const schema = {
        "message": "Hello world",
        "status": 200
    };

    res.end(JSON.stringify(schema));
});

server.listen(3000, () => {
    console.log("le serveur tourne sur http://localhost:3000");
});