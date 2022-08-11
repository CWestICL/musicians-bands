const {Sequelize, sequelize} = require('./db');
const { DataTypes } = require('sequelize');

const Musician = sequelize.define("Musician", {
    name: {
        type: DataTypes.STRING
    },
    instrument: {
        type: DataTypes.STRING
    }
});

module.exports = {
    Musician
};