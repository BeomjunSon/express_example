const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.user;
const _= require("lodash");

/*
const User = sequelize.define("user", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({ force: true}).then(()=>{
    return User.create({
        name: "홍길동",
        address: "Seoul"
    });
}).then(()=>{
    return User.create({
        name: "김철수",
        address: "Gwangmyeong"
    });
});

let users = [];
*/

router.get("/", async(req, res) => {
    let result = await User.findAll({
        attributes: ["name"],
        where: {
            address: "Seoul"
        }
    });
    res.send(result);
});

router.get("/address/:address", async(req, res) => {
    let result = await User.findAll({
        where: {
            address: req.params.address
        }
    });
    res.send(result);
});

router.get("/:id", async(req, res) => {
    let result = await User.findOne({
        where: {
            id: req.params.id 
        }
    });
    res.send(result);
});

router.post("/", async(req, res) => {
    let result = false;
    try {
        await User.create({id: req.body.id, name: req.body.name, address: req.body.address});
        await User.setBoard({name: "Test"});
        result = true;
    } catch(err) {
        console.log(err);
    }
    res.send(result);
});

router.put("/:id", async(req, res) => {
    let result = false;
    try {
        await User.update({
            name: req.body.name,
            address: req.body.address
        }, {
            where: {
            id: req.params.id
            }  
        }
        );
        result = true;
    } catch(err) {
        console.log(err);
    }
    res.send(result);
});

router.delete("/:id", async(req, res) => {
    let result = false;
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }  
        }
        );
        result = true;
    } catch(err) {
        console.log(err);
    }
    res.send(result);
});

module.exports = router;