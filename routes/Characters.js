const https = require('https');
const express = require("express");
const router = express.Router();

require('dotenv').config()

const get = require('../utils/get');

router.get('/getAll', function (req, res) {
	const options = {
		method: 'GET',
		host: process.env.HOST,
		path: '/api/character'
	}
	
	https.request(options, function(response) {
		response.setEncoding('utf8');
		let retData = '';
		response.on('data', function (data) {
			retData += data;
		});

		response.on('end', function() {
			res.status(200).json(JSON.parse(retData));
		})
	}).end();
})

router.get('/getPage', function (req, res) {
	const options = {
		method: 'GET',
		host: process.env.HOST,
		path: `/api/character?page=${req.query.page}`,
	}
	
	https.request(options, function(response) {
		response.setEncoding('utf8');
		let retData = '';
		response.on('data', function (data) {
			retData += data;
		});

		response.on('end', function() {
			res.status(200).json(JSON.parse(retData));
		})
	}).end();
})

module.exports = router;