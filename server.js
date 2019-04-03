const express = require('express')
const speedTest = require('speedtest-net');
const app = express()
// const port = 3000
const port = process.env.PORT;
const public = app.use(express.static(__dirname + '/public'));

let internetSpeedData;

TestInternetSpeed();

// Runs test on the users internet speed and saves to variable
function TestInternetSpeed() {
    speedTest.visual({ maxTime: 6000 }, (err, data) => {
        internetSpeedData = data;
    });
}

// Runs speedtest every 15. second 
setInterval(function () {
    TestInternetSpeed();
}, 15000);

// Sends internet speed variable to client
app.get('/internet-speed', (req, res) =>
    res.send(internetSpeedData)
);


app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

app.listen(port, () => console.log(`Server started on port ${port}!`));