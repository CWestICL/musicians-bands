const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    let b1;
    let b2;
    let m1;
    let s1;
    let s2;
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
        b1 = await Band.create({
            name: "Black Sabbath",
            genre: "Heavy Metal"
        });
        m1 = await Musician.create({
            name: "Bill Ward",
            instrument: "Drums"
        });
        s1 = await Song.create({
            title: "Iron Man",
            year: 1970
        });
        s2 = await Song.create({
            title: "Smoke on the Water",
            year: 1972
        });
    });

    test('can create a Band', async () => {
        expect(b1.name).toBe("Black Sabbath");
        expect(b1.genre).toBe("Heavy Metal");
    })

    test('can create a Musician', async () => {
        expect(m1.name).toBe("Bill Ward");
        expect(m1.instrument).toBe("Drums");
    })

    test('can add Musicians to Bands', async () => {
        b1.createMusician({
            name: "Ozzy Osbourne",
            instrument: "Vocals"
        });
        b2 = await Band.create({
            name: "Deep Purple",
            genre: "Hard Rock"
        });
        b2.createMusician({
            name: "Ritchie Blackmore",
            instrument: "Guitar"
        });
        b2.createMusician({
            name: "Ian Gillan",
            instrument: "Vocals"
        });
        const bands = await Band.findAll();
        console.log("#############",bands);
        sabbathMembers = await bands[0].getMusicians();
        purpleMembers = await bands[1].getMusicians();
        expect(sabbathMembers[0].name).toBe("Ozzy Osbourne");
        expect(purpleMembers[0].name).toBe("Ritchie Blackmore");
        expect(purpleMembers[1].name).toBe("Ian Gillan");
    })

    test('can add Songs to Bands', async () => {
        await b1.addSong(s1);
        await b2.addSong(s1);
        await b2.addSong(s2);
        sabbathSongs = await b1.getSongs();
        purpleSongs = await b2.getSongs();
        expect(sabbathSongs.length).toBe(1);
        expect(purpleSongs.length).toBe(2);
        expect(sabbathSongs[0].title).toBe("Iron Man");
        expect(purpleSongs[0].title).toBe("Iron Man");
        expect(purpleSongs[1].title).toBe("Smoke on the Water");
    })
})