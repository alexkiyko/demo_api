const axios = require('axios').default;
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

axios.interceptors.request.use(x => {
    const headers = {
        ...x.headers.common,
        ...x.headers[x.method],
        ...x.headers
    };

    ['common','get', 'post', 'head', 'put', 'patch', 'delete'].forEach(header => {
        delete headers[header]
    })

    const printable = `Request: ${new Date()} \nMethod: ${x.method.toUpperCase()} \nUrl: ${x.url} \nHeaders: ${ JSON.stringify(headers)} \nBody: ${ JSON.stringify( x.data) }`
    console.log(printable)
    return x;
})

axios.interceptors.response.use(x => {
    const printable = `Response: ${new Date()}  \nStatus: ${x.status}  \nHeaders: ${JSON.stringify(x.headers)}  \nBody: ${ JSON.stringify(x.data) }`
    console.log(printable)
    return x;
})

module.exports = {
    getData,
    postData,
    postInvalidData,
};
