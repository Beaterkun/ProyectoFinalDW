const express = require('express');
const router = express.Router();
//Mensaje de bienvenida al correr el codigo
router.use('/paquetes', require('./paquetes'));
router.get('/', (req, res) => {
	res.send('¡Bienvenido a la Agencia de viajes!');
});

module.exports = router;