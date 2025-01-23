
# Blogging Platform API
Esta es una API para una plataforma de blogs.

## Tecnologias
- Express
- Prisma
- PostgreSQL
- Docker

## Requisitos

- Node.js
- Docker

## Instalación

1. Clona el repositorio:

    ```sh
    git clone 
    cd blogging-platform-api
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

3. Configura las variables de entorno:

    Crea un archivo [.env](http://_vscodecontentref_/0) en la raíz del proyecto:

    ```env
    DATABASE_URL=postgresql://postgres:secure_pass_here@localhost:5432/blogging_platform
    ```

4. Instala Docker:

    [Descarga](https://www.docker.com/products/docker-desktop/)


## Uso

Para iniciar el servidor, ejecuta:

```sh
docker-compose up -d 
npx prisma generate
npm run dev
```
La API estara disponible en `http://localhost:3000.`

## Endpoints

### Obtener todos los posts
- **URL:** `/api/posts`
- **Método:** `GET`
- **Respuesta exitosa:** `200 OK`
- **Respuesta de error:** `500 Internal Server Error`

### Crear un nuevo post
- **URL:** `/api/posts`
- **Método:** `POST`
- **Cuerpo de la solicitud:**
    ```json
    {
        "title": "Título del post",
        "content": "Contenido del post",
        "tags": ["tag1", "tag2"]
    }
    ```
- **Respuesta exitosa:** `201 Created`
- **Respuesta de error:** `500 Internal Server Error`

### Actualizar un post
- **URL:** `/api/posts/:id`
- **Método:** `PUT`
- **Cuerpo de la solicitud:**
    ```json
    {
        "title": "Nuevo título del post",
        "content": "Nuevo contenido del post",
        "tags": ["tag1", "tag2"]
    }
    ```
- **Respuesta exitosa:** `200 OK`
- **Respuesta de error:** `500 Internal Server Error`

### Eliminar un post
- **URL:** `/api/posts/:id`
- **Método:** `DELETE`
- **Respuesta exitosa:** `200 OK`
- **Respuesta de error:** `500 Internal Server Error`

### Obtener un post por ID
- **URL:** `/api/posts/:id`
- **Método:** `GET`
- **Respuesta exitosa:** `200 OK`
- **Respuesta de error:** `500 Internal Server Error`

### Obtener posts por etiqueta
- **URL:** `/api/posts/filter?term=<tag>`
- **Método:** `GET`
- **Parámetros de consulta:** [term](http://_vscodecontentref_/10)
- **Respuesta exitosa:** `200 OK`
- **Respuesta de error:** `500 Internal Server Error
## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.

