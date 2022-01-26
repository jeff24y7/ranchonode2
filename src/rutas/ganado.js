const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");
//MOSTRAR EL GANADO EN GENERAL
router.get("/ganado_general", (req, res) => {
  mysqlConnection.query("SELECT * FROM ganado_general", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});
//MOSTRAR EL GANADO POR ARETE
router.get("/ganado/:arete", (req, res) => {
  const { arete } = req.params;
  mysqlConnection.query(
    "SELECT * FROM MG_GANADO WHERE NUM_ARETE = ?",
    [arete],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//INSERTAR UN  NUEVO GANADO
router.post("/insertarganado", (req, res) => {
  const {
    NUM_ARETE,
    NOM_GANADO,
    CLR_GANADO,
    COD_ESTADO,
    COD_LUGAR,
    PES_ACTUAL,
    FIE_GANADO,
    RAZ_GANADO,
    SEX_GANADO,
  } = req.body;

  const query = `CALL INS_GANADO(?,?,?,?,?,?,?,?,?);`;
  mysqlConnection.query(
    query,
    [
      NUM_ARETE,
      NOM_GANADO,
      CLR_GANADO,
      COD_ESTADO,
      COD_LUGAR,
      PES_ACTUAL,
      FIE_GANADO,
      RAZ_GANADO,
      SEX_GANADO,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Ganado registrado" });
      } else {
        console.log(err);
      }
    }
  );
});
//ACTUALIZAR GANADO
router.put("/actualizarganado/:COD_REGISTRO_GANADO", (req, res) => {
  const {

    NUM_ARETE,
    NOM_GANADO,
    CLR_GANADO,
    COD_ESTADO,
    COD_LUGAR,
    PES_ACTUAL,
    FIE_GANADO,
    RAZ_GANADO
  } = req.body;
  const {COD_REGISTRO_GANADO} = req.params;

  const query = `CALL UPD_GANADO(?,?,?,?,?,?,?,?,?);`;
  mysqlConnection.query(
    query,
    [
      COD_REGISTRO_GANADO,
      NUM_ARETE,
      NOM_GANADO,
      CLR_GANADO,
      COD_ESTADO,
      COD_LUGAR,
      PES_ACTUAL,
      FIE_GANADO,
      RAZ_GANADO
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Ganado Actualizado" });
      } else {
        console.log(err);
      }
    }
  );
});

router.get('/ganado_general/:COD_REGISTRO_GANADO', (req,res)=>{
  const { COD_REGISTRO_GANADO } = req.params;
  mysqlConnection.query('SELECT * FROM ganado_general WHERE  COD_REGISTRO_GANADO = ?', [COD_REGISTRO_GANADO],(err,rows,fields)=>{
      if(!err){
          res.json(rows);
      }else{
          console.log(err);
      }
  });
});

router.get("/estado", (req, res) => {
  const query = "CALL READ_ESTADO_GANADO()";

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      return;
    }
  });
});

router.get("/lugar", (req, res) => {
  const query = "CALL READ_LUGAR()";

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      return;
    }
  });
});

module.exports = router;
