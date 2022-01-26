const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

// VISTA DE DETALLE VENTAS 
router.get('/detalle_de_ventas', (req, res) => {
  mysqlConnection.query('select * from detalle_de_ventas', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// VISTA DE COG GANADO
router.get('/ganado_ventas', (req, res) => {
  mysqlConnection.query('select * from ganado', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


// VISTA DEL NOMBRE CLIENTE
router.get('/clientes', (req, res) => {
  mysqlConnection.query('select * from clientes', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An PRODUCCION
router.get("detalle_de_ventas/:COD_DETALLE", (req, res) => {
  const { COD_DETALLE } = req.params;
  mysqlConnection.query("SELECT * FROM MV_DETALLE_VENTA WHERE COD_DETALLE = ?",
    [COD_DETALLE],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});


// INSERT DETALLE VENTAS
router.post('/insertardetalleventa', (req, res) => {
  const {
    COD_PERSONA,
    FEC_VENTA,
    COD_REGISTRO_GANADO,
    PRE_VENTA
  } = req.body;
  console.log(req.body)
  const query = `call INS_DETALLE_VENTAS(?,?,?,?);
  `;
  mysqlConnection.query(query,
    [COD_PERSONA, FEC_VENTA,COD_REGISTRO_GANADO, PRE_VENTA],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Registrado' });
      } else {
        console.log(err);
      }
    });
});






// DELETE EN PRODUCCION DE LECHE 
router.delete('/EliminarVenta/:COD_DETALLE', (req, res) => {
  const { COD_DETALLE } = req.params;

  const query = ` CALL DLT_DETALLE_VENTA(?);
    `;
  mysqlConnection.query(query, [COD_DETALLE], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'borrada' });
    } else {
      console.log(err);
    }
  });
  console.log(COD_DETALLE)

});

module.exports = router;