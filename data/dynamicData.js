const faker = require("faker");

let oStore = {
    name: faker.random.words(),
    type: faker.random.word(),
    address: faker.address.streetAddress(),
    address2: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
    lat: Number(faker.address.latitude()),
    lng: Number(faker.address.longitude()),
    hours: "Mon: 10-9; Tue: 10-9; Wed: 10-9; Thurs: 10-9; Fri: 9-9; Sat: 9-9; Sun: 10-8"
};

let oStoreRequired = {
    name: faker.random.words(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode()
};

module.exports = {
    oStore,
    oStoreRequired
}