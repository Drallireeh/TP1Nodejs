const { Comment } = require("../models");

module.exports = function (app) {
    app.get("/comments", async (req, res) => {
        try {
            const comments = await Comment.findAll();
            res.json(comments);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.get("/comment/:id", async (req, res) => {
        try {
            const comment = await Comment.findOne({ where: { id: req.params.id } });
            res.json(comment);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.patch("/comment/:id", async (req, res) => {
        try {
            const comment = await Comment.update(req.body, {
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

    app.post("/comments/create", async (req, res) => {
        try {
            const comment = await Comment.create(req.body);
            res.end();
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.delete("/comment/:id", async (req, res) => {
        try {
            await Comment.destroy({ where: { id: req.params.id } });
            res.end();
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });
}