const { User } = require("../models");

module.exports = function (app) {
    app.get("/users", async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.get("/user/:id", async (req, res) => {
        try {
            const user = await User.findOne({ where: { id: req.params.id } });
            res.json(user);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.patch("/user/:id", async (req, res) => {
        try {
            const user = await User.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.end();
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.post("/users/create", async (req, res) => {
        try {
            const user = await User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                username: req.body.username,
                github: req.body.github
            });
            res.end();
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.delete("/user/:id", async (req, res) => {
        try {
            await User.destroy({ where: { id: req.params.id } });
            res.end();
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });
}