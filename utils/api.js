'use strict'

const request = require('request')

var apiRequest = request.defaults({
  baseUrl: 'https://da-mais-proximo.herokuapp.com/',
  json: true,
  headers: {'x-token': 'my-token'}
})

module.exports = apiRequest
