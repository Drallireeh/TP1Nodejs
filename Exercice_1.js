const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 400;
    
    res.end("Hello world !");
});

server.listen(3000, () => {
    console.log("le serveur tourne sur http://localhost:3000");
});