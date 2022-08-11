const {Sequelize, sequelize} = require('./db');
const { DataTypes } = require('sequelize');

const Band = sequelize.define("Band", {
    name: {
        type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.STRING
    }
});

module.exports = {
    Band
};