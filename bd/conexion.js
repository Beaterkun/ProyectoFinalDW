//Codigo que servira para la conexion con la base de datos Mongo
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
dotenv.config();

let _db;
//Muestra si la base de datos esta lista para usarse
const initDb = (callback) => {
    if (_db) {
        console.log('bd  está lista!');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};
  
//Muestra si la base de datos no esta lista
const getDb = () => {
    if (!_db) {
        throw Error('Bd no inicializada');
    }
    return _db;
};
  
module.exports = { initDb, getDb };