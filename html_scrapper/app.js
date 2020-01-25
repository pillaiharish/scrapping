var express = require('Express');
var app = express();

var scrapJS = require('./scrap.js');

app.use("/getDOM", scrapJS);

app.listen(3002);