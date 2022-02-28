/**
 * external modules import
 */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

/**
 * import custom resources routing
 */
const charactersRoutes = require("./routes/Characters");
const locationsRoutes = require("./routes/Locations");
const episodesRoutes = require("./routes/Episodes");

/**
 * express init
 */
const app = express();

/**
 * use JSON for middleware
 */
app.use(bodyParser.json());

/**
 * API routing settings
 */
app.use('/character', charactersRoutes);
app.use('/location', locationsRoutes);
app.use('/episode', episodesRoutes);

/**
 * root directory specification
 */
app.use('/', express.static(__dirname));

/**
 * set index as main root
 */
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

/**
 * redirect to index if invalid URL is specified
 */
app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, 'index.html')); 
});

module.exports = app;