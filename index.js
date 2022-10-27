const http = require("http");
const host = 'localhost';
const port = 8000;
const sqliteDataAccess = require("./DataAccess/sqliteDataAccess");

Zak

const requestListener = function (request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, "Content-Type", "application/json");
    console.log("Received request.")
    switch (request.url) {
        case "/":
            response.end(`{ "status" : "success", "message":"the service is running"}`);
        // Handling GET device infotmation request
        case "/DeviceInformation":
            sqliteDataAccess.getDeviceInformation(function (err, data) {
                if (err)
                    response.end(`{ "status" : "error", "message":"${err}"}`);
                response.end(JSON.stringify(data));
            });
            break;
    }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});