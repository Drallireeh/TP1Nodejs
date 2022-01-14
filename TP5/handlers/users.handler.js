const { User, Post } = require("../models");
const createError = require('http-errors');

const createUser = async (req, res, next) => {
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
        return next(createError(500));
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.end();
    } catch (e) {
        console.log(e)
        return next(createError(404));
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.end();
    } catch (e) {
        console.log(e)
        return next(createError(404));
    }
}

const getOneUser = async (req, res, next) => {
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
        return next(createError(404));
    }
}

const getManyUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        console.log(e)
        return next(createError(500));
    }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
  getManyUsers,
}
