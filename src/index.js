const express = require("express");
const app = express();
const user_router = require("./route/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", user_router);

app.listen(3000);

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

