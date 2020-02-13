const assert = require('chai').assert
const createRequest = require('../index.js').createRequest

describe('createRequest', () => {

  context('quotes', () => {
    const jobID = '278c97ffadb54a5bbb93cfec5f7b5503'
    const req = {
      id: jobID,
      data: {
        endpoint: 'quotes',
        pairs: 'EURUSD'
      }
    }

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200)
        assert.equal(data.jobRunID, jobID)
        assert.isNotEmpty(data.data)
        assert.isNumber(data.result)
        done()
      })
    })
  })

  context('convert', () => {
    const jobID = '278c97ffadb54a5bbb93cfec5f7b5503'
    const req = {
      id: jobID,
      data: {
        endpoint: 'convert',
        from: 'USD',
        to: 'EUR',
        quantity: 100
      }
    }

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200)
        assert.equal(data.jobRunID, jobID)
        assert.isNotEmpty(data.data)
        assert.isNumber(data.result)
        done()
      })
    })
  })

  context('deviator FX', () => {
    const jobID = '278c97ffadb54a5bbb93cfec5f7b5503'
    const req = {
      id: jobID,
      data: {
        from: 'XAU',
        to: 'USD'
      }
    }

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200)
        assert.equal(data.jobRunID, jobID)
        assert.isNotEmpty(data.data)
        assert.isNumber(data.result)
        done()
      })
    })
  })
})
