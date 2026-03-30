# API de Ejemplo en Node.js

Esta es una API simple construida con Node.js y Express, diseñada para realizar pruebas con flujos de trabajo de GitHub Actions. El proyecto incluye endpoints de ejemplo y pruebas.

## Características

- Servidor Express con endpoints de ejemplo
- CORS habilitado
- Soporte para variables de entorno
- Configuración de pruebas con Jest
- Endpoints de ejemplo para usuarios y verificación de estado
- Sistema de construcción para producción

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Copiar `.env.example` a `.env` y ajustar los valores si es necesario:
```bash
cp .env.example .env
```

## Scripts Disponibles

- `npm start`: Inicia el servidor en modo producción
- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática
- `npm test`: Ejecuta las pruebas
- `npm run test:watch`: Ejecuta las pruebas en modo observador
- `npm run build`: Construye la aplicación para producción
- `npm run start:prod`: Inicia la aplicación en modo producción desde el directorio dist

### Proceso de Build

El proceso de construcción realiza las siguientes tareas:
1. Limpia el directorio `dist`
2. Copia todos los archivos necesarios a `dist`
3. Prepara la aplicación para producción

Para construir y ejecutar en producción:
```bash
npm run build
npm run start:prod
```

## Endpoints de la API

- `GET /`: Mensaje de bienvenida
- `GET /api/users`: Obtener lista de usuarios
- `POST /api/users`: Crear un nuevo usuario
- `GET /api/health`: Endpoint de verificación de estado

## Pruebas

El proyecto incluye un conjunto de pruebas utilizando Jest y Supertest. Ejecuta las pruebas con:

```bash
npm test
```

## GitHub Actions

Este proyecto está diseñado para ser utilizado con GitHub Actions. Puedes configurar flujos de trabajo para:

- Ejecutar pruebas en push/pull request
- Verificar el formato del código
- Desplegar a diferentes entornos

## Licencia

ISC 


ACR_LOGIN_SERVER=fakeacr.azurecr.io
ACR_USERNAME=fakeacruser
ACR_PASSWORD=fakeacrpassword123
