const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database')


// OBTERNER TODAS LAS COMPRAS
router.get('/compras', (req, res) => {
  mysqlConnection.query('SELECT * FROM vganado', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// DELETE EN COMPRAS GANADO
router.delete('/:COD_COMPRA_GANADO', (req, res) => {
  const { COD_COMPRA_GANADO } = req.params;
  mysqlConnection.query('CALL DLT_COMPRAG(?)', [COD_COMPRA_GANADO], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'ELIMINADO DE HISTORIAL DE COMPRAS'});
    } else {
      console.log(err);
    }
  });
});

// INSERT A COMPRA GANADO
router.post('/insertarcompraganado', (req, res) => {
    const {FECHA, PERSONA, ARETE, NOMBRE, COLOR, ESTADO, LUGAR,
            PESO, FIERRO, RAZA, SEXO, PRECIO } = req.body;
    console.log(FECHA, PERSONA, ARETE, NOMBRE, COLOR, ESTADO, LUGAR,
        PESO, FIERRO, RAZA, SEXO, PRECIO);
    const query = `
      
      CALL SP_COMPRA_GANADO(?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [FECHA, PERSONA, ARETE, NOMBRE, COLOR, ESTADO, LUGAR,
        PESO, FIERRO, RAZA, SEXO, PRECIO], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'GUARDADO EN COMPRA GANADO'});
      } else {
        console.log(err);
      }
    });
  
  });

  

  
module.exports = router;