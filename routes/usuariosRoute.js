/*la ruta es: /api/usuarios */
const { Router }    = require('express');
const { check } = require('express-validator');
const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuariosController');
const {validarCampos} = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

//esta seria la ruta para la consulta
router.get( '/', validarJWT, getUsuarios);


//esta es la ruta para guardar
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),   
        validarCampos,
    ],    
    crearUsuario
);

//esta seria la ruta para editar
router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),   
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],    
    
    actualizarUsuario,
);

router.delete('/:id',
    validarJWT,
    borrarUsuario
);


module.exports = router;