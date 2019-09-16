const express = require("express");
const router = express.Router();
const models = require("../models");
const Board = models.board;

/*
const Board = sequelize.define("boards", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

// Example data
Board.sync({ force: true }).then(() => {
    return Board.create({
        title: "게시글 테스트",
        content: "우와 안녕하세요",
        viewCount: 0
    });
}).then(() => {
    return Board.create({
        title: "가입했어요",
        content: "반가웡",
        viewCount: 0
    });
});
*/

router.get("/", async(req, res) => {
    let result = await Board.findAll({
        attributes: ["title"]
    });
    res.send(result);
});

router.get("/:id", async(req, res) => {
    let result = await Board.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(result);
});

router.post("/", async(req, res) => {
    let result = false;
    try {
        await Board.create({id: req.body.id, title: req.body.title, content: req.body.content});
        result = true;
    } catch(err) {
        console.error(err);
    }
    res.send(result);
});

router.put("/:id", async(req, res) => {
    let result = false;
    try {
        await Board.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        result = true;
    } catch (err) {
        console.error(err);
    }

    res.send(result);
});

router.delete("/:id", async(req, res) => {
    let result = false;
    try {
        await Board.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        result = true;
    } catch (err) {
        console.error(err);
    }
    res.send(result);
});

module.exports = router;