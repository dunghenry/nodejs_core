const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../configs/connect.mysql');
const User = sequelize.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = User;
