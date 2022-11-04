const express = require("express");
const path = require('path');
const sqliteDataAccess = require("./DataAccess/sqliteDataAccess");

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8000;

const app = express();

app.use(express.static(path.join(__dirname, '../../PXMC3000-web-client/build')));

app.get('/api/v1', (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, "Content-Type", "application/json");
    console.log("Received request : ", request.originalUrl, " - method : ", request.route.methods);
    response.end(`{ "status" : "success", "message":"the API v1 service is running"}`);
}
)

// Handling GET device infotmation request
app.get('/api/v1/DeviceInformation', (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, "Content-Type", "application/json");
    console.log("Received request : ", request.route);
    sqliteDataAccess.getDeviceInformation(function (err, data) {
        if (err)
            response.end(`{ "status" : "error", "message":"${err}"}`);
        response.end(JSON.stringify(data));
    });
}
)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../PXMC3000-web-client/build', 'index.html'));
});

app.listen(port, function () {
    console.log(`Server is running on http://${host}:${port}`);
});
