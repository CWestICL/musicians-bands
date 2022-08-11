const {Sequelize, sequelize} = require('./db');
const { DataTypes } = require('sequelize');

const Song = sequelize.define("Song", {
    title: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    }
});

module.exports = {
    Song
};