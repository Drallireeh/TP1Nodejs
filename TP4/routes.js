function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
     * Création d'une date en partant d'une string au format fr (Jour/Mois/Année hh:mm)
     * @param {string} dateString Chaine de caractère représentant la date
     */
 const CreateDateFromFrenchString = function (dateString) {
    let splittedDate = dateString.split("/");

    let date = new Date(`${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`);
    return date
}

module.exports = function(app) { 
    app.get("/hello-world", (req, res) => {
        res.send({message: "hello, world !"});
    });
    
    app.get("/message", (req, res) => {
        if (req.query.message.length < 20) {
            res.send(req.query.message);
        } else {
            res.status(400).json({message: "Bad Request"});
        }
    });
    
    app.post("/infos/headers", (req, res) => {
        res.send(req.headers);
    });
    
    app.post("/body", (req, res) => {
        let body = req.body;
        let age = getAge(CreateDateFromFrenchString(body.birthdate));
        if (age >= 18) {
            res.status(200).send({message: `Welcome, ${body.firstname}`});
        } else {
            res.status(403).send({message: `Forbidden`});
        }
    });
    
    app.get("/rick-roll", (req, res) => {
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be")
    });
    
    app.delete("/custom-header", (req, res) => {
        res.set({message: "Hello world !"});
        res.end();
    });
    
    app.get("/params/:id/:key/:slug", (req, res) => {
        res.send(req.params);
    });
}