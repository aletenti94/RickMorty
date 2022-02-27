const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const charactersRoutes = require("./routes/Characters");
const locationsRoutes = require("./routes/Locations");
const episodesRoutes = require("./routes/Episodes");

app.use(bodyParser.json());

app.use('/character', charactersRoutes);
app.use('/location', locationsRoutes);
app.use('/episode', episodesRoutes);

app.use('/', express.static(__dirname));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, 'index.html')); 
});

module.exports = app;