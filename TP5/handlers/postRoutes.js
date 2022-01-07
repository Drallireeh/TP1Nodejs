const { Post, Comment } = require("../models");

module.exports = function (app) {
    app.get("/posts", async (req, res) => {
        try {
            const posts = await Post.findAll();
            res.json(posts);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.get("/post/:id", async (req, res) => {
        try {
            const post = await Post.findOne({ where: { id: req.params.id } });
            if (req.query && req.query.comments == "yes") {
                const comments = await Comment.findAll({
                    where: {postId: post.id}
                });
                res.send({ "post": post, "comments": comments })
            } else res.send({ "post": post })
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.patch("/post/:id", async (req, res) => {
        try {
            const post = await Post.update(req.body, {
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

    app.post("/posts/create", async (req, res) => {
        try {
            const post = await Post.create(req.body);
            res.end();
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.delete("/post/:id", async (req, res) => {
        try {
            await Post.destroy({ where: { id: req.params.id } });
            res.end();
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });
}