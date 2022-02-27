const https = require('https');

module.exports.get = function(path, cb) {
    const options = {
		method: 'GET',
		host: 'rickandmortyapi.com',
		path: path,
		json: true
	}
	
	https.request(options, function(response) {
		response.setEncoding('utf8');
		let retData = '';
		response.on('data', function (data) {
			retData += data;
		});

		response.on('end', function() {
            cb(retData);
		})
	}).end();
}