const request = require('request');

const createRequest = (input, callback) => {
  let url = "https://api.1forge.com/";
  const endpoint = input.data.endpoint || "convert";
  url = url + endpoint;

  const from = input.data.from || "";
  const to = input.data.to || "";
  const pairs = input.data.pairs || "";
  const quantity = input.data.quantity || 1;

  let queryObj = {
    from: from,
    to: to,
    pairs: pairs,
    quantity: quantity,
    api_key: process.env.API_KEY
  }
  for (let key in queryObj) {
    if (queryObj[key] === "") {
      delete queryObj[key];
    }
  }

  const options = {
    url: url,
    qs: queryObj,
    json: true
  }
  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400) {
      callback(response.statusCode, {
        jobRunID: input.id,
        status: "errored",
        error: body,
        statusCode: response.statusCode
      });
    } else {
      callback(response.statusCode, {
        jobRunID: input.id,
        data: body,
        result: body.value || body[0].price,
        statusCode: response.statusCode
      });
    }
  });
};

exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data);
  });
};

exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
}

module.exports.createRequest = createRequest;
