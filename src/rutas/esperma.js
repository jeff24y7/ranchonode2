const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
//MOSTRAR EL ESPERMA COMPRADO
router.get('/esperma', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MC_ESPERMA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
//MOSTRAR ESPERMA  POR NÚMERO DE PAJILLA
router.get('/esperma/:numpajilla', (req,res)=>{
    const { numpajilla } = req.params;
    mysqlConnection.query('SELECT * FROM MG_EMBRION WHERE NUM_PAJILLA = ?', [numpajilla],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//INSERTAR UNA NUEVA COMPRA DE ESPERMA
router.post('/insertarcompraesperma', (req,res)=>{
    const {COD_PERSONA,FEC_COMPRA,NUM_PAJILLA,PRE_ESPERMA,OBS_COMPRA_ESPERMA,
        RAZ_TORO_DONADOR,NOM_TORO_DONADOR,FEC_REGISTRO} = req.body;
    const query=`CALL INS_COMPRA_ESPERMA(?,?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_PERSONA,FEC_COMPRA,NUM_PAJILLA,PRE_ESPERMA,OBS_COMPRA_ESPERMA,
        RAZ_TORO_DONADOR,NOM_TORO_DONADOR,FEC_REGISTRO], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Compra registrada'});
            }else{
                console.log(err);
            }
        });
});

//MOSTRAR LAS COMPRAS REALIZADAS
router.get('/comprasesperma', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MC_COMPRA_ESPERMA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//INSERTAR EL DETALLE DE UNA NUEVA COMPRA DE ESPERMA
router.post('/detalle-compra-esperma', (req,res)=>{
    const {NUM_PAJILLA,
        PRE_ESPERMA,
        OBS_COMPRA_EMBRION,
        RAZ_TORO_DONADOR,
        NOM_TORO_DONADOR
    } = req.body;
    const query=`CALL INS_DETCOMPRA_ESPERMA(?,?,?,?,?);
    `;
    mysqlConnection.query(query, [NUM_PAJILLA,
        PRE_ESPERMA,
        OBS_COMPRA_EMBRION,
        RAZ_TORO_DONADOR,
        NOM_TORO_DONADOR], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Compra de esperma registrada'});
            }else{
                console.log(err);
            }
        });
});
//ACTUALIZAR EL DETALLE DE UNA COMPRA DE ESPERMA
router.put('/actualizarcompraembrion', (req,res)=>{
    const {COD_ESPERMA,
        NUM_PAJILLA,
        OBS_COM_EMBRION,
        RAZ_VACA_DONADORA,
        RAZ_TORO_DONADOR,
        PRE_EMBRION,
        IND_ESPERMA
       } = req.body;
    const query=`CALL UPD_COMPRAESPERMA(?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_ESPERMA,
        NUM_PAJILLA,
        OBS_COM_EMBRION,
        RAZ_VACA_DONADORA,
        RAZ_TORO_DONADOR,
        PRE_EMBRION,
        IND_ESPERMA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Compra Actualizada'});
            }else{
                console.log(err);
            }
        });
});



module.exports = router;