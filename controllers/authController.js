const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarioModel');
const { generarJWT } = require('../helpers/jwt');


const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        //verifica el mail
        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
            
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }
        
        // Generar token JWT
            const token = await generarJWT( usuarioDB.id );
        //
        console.log(req.body);
        res.json({
            ok:true,
            // msg: "todo esta bien"
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable conmigo jajaja'
        })
    }
}

module.exports = {
    login
}