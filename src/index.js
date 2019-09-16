const express = require("express");
const app = express();
const user_route = require("./route/users");
const board_route = require("./route/boards");
const models = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", user_route);
app.use("/boards", board_route);

models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {raw: true}).then(() => {
    models.sequelize.sync({force: true}).then(() => {
        app.listen(3000);
    });
});

let users = [{
    id: 1,
    name: "홍길동"
},{
    id: 2,
    name: "강철수"
}];
let user = null;

app.get("/", (req, res) => {
    res.send("test");
});
