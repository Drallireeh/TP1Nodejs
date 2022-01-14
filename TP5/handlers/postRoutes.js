const { Post, Comment } = require("../models");
const Joi = require("joi");
const validation = require("express-joi-validation").createValidator({});

const registerPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.date().required(),
    userId: Joi.string().required(),
})

const updatePostSchema = Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    content: Joi.string(),
    date: Joi.date(),
    userId: Joi.string(),
})

const postDefinition = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.required(),
    userId: Joi.string().required(),
    createdAt: Joi.required(),
    updatedAt: Joi.required()
}).unknown(true);

const commentDefinition = Joi.object({
    id: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.required(),
    userId: Joi.string().required(),
    postId: Joi.string().required(),
    createdAt: Joi.required(),
    updatedAt: Joi.required()
}).unknown(true);

const getPostSchema = Joi.object({
    post: postDefinition,
    comments: Joi.array().items(commentDefinition)
}).unknown(true);

const getPostsSchema = Joi.array().items(postDefinition).required();

module.exports = function (app) {
    app.get("/posts", validation.response(getPostsSchema), async (req, res) => {
        try {
            const posts = await Post.findAll();
            res.json(posts);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.get("/post/:id", validation.response(getPostSchema), async (req, res) => {
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

    app.patch("/post/:id", validation.body(updatePostSchema), async (req, res) => {
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

    app.post("/posts/create", validation.body(registerPostSchema), async (req, res) => {
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