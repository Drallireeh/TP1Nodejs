const { Role } = require("../models");

const createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.end();
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const updateRole = async (req, res) => {
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
}

const deleteRole = async (req, res) => {
    try {
        await Role.destroy({ where: { id: req.params.id } });
        res.end();
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const getOneRole = async (req, res) => {
    try {
        const role = await Role.findOne({ where: { id: req.params.id } });
        res.json(role);
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

const getManyRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (e) {
        console.log(e)
        res.send("Erreur !");
    }
}

module.exports = {
  createRole,
  updateRole,
  deleteRole,
  getOneRole,
  getManyRoles,
}
