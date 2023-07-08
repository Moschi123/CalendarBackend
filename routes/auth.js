const { Router } = require('express');
const {validarJWT}=require('../midlewares/validar-jwt')
const{crearUsuario,LoginUsuario,revalidarToken}=require('../controllers/auth')
const {check}=require('express-validator')
const {validarCampos}=require('../midlewares/validar-campos.js')

const router = Router();



router.post('/new',
[ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
    validarCampos
],
 crearUsuario);



router.post('/login',
[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),validarCampos
],
LoginUsuario);


router.get('/renew',validarJWT,revalidarToken)

module.exports=router;