const axios = require('axios').default;
const logger = require('./../logger/logger');

async function getData(url) {
    const response = await axios({
        method: "get",
        url: url,
    })
        .then((res) => res)
        .catch((err) => err);
    return response;
}

async function postData(url, body) {
    const response = await axios({
        method: "post",
        url: url,
        data: body,
    })
        .then((res) => res)
        .catch((err) => err);
        
    if (response.isAxiosError) {
        // logger.info(response.response);
        console.log(response.response.data)
        return response.response

    } else {
        // console.log(response.data)
        return response
    }
}

async function deleteData(url) {
    const response = await axios({
        method: "delete",
        url: url
    })
        .then((res) => res)
        .catch((err) => err);
    return response;
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
    // const printable = `Response: ${new Date()}  \nStatus: ${x.status}  \nHeaders: ${JSON.stringify(x.headers)}  \nBody: ${ JSON.stringify(x.data) }`
    const printable = `Response: \nStatus: ${x.status} \nBody: ${ JSON.stringify(x.data) }`

    console.log(printable)
    return x;
})

module.exports = {
    getData,
    postData,
    deleteData
};
