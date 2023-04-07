const router = require('express').Router()

const conexion = require('./config/conexion')

const jwt = require('jsonwebtoken');
//get usuarios 

router.get('/',(req, res)=>{
    let sql = 'select* from usuarios'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


// get usuario por id

router.get('/:id',(req, res)=>{
    const {id} = req.params
    let sql = 'select * from usuarios where idusuarios= ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//agregar usuario

router.post('/',(req, res)=>{
    const {nombre, email, contrasena, tipo} = req.body
    let sql = `insert into usuarios(nombre, email, contrasena, tipo) values('${nombre}','${email}','${contrasena}','${tipo}')`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Usuario creado'})
        }
    })

})
//logear usuario
router.post('/login',(req, res)=>{
    const {email, contrasena} = req.body
    //let sql = 'select * from usuarios,idusuarios where email= ? and contrasena= ?'
    //conexion.query(sql,[email,contrasena],(err, rows, fields)=>{
    conexion.query('select * from usuarios where email= ? and contrasena= ?',
    [email, contrasena],
    (err,rows,fields)=>{

        if(!err) {
            if(rows.length >0){
                let data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'stil');
                res.json({token});
            }else{
               res.json(0); 
            }
            console.log(rows);   
        }else{
            res.json(err);
        }
    }
    )

})

router.post('/test',verifyToken, (req,res) => {
        res.json('informacion secreta');
})

function verifyToken(req, res, next){
    if(!req.headers.authorizaton) return res.status(401).json('No autorizado');

    const token = req.headers.authorizaton.substr(7);
    if(token!==''){
        const content = jwt.verify(token,'stil');
        req.data = content;
        next();
    }else{
        res.status(401).json('token vacio');
    }
    
}
//eliminar usuario
router.delete('/:id',(req, res)=>{
    const{id}=req.params

    let sql = `delete from usuarios where idusuarios='${id}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Usuario eliminado'})
        }
    })
});

//modificar usuario

router.put('/:id',(req, res)=>{
    const {id} = req.params
    const {nombre,email,contrasena,tipo}= req.body

    let sql = `update usuarios set
    nombre='${nombre}',
    email='${email}',
    contrasena='${contrasena}',
    tipo='${tipo}'
    where idusuarios= '${id}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Usuario modificado'})
        }
    })

})



module.exports = router;


