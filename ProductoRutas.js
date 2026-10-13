const express = require('express');
const Prutas = require('../controlador/GuardarProductoControlador');
const router = express.Router();

router.post('/productos', Prutas.crearArticulo);
module.exports = router; 