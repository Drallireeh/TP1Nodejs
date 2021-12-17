const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const schema = {
        "firstname": "Kenny",
        "lastname": "Herillard",
        "birthdate": "14/12/1998",
        "color": "Vert clair"
    };

    res.end(JSON.stringify(schema));
});

server.listen(3000, () => {
    console.log("le serveur tourne sur http://localhost:3000");
});