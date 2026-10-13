const dbService = require('./bd/Conexion');

class GuardarProductoModelo {
  // funcion para crear nuevos productos
  static async crearProducto(prod, vu, um) {
    const query = 'INSERT INTO productos (producto, valorunitario, unidadMedida) VALUES (?, ?, ?)';

    try {

      return await dbService.query(query, [prod, vu, um ]);
    } catch (err) {
      throw new Error(`Error al crear su nuevo producto: ${err.message}`);
    }
  }//cerrar crear producto
  
}

module.exports = GuardarProductoModelo;