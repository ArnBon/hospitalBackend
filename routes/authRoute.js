/*  Path: '/api/login'*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authController');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post( '/',
    [
        check('email, El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,   
    ],
     login
)
module.exports = router;