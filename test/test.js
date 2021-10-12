const axios = require("axios");
const expect = require("chai").expect;
const faker = require("faker");
const moment = require("moment");
const { postData, postInvalidData } = require("./../common/utils");
const baseUrl = "http://localhost:3030";
let response;
let errorResponse;

let store = {
    name: faker.random.words(),
    type: faker.random.word(),
    address: faker.address.streetAddress(),
    address2: "",
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
    lat: Number(faker.address.latitude()),
    lng: Number(faker.address.longitude()),
    hours: "Mon: 10-9; Tue: 10-9; Wed: 10-9; Thurs: 10-9; Fri: 9-9; Sat: 9-9; Sun: 10-8",
};

describe("Verify crete new store - happy path", () => {
    before("Crate a new store", async () => {
        response = await postData(`${baseUrl}/stores`, store);
    });

    it("Verufy full store response", function (done) {
        expect(response.id).to.be.ok;
        expect(response.name).eql(store.name);
        expect(response.type).eql(store.type);
        expect(response.address).eql(store.address);
        expect(response.address2).eql(store.address2);
        expect(response.city).eql(store.city);
        expect(response.state).eql(store.state);
        expect(response.zip).eql(store.zip);
        expect(response.lat).eql(store.lat);
        expect(response.lng).eql(store.lng);
        expect(response.hours).eql(store.hours);
        // expect(moment(response.updatedAt).isSameOrAfter(moment()), "updatedAt time should match").to.be.true;
        // expect(moment(response.createdAt).isSameOrAfter(moment()), "createdAt time should match").to.be.true;
        done()
    });

    it("Verify individualy store response", (done) => {
        expect(typeof response.name).to.eql("string");
        expect(response.name).eql(store.name);
        done()
    });
});

describe("Verify negative test scenarios crate a new store", function () {
    it("verify empty store name", async () => {
        store.name = "";
        errorResponse = await postInvalidData(`${baseUrl}/stores`, store);
        expect(errorResponse[0]).to.eql("'name' should NOT be shorter than 1 characters");
    });

    it("verify max char store name", async () => {
        store.name = "x".repeat(101);
        errorResponse = await postInvalidData(`${baseUrl}/stores`, store);
        expect(errorResponse[0]).to.eql("'name' should NOT be longer than 100 characters");
    });

    it("verify different data type store name", async () => {
        let randomValue = faker.helpers.randomize([null, 10, true, false, {}, []]);
        store.name = randomValue;
        errorResponse = await postInvalidData(`${baseUrl}/stores`, store);
        expect(errorResponse[0]).to.eql("'name' should be string");
    });

    it("verify missing store name", async () => {
        delete store.name;
        errorResponse = await postInvalidData(`${baseUrl}/stores`, store);
        expect(errorResponse[0]).to.eql("should have required property 'name'");
    });
});
