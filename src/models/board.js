module.exports = (sequelize, DataTypes) => {

    const Board = sequelize.define("board", {
        title : {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Board;
};