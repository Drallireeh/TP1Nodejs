const { Comment } = require("../models");

const createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.end();
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const updateComment = async (req, res) => {
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
}

const deleteComment = async (req, res) => {
    try {
        await Comment.destroy({ where: { id: req.params.id } });
        res.end();
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const getOneComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id } });
        res.json(comment);
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const getManyComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getOneComment,
    getManyComments,
}
