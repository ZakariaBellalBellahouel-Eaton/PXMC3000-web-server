
// Sqlite data access function
const sqlite3 = require('sqlite3').verbose();
const databasePath = "/usr/local/share/pxmc3000/database/SMPConfiguration.db";
const getDeviInformationSqlQuery = "Select * from SmpDevice;";


// Get device information data from Sqlite Database
function getDeviceInformation(callback) {
    const configurationDatabase = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) return callback(err.message)
    });

    configurationDatabase.all(getDeviInformationSqlQuery, [], (err, rows) => {
        callback(err, rows)
    });

    configurationDatabase.close((err) => {
        if (err)
            callback("Error closing the database connection. Details : " + err.message);
    });
}


// Export modules
module.exports = { getDeviceInformation };