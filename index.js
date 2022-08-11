const {Band} = require('./Band');
const {Musician} = require('./Musician');
const {Song} = require('./Song');

Musician.belongsTo(Band);
Band.hasMany(Musician);

Song.belongsToMany(Band, {through: "Song_id"});
Band.belongsToMany(Song, {through: "Song_id"})

module.exports = {
    Band,
    Musician,
    Song
};
