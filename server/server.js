const express = require('express')
var cors = require('cors')
const app = express()
var fs = require('fs');
var jsonQuery = require('json-query')
var __dirname = 'server';

app.use(cors());
app.listen(3000, function () {
    console.log('listening')
});
app.get('/airports', function (req, res) {
    var airports = '../app/json-response/airpot.json';
    res.send(JSON.parse(fs.readFileSync(airports)));
})

app.get('/flightFareList', function (req, res) {
    var jsondata = '../app/json-response/oneway.json';
    if (req.query.returnwayDate) {
        var jsondata = '../app/json-response/return.json';
    }
    setTimeout(function () {
        res.send(JSON.parse(fs.readFileSync(jsondata)));
    }, 1000);
})

app.get('/test', function (req, res) {
    console.log(req.query);
    res.send('Hello World!')
})