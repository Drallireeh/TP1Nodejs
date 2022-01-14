const express = require('express');
const Joi = require("joi");
const validation = require("express-joi-validation").createValidator({});
const router = express.Router();
const { addContextHeader } = require("../middlewares/comment.middleware");

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

router.use(addContextHeader);

const {
  createComment,
  updateComment,
  deleteComment,
  getOneComment,
  getManyComments,
} = require('../handlers/comments.handler.js');

router.post('/', validation.response(registerCommentSchema), createComment);
router.patch('/:id', validation.response(updateCommentSchema), updateComment);
router.delete('/:id', deleteComment);
router.get('/:id', validation.response(getCommentSchema), getOneComment);
router.get('/', validation.response(getCommentsSchema), getManyComments);

module.exports = router;
