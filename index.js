"use strict"
/*
    Turboposter 2000
    Contraculto x Etilmercurio
*/

//  Requerimientos
require('dotenv').config();

//  Iniciar app
(async function() {

    //  Bienvenida
    console.log("\n  TurboPOSTER 2000");

    //  Iniciar calendario
    await require("./calendario");
    
    //  Iniciar interfaz web
    var web = await require("./interfaz_web");

    //  OK
    console.log("\n  TurboPoster 2000 OK!\n");

})();