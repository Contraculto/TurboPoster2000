"use strict"

/*
    TurboPoster 2000
    Calendario
    Ejecuta acciones cada cierto tiempo

    Futuro: eventos especiales con fecha/hora
*/

const cron = require('node-cron');
var twitter = require("../twitter");

module.exports = new Promise((resolve, reject) => {

    //	CRON: Días de semana a las 9:30 y 17:30
    cron.schedule('30 9,17 * * 1,2,3,4,5,6', () => {
        twitter.publicarSiguiente();
    });

    //	CRON: Sábado y domingo a las 11:00
    cron.schedule('0 11 * * 7,0', () => {
        twitter.publicarSiguiente();
    });

    resolve("OK");

});