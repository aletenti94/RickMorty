const https = require('https');
const express = require("express");
const router = express.Router();

router.get('/getAll', function (req, res) {
	const options = {
		method: 'GET',
		host: 'rickandmortyapi.com',
		path: '/api/location',
		json: true,
		params: {}
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
		host: 'rickandmortyapi.com',
		path: `/api/location?page=${req.query.page}`,
		json: true
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

router.get('/getSingle', function (req, res) {
	const options = {
		method: 'GET',
		host: 'rickandmortyapi.com',
		path: `/api/location/${req.query.id}`,
		json: true
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

router.get('/getMultiple', function (req, res) {
	const options = {
		method: 'GET',
		host: 'rickandmortyapi.com',
		path: `/api/location/${req.query.list}`,
		json: true
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