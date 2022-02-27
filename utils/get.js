const https = require('https');

export const get = (opt, res) => {
    const options = {
		method: 'GET',
		host: opt.host,
		path: opt.path,
		params: opt.params,
		json: true
	}
	
	https.request(options, function(response) {
		response.setEncoding('utf8');
		let retData = '';
		response.on('data', function (data) {
			retData += data;
		});

		response.on('end', function() {
            res(JSON.parse(retData));
		})
	}).end();
}