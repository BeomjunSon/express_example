module.exports = (sequelize, DataTypes) => {

    const Board = sequelize.define("board", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        viewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    });

    Board.associate = function(models) {
        models.board.hasOne(models.user);
    };

    return Board;
};