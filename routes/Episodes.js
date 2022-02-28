/**
 * external modules import
 */
const https = require('https');
const express = require("express");

/**
 * router init
 */
const router = express.Router();

/**
 * get episodes
 */
router.get('/getAll', function (req, res) {
	const options = {
		method: 'GET',
		host: 'rickandmortyapi.com',
		path: '/api/episode',
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

/**
 * get page of episodes
 */
router.get('/getPage', function (req, res) {
	const options = {
		method: 'GET',
		host: 'rickandmortyapi.com',
		path: `/api/episode?page=${req.query.page}`,
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

/**
 * get multiple episodes 
 */
router.get('/getMultiple', function (req, res) {
	const options = {
		method: 'GET',
		host: 'rickandmortyapi.com',
		path: `/api/episode/${req.query.list}`,
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