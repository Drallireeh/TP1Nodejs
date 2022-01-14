const { User, Post } = require("../models");

const createUser = async (req, res) => {
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
}

const updateUser = async (req, res) => {
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
}

const deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.end();
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const getOneUser = async (req, res) => {
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
}

const getManyUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
  getManyUsers,
}
