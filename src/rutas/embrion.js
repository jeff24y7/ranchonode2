const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOSTRAR EMBRIÓN POR CÓDIGO
router.get('/embrion/:codigo', (req,res)=>{
    const { codigo } = req.params;
    mysqlConnection.query('SELECT * FROM MG_EMBRION WHERE COD_EMBRION = ?', [codigo],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//INSERTAR UNA NUEVA COMPRA DE EMBRION
router.post('/insertarcompraembrion', (req,res)=>{
    const {COD_PERSONA,FEC_COMPRA,RAZ_ESPERADA,
  NOM_VACA_DONADORA, 
  RAZ_VACA_DONADORA ,   
  RAZ_TORO_DONADOR  ,       
  NOM_TORO_DONADOR ,       
  PRE_EMBRION ,          
  OBS_COMPRA_EMBRION,
  FEC_REGISTRO} = req.body;
    const query=`CALL INS_COMPRA_EMBRION(?,?,?,?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_PERSONA,FEC_COMPRA,RAZ_ESPERADA,
  NOM_VACA_DONADORA, 
  RAZ_VACA_DONADORA ,   
  RAZ_TORO_DONADOR  ,       
  NOM_TORO_DONADOR ,       
  PRE_EMBRION ,          
  OBS_COMPRA_EMBRION,
  FEC_REGISTRO], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Compra registrada'});
            }else{
                console.log(err);
            }
        });
});

//MOSTRAR LAS COMPRAS REALIZADAS
router.get('/comprasembriones', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MC_COMPRA_EMBRION', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//INSERTAR EL DETALLE DE UNA NUEVA COMPRA DE EMBRIÓN
router.post('/compraembrion', (req,res)=>{
    const {RAZ_ESPERADA,
        NOM_VACA_DONADORA,
        RAZ_VACA_DONADORA,
        NOM_TORO_DONADOR,
        RAZ_TORO_DONADOR,
        PRE_EMBRION,
        OBS_COMPRA_EMBRION} = req.body;
    const query=`CALL INS_DETCOMPRA_EMBRION(?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [RAZ_ESPERADA,
        NOM_VACA_DONADORA,
        RAZ_VACA_DONADORA,
        NOM_TORO_DONADOR,
        RAZ_TORO_DONADOR,
        PRE_EMBRION,
        OBS_COMPRA_EMBRION], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Compra registrada'});
            }else{
                console.log(err);
            }
        });
});
//ACTUALIZAR EL DETALLE DE UNA COMPRA DE EMBRIÓN
router.put('/actualizarcompraembrion', (req,res)=>{
    const {COD_EMBRION,
        OBS_COM_EMBRION,
        RAZ_VACA_DONADORA,
        RAZ_TORO_DONADOR,
        PRE_EMBRION
       } = req.body;
    const query=`CALL UPD_EMBRION(?,?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_EMBRION,
        OBS_COM_EMBRION,
        RAZ_VACA_DONADORA,
        RAZ_TORO_DONADOR,
        PRE_EMBRION], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Compra Actualizada'});
            }else{
                console.log(err);
            }
        });
});

//REGISTRAR UNA NUEVA TRANSFERENCIA DE EMBRIÓN
router.post('/registrar-transferencia-embrion', (req,res)=>{
    const {COD_EMBRION,
        COD_REGISTRO_GANADO,
        IND_FECUNDACION
       } = req.body;
    const query=`CALL INS_TRANS_EMBRION(?,?,?);
    `;
    mysqlConnection.query(query, [COD_EMBRION,
        COD_REGISTRO_GANADO,
        IND_FECUNDACION], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Transferencia registrada'});
            }else{
                console.log(err);
            }
        });
});

//VER TODAS LAS TRANSFERENCIAS DE EMBRIONES REALIZADAS
//MOSTRAR LAS COMPRAS REALIZADAS
router.get('/transferencias-de-embriones', (req,res)=>{
    mysqlConnection.query('SELECT * FROM TRANS_EMBRION', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//ACTUALIZAR UNA TRANSFERENCIA DE EMBRIONES
router.put('/actualizar-transferencia-embrion', (req,res)=>{
    const {V_COD_TRANS_EMBRION,
        V_IND_TRANS_EMBRION
       } = req.body;
    const query=`CALL UPD_TRANS_EMBRION(?,?);
    `;
    mysqlConnection.query(query, [V_COD_TRANS_EMBRION,
        V_IND_TRANS_EMBRION], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Transferencia actualizada'});
            }else{
                console.log(err);
            }
        });
});

//MOSTRAR LOS EMBRIONES COMPRADOS
router.get('/embrion', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MG_EMBRION', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});



module.exports = router;