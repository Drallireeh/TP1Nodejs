const { Role } = require("../models");
const createError = require('http-errors');

const createRole = async (req, res, next) => {
    try {
        const role = await Role.create(req.body);
        res.end();
    } catch (e) {
        console.log(e)
        return next(createError(500));
    }
}

const updateRole = async (req, res, next) => {
    try {
        const role = await Role.update(req.body, {
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

const deleteRole = async (req, res, next) => {
    try {
        await Role.destroy({ where: { id: req.params.id } });
        res.end();
    } catch (e) {
        console.log(e)
        return next(createError(404));
    }
}

const getOneRole = async (req, res, next) => {
    try {
        const role = await Role.findOne({ where: { id: req.params.id } });
        res.json(role);
    } catch (e) {
        console.log(e)
        return next(createError(404));
    }
}

const getManyRoles = async (req, res, next) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (e) {
        console.log(e)
        return next(createError(500));
    }
}

module.exports = {
    createRole,
    updateRole,
    deleteRole,
    getOneRole,
    getManyRoles,
}
