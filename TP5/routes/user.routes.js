const express = require('express');
const Joi = require("joi");
const validation = require("express-joi-validation").createValidator({});
const router = express.Router();

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

const {
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
  getManyUsers,
} = require('../handlers/users.handler.js');

router.post('/', validation.body(registerUserSchema), createUser);
router.patch('/:id', validation.body(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', validation.response(getUserSchema), validation.query(querySchema), getOneUser);
router.get('/', validation.response(getUsersSchema), getManyUsers);

module.exports = router;
