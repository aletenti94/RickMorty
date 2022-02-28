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
 * get characters
 */
router.get('/getAll', function (req, res) {
	const options = {
		method: 'GET',
		host: 'rickandmortyapi.com',
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

/**
 * get page of characters
 */
router.get('/getPage', function (req, res) {
	const options = {
		method: 'GET',
		host: 'rickandmortyapi.com',
		path: `/api/character?page=${req.query.page}`,
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
 * 
 */
module.exports = router;