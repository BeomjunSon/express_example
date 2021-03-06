module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function(models) {
        models.user.belongsTo(models.board);
    };
    return User;
};