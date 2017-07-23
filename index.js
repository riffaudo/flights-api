var express = require('express');
var app = express();
var bodyParser = require('body-parser');

function filterQantasSydneyFLights(flight) {
  return flight.airline == 'QF' &&
    (flight.departure.airport == 'SYD' || flight.arrival.airport == 'SYD');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(400);
        res.send(JSON.stringify({ error: "error parsing JSON" }));
    } else {
        next();
    }
});

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});


app.post('/flights', (req, res) => {
    var flights = req.body.flights.filter(filterQantasSydneyFLights);
});

app.listen(3000, () => {
    console.log('App started and running on port 3000!');
});

module.exports = app;