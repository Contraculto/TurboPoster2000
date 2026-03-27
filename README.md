# TurboPoster2000

Herramienta para automatizar publicaciones en redes sociales.

Creado por **Contraculto x Etilmercurio**.

## Requisitos

- Node.js ≥ 12
- Una cuenta de desarrollador de Twitter con las credenciales de la API

## Instalación

```bash
npm install
cp .env.example .env
# Edita .env con tus credenciales de Twitter
```

## Configuración

Copia `.env.example` a `.env` y rellena los valores:

| Variable | Descripción |
|---|---|
| `consumer_key` | Twitter API consumer key |
| `consumer_secret` | Twitter API consumer secret |
| `access_token` | Twitter access token |
| `access_token_secret` | Twitter access token secret |
| `PORT` | Puerto del servidor web (por defecto: `2544`) |
| `SSL_CERT_PATH` | Ruta al certificado SSL (opcional) |
| `SSL_KEY_PATH` | Ruta a la clave privada SSL (opcional) |

## Tweets

Los tweets se definen en `twitter/tweets.json`. Cada entrada tiene la siguiente forma:

```json
{
  "texto": "Texto del tweet",
  "url": "https://example.com",
  "imagen": "tweet_001.jpg"
}
```

- `texto` – Cuerpo del tweet.
- `url` – URL que se acortará con is.gd y se añadirá al tweet.
- `imagen` – Nombre del archivo de imagen en la carpeta `imagenes/` (opcional).

Una vez publicado, el campo `publicado` se añade automáticamente para evitar duplicados.

## Uso

```bash
npm start
```

El bot publicará automáticamente en los siguientes horarios:

- **Lunes a sábado** – 9:30 y 17:30
- **Domingo** – 11:00

La interfaz de administración web estará disponible en `http://localhost:2544`.

## Licencia

[GPL-3.0](LICENSE)
