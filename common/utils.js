const axios = require("axios");
const expect = require("chai").expect;

async function getData(url) {
    const response = await axios({
        method: "get",
        url: url,
    })
        .then((res) => res)
        .catch((err) => err);
    expect(response.status).equal(200);
    return response.data;
}

async function postData(url, body) {
    const response = await axios({
        method: "post",
        url: url,
        data: body,
    })
        .then((res) => res)
        .catch((err) => err);
    expect(response.status).equal(201);
    return response.data;
}

async function postInvalidData(url, body) {
    const response = await axios({
        method: "post",
        url: url,
        data: body,
    })
        .then((res) => res)
        .catch((err) => err);
    expect(response.response.status).equal(400);
    expect(response.response.data.name).to.eql("BadRequest");
    expect(response.response.data.message).to.eql("Invalid Parameters");
    expect(response.response.data.code).to.eql(400);
    expect(response.response.data.className).to.eql("bad-request");
    return response.response.data.errors;
}

module.exports = {
    getData,
    postData,
    postInvalidData,
};
