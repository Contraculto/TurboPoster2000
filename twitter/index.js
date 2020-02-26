"use strict"
//	Publicar en twitter 2 veces al día

//	Requirements
const fsp = require('fs').promises;
const Twit = require('twit');
const axios = require("axios"); 

module.exports = new Promise(async (resolve, reject) => {

    console.log("  Iniciando herramienta TWITTER");

    //  Credenciales Twitter
    var T = new Twit({
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
        access_token: process.env.access_token,
        access_token_secret: process.env.access_token_secret
    });

    //	Publicar un tweet
    var Twitter = {
        "publicarSiguiente": async (tweet) => {

            try {

                //	Cargar tweets
                var tweets = await fsp.readFile("./tweets.json");
                tweets = JSON.parse(tweets);
                console.log("Iniciando proceso...");

                //  Loop principal
                for ( let i in tweets ) {

                    if ( typeof tweets[i].publicado == "undefined" ) {
                        //	Publicar tweet
                        console.log("  Hora de publicar...");
                        try {

                            let url_corta = await axios.get("https://is.gd/create.php?format=simple&url=" + encodeURIComponent(tweets[i].url));
                            //console.dir(url_corta);
                            var tweet_formateado = {
                                "status": tweets[i].texto + " " + url_corta.data
                            };
                    
                            console.dir(tweet_formateado);

                            if ( tweets[i].imagen ) {

                                console.log("  Hay archivo multimedia");
                                let media_id = await this._subirArchivo("imagenes/" + tweets[i].imagen);
                                if ( media_id ) {
                                    tweet_formateado.media_ids = [media_id];
                                }

                            } else {
                                console.log("  El tweet no tiene multimedia");
                                console.log("Publicando tweet: " + tweet_formateado);
                            }

                            var publicado = await this._publicarTweet(tweet_formateado);

                            console.log("Publicación correcta!");
                            tweets[i].publicado = publicado;
                            tweets = JSON.stringify(tweets, null, "    ");
                            await fsp.writeFile("tweets.json", tweets);

                        } catch(e) {
                            console.log("  Error!");
                            if ( e.code == 186 ) {
                                console.log("  El tweet es demasiado largo!");
                            }
                            console.dir(e);
                        }
                        break;
                    }
                }

            } catch(error) {
                console.log("  ERROR PUBLICANDO TWEET");
                console.dir(error);
            }

        },
        "_publicarTweet": async (tweet) => {
            return new Promise((resolve, reject) => {
                console.log("T  Publicando un tweet");
                console.dir(tweet);

                T.post("statuses/update", tweet, function (error, data, response) {
                    if ( error ) {
                        console.log("  Error publicando!");
                        reject(error);
                    } else {
                        console.log("Tweet publicado")
                        resolve(data);
                    }
                });
            });
        },
        "_subirArchivo": async (archivo) => {
            return new Promise((resolve, reject) => {
                console.log("S  Subiendo archivo multimedia");
                console.dir(archivo);

                T.postMediaChunked({ file_path: archivo }, function (err, data, response) {
                    console.log("  SUBIR OK");
                    if ( err ) {
                        reject(err);
                    } else {
                        resolve(data.media_id_string);
                    }
                });
            });
        }
    };

    resolve(Twitter);

});
