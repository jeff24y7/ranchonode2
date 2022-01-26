const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/todos-compra-medicamentos', (req,res) => {
    mysqlConnection.query('SELECT * FROM comp_medicamento', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    } );
});


router.get('/compra-medicamento/:cod_compra_medicamento', (req, res) => {
    const { cod_compra_medicamento } = req.params;
    mysqlConnection.query('SELECT * FROM pr_compra_medicamento WHERE cod_compra_medicamento = ?', [cod_compra_medicamento], (err,rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
} );


router.post('/agregar-compra-medicamento', (req, res) =>{
    const { 
        COD_MEDICAMENTO,   
        CAN_MEDICAMENTO,  
        PRE_UNITARIO,       
        FEC_VENCIMIENTO, 
        FEC_COMPRA,
        COD_PERSONA
    } = req.body;
    console.log(req.body)
    const query = ` CALL INS_COMPRA_MEDICAMENTO(? , ? , ? , ?, ?, ?);
    `;
    mysqlConnection.query(query, [
        COD_MEDICAMENTO,   
        CAN_MEDICAMENTO,  
        PRE_UNITARIO,       
        FEC_VENCIMIENTO, 
        FEC_COMPRA,
        COD_PERSONA],
        (err,rows,fields) => {
            if(!err){
                res.json({Status: 'Compra Registrada'});
            }else {
                console.log(err);
            }
        });
});

router.put('/actualizar-compra-medicamento/:COD_COMPRA_MEDICAMENTO', (req, res) => {
    const {
        COD_MEDICAMENTO,  
        CAN_MEDICAMENTO,  
        PRE_UNITARIO,
        FEC_VENCIMIENTO,
        FEC_COMPRA,
        COD_PERSONA
    } = req.body;
    const {COD_COMPRA_MEDICAMENTO} = req.params;
    const query = 'CALL UPDATE_COMPRA_MEDICAMENTO(?, ?, ?, ?, ?, ?, ?);';
    mysqlConnection.query(query, [
        COD_COMPRA_MEDICAMENTO,
        COD_MEDICAMENTO,  
        CAN_MEDICAMENTO,  
        PRE_UNITARIO,
        FEC_VENCIMIENTO,
        FEC_COMPRA,
        COD_PERSONA],
    (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Registro de compra actualizado'});
        }else {
            console.log(err);
        }
    });
});

module.exports = router;