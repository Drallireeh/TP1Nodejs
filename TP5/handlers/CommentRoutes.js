const { Comment } = require("../models");
const Joi = require("joi");
const validation = require("express-joi-validation").createValidator({});

const registerCommentSchema = Joi.object({
    content: Joi.string().required(),
    date: Joi.required(),
    userId: Joi.string().required(),
    postId: Joi.string().required(),
});

const updateCommentSchema = Joi.object({
    content: Joi.string(),
    date: Joi.date(),
});

const commentDefinition = Joi.object({
    id: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.required(),
    userId: Joi.string().required(),
    postId: Joi.string().required(),
    createdAt: Joi.required(),
    updatedAt: Joi.required()
}).unknown(true);

const getCommentSchema = Joi.object({
    id: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.date().required(),
    userId: Joi.string().required(),
    postId: Joi.string().required(),
    createdAt: Joi.required(),
    updatedAt: Joi.required()
}).unknown(true);

const getCommentsSchema = Joi.array().items(commentDefinition).required();

module.exports = function (app) {
    app.get("/comments", validation.response(getCommentsSchema), async (req, res) => {
        try {
            const comments = await Comment.findAll();
            res.json(comments);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.get("/comment/:id", validation.response(getCommentSchema), async (req, res) => {
        try {
            const comment = await Comment.findOne({ where: { id: req.params.id } });
            res.json(comment);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.patch("/comment/:id", validation.body(updateCommentSchema), async (req, res) => {
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

    app.post("/comments/create", validation.body(registerCommentSchema), async (req, res) => {
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