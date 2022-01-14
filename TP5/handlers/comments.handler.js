const { Comment } = require("../models");
const createError = require('http-errors');

const createComment = async (req, res, next) => {
    try {
        const comment = await Comment.create(req.body);
        res.end();
    } catch (e) {
        console.log(e)
        return next(createError(500));
    }
}

const updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.update(req.body, {
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

const deleteComment = async (req, res, next) => {
    try {
        await Comment.destroy({ where: { id: req.params.id } });
        res.end();
    } catch (e) {
        console.log(e)
        return next(createError(404));
    }
}

const getOneComment = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id } });
        res.json(comment);
    } catch (e) {
        console.log(e)
        return next(createError(404));
    }
}

const getManyComments = async (req, res, next) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (e) {
        console.log(e)
        return next(createError(500));
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getOneComment,
    getManyComments,
}
