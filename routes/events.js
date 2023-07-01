const {Router}=require('express');
const {validarJWT}=require('../midlewares/validar-jwt')
const {getEventos,crearEventos,actualizarEventos,eliminarEventos}=require('../controllers/events');
const {check}=require('express-validator');
const {validarCampos}=require('../midlewares/validar-campos');
const {isDate}=require('../helpers/isDate');
const router=Router();

router.use(validarJWT);

router.get('/',getEventos);

router.post(
    '/',
    [
    check('title','el titulo es requerido').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
],crearEventos);

router.put('/:id',actualizarEventos);

router.delete('/:id',eliminarEventos);

module.exports=router;