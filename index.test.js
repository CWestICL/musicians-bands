const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    let b1;
    let b2;
    let m1;
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        b1 = await Band.create({
            name: "Black Sabbath",
            genre: "Heavy Metal"
        });
        expect(b1.name).toBe("Black Sabbath");
        expect(b1.genre).toBe("Heavy Metal");
    })

    test('can create a Musician', async () => {
        m1 = await Musician.create({
            name: "Bill Ward",
            instrument: "Drums"
        });
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
})