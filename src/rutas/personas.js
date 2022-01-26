const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/personas', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MP_PERSONA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/proveedores', (req,res)=>{
    mysqlConnection.query('SELECT * FROM PROVEEDORES', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/login/:NOM_USUARIO/:CLA_ACCESO', (req,res)=>{
    const reqQuery = req.params;
    const usuario = { NOM_USUARIO:reqQuery.NOM_USUARIO}
    const clave = { CLA_ACCESO:reqQuery.CLA_ACCESO}
    mysqlConnection.query('SELECT * FROM USUARIOS_REGISTRADOS WHERE ? AND ?',[usuario,clave], (err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


router.get('/VistaPersona', (req,res)=>{
    mysqlConnection.query('SELECT * FROM PERSONAS', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


router.get('/telefonos', (req,res)=>{
    mysqlConnection.query('select  * FROM mp_telefono', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/roles', (req,res)=>{
    mysqlConnection.query('select  * FROM ROLES', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/usuarios', (req,res)=>{
    mysqlConnection.query('select  * FROM mp_usuario', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/perfil/:COD_PERSONA', (req,res)=>{
    const { COD_PERSONA } = req.params;
    mysqlConnection.query('select  * FROM PERFIL WHERE COD_PERSONA = ?', [COD_PERSONA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/personas/:cod', (req,res)=>{
    const { cod } = req.params;
    mysqlConnection.query('SELECT * FROM MP_PERSONA WHERE COD_PERSONA = ?', [cod],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})
router.get('/mostrar_persona/:COD_PERSONA', (req,res)=>{
    const { COD_PERSONA } = req.params;
    mysqlConnection.query('SELECT * FROM PERSONAS WHERE COD_PERSONA = ?', [COD_PERSONA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})


router.post('/insertarpersona', (req,res)=>{
    const {PRI_NOMBRE,
        SEG_NOMBRE,
        PRI_APELLIDO,
        SEG_APELLIDO,
        ID_PERSONA,
        SEX_PERSONA,
        IND_PERSONA,
        FEC_NACIMIENTO,
        DET_DIRECCION,
        DIR_CORREO,
        COD_ROL,
        NUM_AREA,
        NUM_CELULAR,
        NUM_TELEFONO
    } = req.body;

    const query=`CALL INS_PERSONA(?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [PRI_NOMBRE,
        SEG_NOMBRE,
        PRI_APELLIDO,
        SEG_APELLIDO,
        ID_PERSONA,
        SEX_PERSONA,
        IND_PERSONA,
        FEC_NACIMIENTO,
        DET_DIRECCION,
        DIR_CORREO,
        COD_ROL,
        NUM_AREA,
        NUM_CELULAR,
        NUM_TELEFONO], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Persona registrada'});
            }else{
                console.log(err);
            }
        });
});

router.post('/insertaradmin', (req,res)=>{
    const {PRI_NOMBRE,
        SEG_NOMBRE,
        PRI_APELLIDO,
        SEG_APELLIDO,
        ID_PERSONA,
        SEX_PERSONA,
        IND_PERSONA,
        FEC_NACIMIENTO,
        DET_DIRECCION,
        DIR_CORREO,
        COD_ROL,
        NUM_AREA,
        NUM_CELULAR,
        NUM_TELEFONO,
        NOM_USUARIO,
        CLA_ACCESO,
        IND_USUARIO,
        IMG_USUARIO
    } = req.body;

    const query=`CALL INS_ADMINISTRADOR(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [PRI_NOMBRE,
        SEG_NOMBRE,
        PRI_APELLIDO,
        SEG_APELLIDO,
        ID_PERSONA,
        SEX_PERSONA,
        IND_PERSONA,
        FEC_NACIMIENTO,
        DET_DIRECCION,
        DIR_CORREO,
        COD_ROL,
        NUM_AREA,
        NUM_CELULAR,
        NUM_TELEFONO,
        NOM_USUARIO,
        CLA_ACCESO,
        IND_USUARIO,
        IMG_USUARIO], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Administrador registrado'});
            }else{
                console.log(err);
            }
        });
});

router.put('/actualizarpersona/:COD_PERSONA', (req,res)=>{
    const {
        IND_PERSONA,
        DET_DIRECCION,
        DIR_CORREO,
        IND_PERSONA_ESTADO,
        NUM_AREA,
        NUM_CELULAR,
        NUM_TELEFONO
    } = req.body;
    const {COD_PERSONA} = req.params;
    const query=`CALL UPD_PERSONA(?,?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_PERSONA,
        IND_PERSONA,
        DET_DIRECCION,
        DIR_CORREO,
        IND_PERSONA_ESTADO,
        NUM_AREA,
        NUM_CELULAR,
        NUM_TELEFONO], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Persona actualizada'});
            }else{
                console.log(err);
            }
        });
});

router.delete('/deletepersona/:COD_PERSONA', (req,res)=>{
    const {COD_PERSONA} = req.params;

    const query=`CALL DEL_PERSONA(?);
    `;
    mysqlConnection.query(query, [COD_PERSONA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Persona borrada'});
            }else{
                console.log(err);
            }
        });
        console.log(COD_PERSONA)
});


module.exports = router;