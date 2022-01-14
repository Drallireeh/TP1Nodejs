const express = require('express');
const Joi = require("joi");
const validation = require("express-joi-validation").createValidator({passError: true});
const router = express.Router();
const { addContextHeader } = require("../middlewares/post.middleware");

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

const querySchema = Joi.object({
    comments: Joi.boolean()
});

router.use(addContextHeader);

const {
  createPost,
  updatePost,
  deletePost,
  getOnePost,
  getManyPosts,
} = require('../handlers/posts.handler.js');

router.post('/', validation.body(registerPostSchema), createPost);
router.patch('/:id',  validation.body(updatePostSchema), updatePost);
router.delete('/:id', deletePost);
router.get('/:id', validation.response(getPostSchema), validation.query(querySchema), getOnePost);
router.get('/', validation.response(getPostsSchema), getManyPosts);

module.exports = router;
