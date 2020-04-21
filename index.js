const {Requester, Validator} = require('external-adapter')

// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = (body) => {
  return (body.error)
}

// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.
const customParams = {
  base: ['base', 'from', 'coin', 'fsym'],
  quote: ['quote', 'to', 'market', 'tsyms'],
  endpoint: false,
  pairs: false,
  quantity: false
}

const createRequest = (input, callback) => {
  const validator = new Validator(input, customParams, callback)
  const jobRunID = validator.validated.id
  const endpoint = validator.validated.data.endpoint || 'convert'
  const url = `https://api.1forge.com/${endpoint}`
  const from = validator.validated.data.base.toUpperCase()
  const to = validator.validated.data.quote.toUpperCase()
  const pairs = validator.validated.data.pairs
  const quantity = validator.validated.data.quantity || 1
  const apikey = process.env.API_KEY

  const qs = {
    from,
    to,
    pairs,
    quantity,
    apikey
  }

  const options = {
    url,
    qs
  }

  Requester.requestRetry(options, customError)
      .then(response => {
        response.body.result = Requester.validateResult(response.body, ["value"])
        callback(response.statusCode, Requester.success(jobRunID, response))
      })
      .catch(error => {
        callback(500, Requester.errored(jobRunID, error))
      })
}

exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    })
  })
}

module.exports.createRequest = createRequest
