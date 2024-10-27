
const mongoose = require('mongoose');
var log4js = require("log4js");


module.exports.createDBConnection = async () => {
    // configure logs
    log4js.configure({
        appenders: { dbConnection: { type: "file", filename: "db_connection.log" } },
        categories: { default: { appenders: ["dbConnection"], level: "error" } },
    });
    let logger = log4js.getLogger("Database Connection");

    // Connect to database
    mongoose
        .connect(`mongodb:${process.env.DATABASE}`, {
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Connected to mongodb.');
        })
        .catch((error) => {
            logger.error("Database Connection Error: ", error);
            console.log("Database Connection Error: ",error);
        });
    mongoose.set('debug', JSON.parse(process.env.DATABASE_DEBUG));
    const conn = mongoose.connection;

    conn.on('error', (error) => logger.error("Database Connection Error: " + error));

    conn.once('open', () => console.info('Connection to Database is successful'));

    conn.once('disconnected', () => logger.error('Disconnected from database'));

    module.exports.conn = conn;
}


