const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url,true).query;
    console.log(queryObject)

    res.end(`Your message: {${queryObject.message ? queryObject.message : ""}}`);
});

server.listen(3000, () => {
    console.log("le serveur tourne sur http://localhost:3000");
});