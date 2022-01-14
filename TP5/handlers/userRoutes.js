const { User, Post } = require("../models");
const Joi = require("joi");
const validation = require("express-joi-validation").createValidator({});

const registerUserSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string()
        .required()
        .alphanum()
        .min(3)
        .max(30),
    github: Joi.string().required(),
})

const updateUserSchema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string(),
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    github: Joi.string(),
})

const userDefinition = Joi.object({
    id: Joi.string().required(),
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    github: Joi.string().required(),
    createdAt: Joi.required(),
    updatedAt: Joi.required(),
}).unknown(true);

postDefinition = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.date().required(),
    userId: Joi.string().required(),
    createdAt: Joi.required(),
    updatedAt: Joi.required()
}).unknown(true);

const getUserSchema = Joi.object({
    user: userDefinition,
    posts: Joi.array().items(postDefinition)
}).unknown(true);

const getUsersSchema = Joi.array().items(userDefinition).required();

const querySchema = Joi.object({
    posts: Joi.boolean()
});

module.exports = function (app) {
    app.get("/users", validation.response(getUsersSchema), async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.get("/user/:id", validation.response(getUserSchema), validation.query(querySchema), async (req, res) => {
        try {
            const user = await User.findOne({ where: { id: req.params.id } });
            if (req.query && req.query.posts == true) {
                const posts = await Post.findAll({
                    where: { userId: user.id }
                });
                res.send({ "user": user, "posts": posts })
            } else res.send({ "user": user })
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.patch("/user/:id", validation.body(updateUserSchema), async (req, res) => {
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

    app.post("/users/create", validation.body(registerUserSchema), async (req, res) => {
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