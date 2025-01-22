# Weather API con Redis
Este proyecto es una API que proporciona información meteorológica utilizando datos de Visual Crossing y almacenamiento en caché con Redis.

## Requisitos

- Node.js
- Redis


## Instalación

1. Clona el repositorio:

    ```sh
    git clone 
    cd weatherApi
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

3. Configura las variables de entorno:

    Crea un archivo [.env](http://_vscodecontentref_/0) en la raíz del proyecto y añade tu clave de API de Visual Crossing:

    ```env
    API_KEY=tu_clave_de_api
    ```

4. Configura Redis:

    Asegúrate de tener un servidor Redis en funcionamiento y configura las credenciales para usar en `redisClient.js`:

    ```javascript
        //.env
            REDIS_URL=
            REDIS_PORT=
            REDIS_PASSWORD=
            REDIS_USERNAME=
    ```

## Uso

Para iniciar el servidor, ejecuta:

```sh
npm run dev
```
La API estara disponible en `http://localhost:3000.`

### Endpoints

```sh
GET /weather?city={nombre_de_la_ciudad}
```
- `city`: Nombre de la ciudad para la cual deseas obtener la información meteorológica.

Ejemplo de respuesta:
```json
{
    "city": "New York, NY",
    "info": [
        {
            "date": "2023-10-01",
            "temp": 25,
            "description": "Clear",
            "humidity": 60,
            "wind": 10
        },
        ...
    ]
}
```
## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.
