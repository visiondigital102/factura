const modelo = require('../modelo/GuardarProductoModelo');

class GuardarProductoControlador {
    // funcion crear nuevo producto
    static async crearArticulo(req, res) {
        const { t1: prod, t2: vu, t3: um} = req.body;
        // ------------👁️‍🗨️ validaciones👁️‍🗨️----------------
        // Validar campos vacíos❓❓❓❓❓----------------
        const errorCampos = GuardarProductoControlador.verCampos(prod, vu, um);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }
        // Validar producto❓❓❓❓❓❓-------------------
        const erorprod = GuardarProductoControlador.verprod(prod);
        if (erorprod) {
            return res.status(400).json({ error: erorprod });
        }
        // Validar valor unitario ❓❓❓❓❓❓❓------------
        const errorvu = GuardarProductoControlador.vervu(vu);
        if (errorvu) {
            return res.status(400).json({ error: errorvu });
        }
        // Validar unidad de medidad❓❓❓❓❓❓❓-----------------------
        const errorum = GuardarProductoControlador.verum(um);
        if (errorum) {
            return res.status(400).json({ error: errorum });
        }
       
        
        try {
            const result = await modelo.crearProducto(prod, vu, um);
            res.status(201).json({ mensaje: 'producto creado', id: result.insertId });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({ error: 'Ya existe un producto con estos datos.' });
              } else {
                return res.status(500).json({ error: 'Error inesperado: ' + err.message });
              }
        }
        // ------------👁️‍🗨️ fin validaciones👁️‍🗨️------------
        
    }//cerrar crearcliente-------------------------------

    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊
    //-------------------validaciones----------------------------
    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊

    static verCampos(prod, vu, um) {
        if (!prod || !vu || !um) {
            return 'Todos los campos son obligatorios.';
        }
        return null; // no encontro campos vacios
    }//cerrar verCampos
    //validar documento
    static verprod(prod) {
          const p = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,60}$/;
        if (!p.test(prod)) {
            return 'El producto debe tener entre 3 y 60 caracteres.';
        } else {
            return null; // Todo bien
        }
    }//cerrar documento
    //verificar  valor unitario
    static vervu(vu) {
if (!/^\d+$/.test(vu)) {
                return 'valor unitario solo debe contener numeros';
        } else {
            return null;
        }
    }
    //verificar unidad de medida
    static verum(um) {
         const u = /^[A-Za-z\s]{1,3}$/;
        if (!u.test(um)) {
            return 'la unidad de medida debe tener entre 1 y 3 caracteres.';
        } else {
            return null; // Todo bien
        }
 
    }
    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊
}//cerrar clase controlador

module.exports = GuardarProductoControlador;