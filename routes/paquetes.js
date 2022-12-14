const express = require('express');
const router = express.Router();

const ControladorPaquetes = require('../controlador/op_paquetes.js');

//Ruta para listar los paquetes
router.get('/', ControladorPaquetes.listaPaquetes);

//Ruta para listar un paquete atraves de un id
router.get('/:id', ControladorPaquetes.listaPorIdPaquete);

//Ruta para crear un paquete
router.post('/', ControladorPaquetes.creaPaquete);

//Ruta para actualizar un paquete
router.put('/:id', ControladorPaquetes.actualizaPaquete);

//Ruta para eliminar un paquete
router.delete('/:id', ControladorPaquetes.eliminaPaquete);

module.exports = router;