const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//cors
app.use( cors() );

//bd
dbConnection();

// Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });

});






app.listen(3000, () => {
    console.log('Servidor corriendo en puerto ' + 3000)
});