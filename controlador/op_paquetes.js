const mongodb = require('../bd/conexion.js');
const ObjectId = require('mongodb').ObjectId;

//Función que listará todos los Paquetes existentes en la BD y los retornará en un JSON
const listaPaquetes = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('Paquetes').find();
    console.log('Trayendo Paquetes');
    console.log(result);
    result.toArray().then((paquetes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(paquetes);
    });
};
//Función que listará el Paquete existente en la BD y lo retornará en un JSON (a traves del id)
const listaPorIdPaquete = async (req, res, next) => {
    const prodId = parseInt(req.params.id);
    console.log('ID',prodId);
    const result = await mongodb.getDb().db().collection('Paquetes').find({ id: prodId });
    console.log('Trayendo Paquete');

    result.toArray().then((paquetes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(paquetes[0]);
    });
};
//Función que creara un Paquete en la BD y lo retornará en un JSON
const creaPaquete = async (req, res, next) => {
    const datosPaquete = {
        id:req.body.id,
        paquete:req.body.paquete,
        transporte:req.body.transporte,
        precio:req.body.precio
     };

    const response = await mongodb.getDb().db().collection('Paquetes').insertOne(datosPaquete);

    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Error al crear el Nuevo Paquete.');
    }
};
//Función que actualizara un Paquete existente en la BD y lo retornará en un JSON
const actualizaPaquete = async (req, res, next) => {
    const prodId = parseInt(req.params.id);

    const datosPaquete = {
        id:req.body.id,
        paquete:req.body.paquete,
        transporte:req.body.transporte,
        precio:req.body.precio
    };

    const response = await mongodb.getDb().db().collection('Paquetes').replaceOne({ id: prodId }, datosPaquete);
    
    if (response.modifiedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Error al Actualizar el Paquete');
    }
};
//Función que eliminara un Paquete existente en la BD y lo retornará en un JSON
const eliminaPaquete = async (req, res, next) => {
    const prodId = parseInt(req.params.id);

    const response = await mongodb.getDb().db().collection('Paquetes').remove({ id: prodId }, true);

    if (response.deletedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Error al Eliminar Paquete');
    }
};
//Rutas de los paquetes
module.exports = { listaPaquetes, listaPorIdPaquete, creaPaquete, actualizaPaquete, eliminaPaquete };