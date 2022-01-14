const express = require('express');
const Joi = require("joi");
const validation = require("express-joi-validation").createValidator({});
const router = express.Router();

const registerRoleSchema = Joi.object({
    name: Joi.string().required()
});

const updateRoleSchema = Joi.object({
    name: Joi.string()
});

const roleDefinition = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    createdAt: Joi.required(),
    updatedAt: Joi.required()
}).unknown(true);

const getRoleSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    createdAt: Joi.required(),
    updatedAt: Joi.required()
}).unknown(true);

const getRolesSchema = Joi.array().items(roleDefinition).required();

const {
  createRole,
  updateRole,
  deleteRole,
  getOneRole,
  getManyRoles,
} = require('../handlers/roles.handler.js');

router.post('/', validation.body(registerRoleSchema), createRole);
router.patch('/:id',  validation.body(updateRoleSchema), updateRole);
router.delete('/:id', deleteRole);
router.get('/:id', validation.response(getRoleSchema), getOneRole);
router.get('/', validation.response(getRolesSchema), getManyRoles);

module.exports = router;
