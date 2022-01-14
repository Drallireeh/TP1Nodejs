const { Role } = require("../models");
const Joi = require("joi");
const validation = require("express-joi-validation").createValidator({});

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

module.exports = function (app) {
    app.get("/roles", validation.response(getRolesSchema), async (req, res) => {
        try {
            const roles = await Role.findAll();
            res.json(roles);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.get("/role/:id", validation.response(getRoleSchema), async (req, res) => {
        try {
            const role = await Role.findOne({ where: { id: req.params.id } });
            res.json(role);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.patch("/role/:id", validation.body(updateRoleSchema), async (req, res) => {
        try {
            const role = await Role.update(req.body, {
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

    app.post("/roles/create", validation.body(registerRoleSchema), async (req, res) => {
        try {
            const role = await Role.create(req.body);
            res.end();
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.delete("/role/:id", async (req, res) => {
        try {
            await Role.destroy({ where: { id: req.params.id } });
            res.end();
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });
}