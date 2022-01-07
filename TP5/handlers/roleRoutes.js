const { Role } = require("../models");

module.exports = function (app) {
    app.get("/roles", async (req, res) => {
        try {
            const roles = await Role.findAll();
            res.json(roles);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.get("/role/:id", async (req, res) => {
        try {
            const role = await Role.findOne({ where: { id: req.params.id } });
            res.json(role);
        } catch (e) {
            console.log(e)
            res.send("Erreur !");
        }
    });

    app.patch("/role/:id", async (req, res) => {
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

    app.post("/roles/create", async (req, res) => {
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