# PDIGS

## Configuración del entorno de desarrollo

Mi recomendación es utilizar Ubuntu mediante WSL, que permite instalar todo bastante más fácil.

### Requisitos

<details>
<summary> Ver requisitos </summary>

#### Instalar PHP

Vale cualquier versión de PHP 8.2 en adelante. Creo que la forma más fácil en Windows es instalando
XAMPP. En Ubuntu se puede instalar con el siguiente comando:

`sudo apt install php`

Para comprobar que se ha instalado correctamente, se puede ejecutar el siguiente comando:

`php --version`

#### Instalar Composer

Para verificar que Composer está instalado, se puede ejecutar el siguiente comando:

`composer --version`

#### Instalar Laravel

Una vez instalado Composer, se puede instalar Laravel con el siguiente comando:

`composer global require laravel/installer`

Para comprobar que se ha instalado correctamente, se puede ejecutar el siguiente comando:

`laravel --version`

#### Instalar Node

En Windows, solo hay que ir a la web e instalar la versión LTS. En Ubuntu se puede instalar con el siguiente comando:

`sudo apt install nodejs`

Para comprobar que se ha instalado correctamente, se puede ejecutar el siguiente comando:

`node --version`

#### Instalar Yarn

Una vez instalado Node, se puede instalar Yarn con el siguiente comando:

`corepack enable`

De nuevo, se puede verficar ejecutando

`yarn --version`

</details>


### Pasos para ejecutar el proyecto

<details>
<summary>Ver pasos para ejecutar el proyecto</summary>

#### Backend

1. Instalar las dependencias de todo el proyecto:

   ```
   composer install
   cd front-end 
   yarn install
   cd ..
   php nativewind-fix.php
   ```
   (Es importante ejecutar `php nativewind-fix.php` cada vez que se instalen las dependencias del front-end)

2. Crear un nuevo fichero en el directorio raíz, llamado `.env` y copiar en él todo el contenido del archivo `.env.example`

3. Crear la base de datos y todas sus tablas:

   `php artisan migrate`

4. Popular la base de datos con datos de prueba:

   `php artisan db:seed`

5. Ejecutar el servidor de Laravel:

   `php artisan serve`

#### Frontend

1. Acceder al directorio del proyecto frontend:

   `cd front-end`

2. Crear un nuevo fichero dentro del directorio `front-end`, llamado `.env` y copiar en él todo el contenido del archivo `front-end/.env.example`

3. Buscar la variable de entorno `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` en el archivo `front-end/.env` y darle como valor la clave de la API de Google Maps, que se encuentra en el fichero `front-end/app.json`

4. Generar el código fuente nativo (durante el desarrollo, no importa si hay errores al ejecutar este comando):

   `yarn build`

5. Ejecutar el frontend en el navegador:

   `yarn web`

</details>

## Principales herramientas a utilizar

<details>
    <summary>Ver herramientas</summary>

### Editor
Mi recomendación es [PhpStorm](https://www.jetbrains.com/phpstorm/), con el plugin [Laravel Idea](https://plugins.jetbrains.com/plugin/13441-laravel-idea). Tanto
PhpStorm como Laravel Idea tienen licencia gratuita para estudiantes.

Visual Studio Code también está bien.

### Base de datos
SQLite, al menos al principio.

### Backend
- [PHP](https://www.php.net/manual/es/intro-whatis.php) - lenguaje de programación del backend
- [Composer](https://getcomposer.org/) - gestor de dependencias de PHP
- [Laravel](https://laravel.com/docs/11.x/structure) - framework backend de PHP

### Frontend
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) - lenguaje utilizado en el fronted
- [Node](https://nodejs.org/en/download) - entorno de ejecución de JavaScript
- [Yarn](https://yarnpkg.com/getting-started/install) - gestor de dependencias de JavaScript
- [Expo](https://docs.expo.dev/guides/overview/) - framework frontend de React Native
- [React Native](https://reactnative.dev/docs/getting-started) - librería para desarrollo de aplicaciones multiplataforma (web, iOS y Android), basada en [React](https://react.dev/learn)
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - librería para realizar consultas a la API
- [Axios](https://axios-http.com/docs/example) - librería para realizar consultas a la API

</details>

