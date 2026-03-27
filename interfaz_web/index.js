"use strict"
/*
    ????
    Etilmercurio x Contraculto
    Interfaz web
*/

//      Requerimientos
const fs = require('fs');
const fsp = require('fs').promises;

const restify = require("restify");
const cookieParser = require('restify-cookies');

//	Función con promesa
module.exports = new Promise((resolve, reject) => {

    console.log("  Iniciando servidor web");

    //  Servidor Restify
    //  Con posibilidad de usar HTTPS
	if ( process.env.SSL_CERT_PATH && process.env.SSL_KEY_PATH ) {
		console.log("  > Usando certificado SSL");
		const key = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
		const cert = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");
		var servidor = restify.createServer({
			key: key,
			certificate: cert
		});
	} else {
		var servidor = restify.createServer();
	}

	//	Cookies y parámetros de formularios
	servidor.use(cookieParser.parse); // Cookies
	servidor.use(restify.plugins.bodyParser({mapParams: true})); // Formularios POST
	servidor.use(restify.plugins.queryParser()); // Datos GET

	//	Servidor a escuchar en el puerto definido y ruta base para /
	let puerto = process.env.PORT || 2544;
	servidor.listen(puerto, () => {

		console.log("  > Servidor web escuchando en puerto " + puerto);

		// Ruta base, admin
        servidor.get("/", async (req, res, next) => {

			console.log("\n  Cargando página principal de admin web\n  " + req.userAgent());

			var html = await fsp.readFile(__dirname + "/index.htm", "utf-8");
			var css = await fsp.readFile(__dirname + "/style.css", "utf-8");
			var js = await fsp.readFile(__dirname + "/script.js", "utf-8");
			var body = html

			//	Combinamos los 3 archivos e insertamos algunas variables
			.replace("<!-- WEBSITE JAVASCRIPT -->", "<script>" + js + "</script>")
			.replace("<!-- WEBSITE CSS -->", "<style type=\"text/css\">" + css + "</style>");

			res.writeHead(200, {
				'Content-Length': Buffer.byteLength(body),
				'Content-Type': 'text/html'
			});
			res.write(body);
			res.end();

		})

        // Contenido estático
		servidor.get("/static/.*", restify.plugins.serveStatic({
			directory: "./static",
			appendRequestPath: false
		}));

		resolve(servidor);

    });

});