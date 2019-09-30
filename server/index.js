const express = require("express");
const app = express();
const user_route = require("./route/users");
const board_route  = require("./route/boards");
const models = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", user_route);
app.use("/boards", board_route);

// 외래키 체크를 하지 않음
models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {raw: true})
.then(() => {
    models.sequelize.sync({force:true}).then(()=> {
        app.listen(3000);
    });
});

app.get("/", (req, res) => {
    res.send("test");
});