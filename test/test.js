const expect = require("chai").expect;
const moment = require("moment");
const faker = require("faker");
const { getData, postData, deleteData } = require("./../common/utils");
const dynamicStoreData = require('./../data/dynamicData');
let oStore = dynamicStoreData.oStore;
let oStoreRequired = dynamicStoreData.oStoreRequired;
let oStoreStatic = require('./../data/staticData').store;
let storeID;
const httpToCurl = require('http-to-curl').default;
httpToCurl();
const baseUrl = "http://localhost:3030";

describe("Check that user is able to create a new store - happy path", () => {
   
    it("Check that user is able to create a new store with dynamic test data", async () => {
        let { status, data } = await postData(`${baseUrl}/stores`, oStore);
        storeID = data.id;
        
        expect(status, "Status should be 201").to.eql(201);
        expect(data.id, "'store Id' should be created").to.be.ok;
        expect(data.name, "'name' should be matched").eql(oStore.name);
        expect(data.type, "'type' should be matched").eql(oStore.type);
        expect(data.address, "'address' should be matched").eql(oStore.address);
        expect(data.address2, "'address2' should be matched").eql(oStore.address2);
        expect(data.city, "'city' should be matched").eql(oStore.city);
        expect(data.state, "'state' should be matched").eql(oStore.state);
        expect(data.zip, "'zip' should be matched").eql(oStore.zip);
        expect(data.lat, "'lat' should be matched").eql(oStore.lat);
        expect(data.lng, "'lng' should be matched").eql(oStore.lng);
        expect(data.hours, "'hours' should be matched").eql(oStore.hours);
        // expect(moment(data.updatedAt).isSameOrAfter(moment()), "updatedAt time should match").to.be.true;
        // expect(moment(data.createdAt).isSameOrAfter(moment()), "createdAt time should match").to.be.true;
    });

    it("Check that user is able to create a new store with required fields only", async () => {
        let { status, data } = await postData(`${baseUrl}/stores`, oStoreRequired);
        storeID = data.id;
        
        expect(status, "Status should be 201").to.eql(201);
        expect(data.id, "'store Id' should be created").to.be.ok;
        expect(data.name, "'name' should be matched").eql(oStoreRequired.name);
        expect(data.address, "'address' should be matched").eql(oStoreRequired.address);
        expect(data.city, "'city' should be matched").eql(oStoreRequired.city);
        expect(data.state, "'state' should be matched").eql(oStoreRequired.state);
        expect(data.zip, "'zip' should be matched").eql(oStoreRequired.zip);
        expect(data, '"type" should not be in the response').to.not.haveOwnProperty('type');
        expect(data, '"address2" should not be in the response').to.not.haveOwnProperty('addess2');
        expect(data, '"lat" should not be in the response').to.not.haveOwnProperty('lat');
        expect(data, '"lng" should not be in the response').to.not.haveOwnProperty('lng');
        expect(data, '"hours" should not be in the response').to.not.haveOwnProperty('hours');
        // expect(moment(data.updatedAt).isSameOrAfter(moment()), "updatedAt time should match").to.be.true;
        // expect(moment(data.createdAt).isSameOrAfter(moment()), "createdAt time should match").to.be.true;
    });

    it("Verify user is able to create a new store with static test data", async () => {
        let { status, data } = await postData(`${baseUrl}/stores`, oStoreStatic);
        storeID = data.id;
        
        expect(status, "Status should be 201").to.eql(201);
        expect(data.id, "'store Id' should be created").to.be.ok;
        expect(data.name, "'name' should be matched").eql(oStoreStatic.name);
        expect(data.type, "'type' should be matched").eql(oStoreStatic.type);
        expect(data.address, "'address' should be matched").eql(oStoreStatic.address);
        expect(data.address2, "'address2' should be matched").eql(oStoreStatic.address2);
        expect(data.city, "'city' should be matched").eql(oStoreStatic.city);
        expect(data.state, "'state' should be matched").eql(oStoreStatic.state);
        expect(data.zip, "'zip' should be matched").eql(oStoreStatic.zip);
        expect(data.lat, "'lat' should be matched").eql(oStoreStatic.lat);
        expect(data.lng, "'lng' should be matched").eql(oStoreStatic.lng);
        expect(data.hours, "'hours' should be matched").eql(oStoreStatic.hours);
        // expect(moment(data.updatedAt).isSameOrAfter(moment()), "updatedAt time should match").to.be.true;
        // expect(moment(data.createdAt).isSameOrAfter(moment()), "createdAt time should match").to.be.true;
    });

    afterEach('Delete a store', async () => {
        await deleteData(`${baseUrl}/stores/${storeID}`);
    });
});

describe("Negative test scenarios", () => {

    it("Check that user is not able to create a store if the store name is empty string", async () => {
        oStore.name = "";
        let { status, data : { errors }} = await postData(`${baseUrl}/stores`, oStore);

        expect(status, "Status should be 400").to.eql(400);
        expect(...errors).to.eql("'name' should NOT be shorter than 1 characters");
    });

    it("Check that user is not able to create a store if the store name exceeds the maximum amount of characters", async () => {
        let maxValues = [faker.datatype.string(101), faker.datatype.string(5000)]
        maxValues.forEach( async value => {
            oStore.name = await value;
            let { status, data : { errors }} = await postData(`${baseUrl}/stores`, oStore);
        
            expect(status, "Status should be 400").to.eql(400);
            expect(...errors, "Should match error msg").to.eql("'name' should NOT be longer than 100 characters"); 
        });
    });

    it("Check that user is not able to create a store if the store name is invalida data type", async () => {
        let invalidValues = [null, faker.datatype.number({min: -100, max: 100}), faker.datatype.boolean()];
        invalidValues.forEach( async value => {
            oStore.name = await value;
            let { status, data : { errors }} = await postData(`${baseUrl}/stores`, oStore);

            expect(status, "Status should be 400").to.eql(400);
            expect(...errors, "Should match error msg").to.eql("'name' should be string");
        });
    });

    it("Check that user is not able to create a store without name", async () => {
        delete oStore.name;
        let { status, data : { errors }} = await postData(`${baseUrl}/stores`, oStore);
            
        expect(status, "Status should be 400").to.eql(400);
        expect(...errors, "Should match error msg").to.eql("should have required property 'name'");
    });

    it("Check that user is not able to create a store without required fields", async () => {
        oStore = {};
        let { status, data : { errors }} = await postData(`${baseUrl}/stores`, oStore);

        expect(status, "Status should be 400").to.eql(400);
        expect(errors, "Should match error msg for 'name' field").to.include("should have required property 'name'");
        expect(errors, "Should match error msg for 'address' field").to.include("should have required property 'address'");
        expect(errors, "Should match error msg for 'city' field").to.include("should have required property 'city'");
        expect(errors, "Should match error msg for 'state' field").to.include("should have required property 'state'");
        expect(errors, "Should match error msg for 'zip' field").to.include("should have required property 'zip'");
        expect(errors.length, "Should have five errors").to.eql(5);
    });

    it("Check that user is not able to create a store with non-existent property", async () => {
        let key = faker.random.word();
        oStore[key] = "test";
        let { status, data : { errors }} = await postData(`${baseUrl}/stores`, oStore);

        expect(status, "Status should be 400").to.eql(400);
        expect(...errors, "Should match error msg").to.eql(`should NOT have additional properties: '${key}'`);
    });
});
