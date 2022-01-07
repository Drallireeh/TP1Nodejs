const { User } = require("./models");

module.exports = function (app) {

    app.get("/users", (req, res) => {
        try {
            const users = User.findAll();
            console.log(users)
        } catch(e) {
            console.log(e)
        }
        res.send("All users");
    });

    app.get("/user/:id", (req, res) => {
        res.send("User id :" + req.params.id)
    });

    app.patch("/users/:id", async (req, res) => {
        let body = req.body;
        const user = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.send("User edit : ", user);
    });

    app.post("/users/create", async (req, res) => {
        const user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            github: req.body.github
        });
        res.end();
    });

    app.delete("/users/:id", (req, res) => {
        res.send("Delete user id:" + req.params.id);
    });
}