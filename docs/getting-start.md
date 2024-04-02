# Getting Start! Curso testing React

[URL HackMD](https://hackmd.io/CZlLnOvyT4yZGISI9DkCPA)

## **Paso 1:** Descargar el repositorio
[[Url del Repositorio](https://github.com/ivrusson/curso-react-testing)](https://github.com/ivrusson/curso-react-testing)

`git clone https://github.com/ivrusson/curso-react-testing`


## **Paso 2:** Registrarse en Auth0:
[https://auth0.com/](https://auth0.com/)

- Inicia sesión en tu cuenta de Auth0.
   - Ve al Panel de Control de Auth0.
   - Haz clic en "Aplicaciones" en la barra lateral izquierda.
   - Haz clic en el botón "Crear Aplicación".
   - Dale un nombre a tu aplicación (por ejemplo, "Mi Aplicación React").
   - Selecciona "Aplicaciones Web de Una Página" como tipo de aplicación.
 - En la página de configuración de la aplicación, configura las siguientes opciones:
     - URLs de Retorno Permitidas: `http://localhost:5173`
     - URLs de Cierre de Sesión Permitidas: `http://localhost:5173`
     - Orígenes Web Permitidos: `http://localhost:5173`
   - Guarda los cambios.

![image](https://hackmd.io/_uploads/rkS2DiF1R.png)


## **Paso 3:** Variables de entorno

- Crea una copia del archivo `.env` y renombrala a `.env.local`
 - En la página de configuración de la aplicación de Auth0, encontrarás tu Dominio e ID de Cliente cerca de la parte superior de la página.
   - Copia el Dominio (por ejemplo, `tu-domino-auth0.auth0.com`) e ID de Cliente (por ejemplo, `tu-id-de-cliente`) y sustituye tus variables de entorno.


## **Paso 4:** Instalar dependencias para usar con Vitest

- Instalar el paquete de vitest: `npm i -D vitest` 
- Añadir comandos para arrancar los test

```json
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "server": "json-server --watch src/data/db.json --delay 500",
    "start": "concurrently \"npm run server\" \"npm run dev\"",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
```

- Instalar [react testing library](https://testing-library.com/docs/react-testing-library/intro) `npm install -D @testing-library/react`

- Instalar [JSDOM](https://github.com/jsdom/jsdom) `npm i -D jsdom`
- Instalar [testing library jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) `npm install -D @testing-library/jest-dom`

## **Paso 5:** Configurar Vitest

- Añadir archivo `vitest.config.ts` en la raiz
- Añadir el siguiente contenido para permitirle utilizar jsdom

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom'
  }
})
```

## **Paso 6:** Mejorar el Setup de Vitest

- Crear archivo de setup

```ts
// ./test/setup.ts
import "@testing-library/jest-dom/vitest"; //importar por dedecto
```

- Modificar archivo de configuración de vitest

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true, // Añadir los imports de vitest como globales
    setupFiles: 'tests/setup.ts', // configurar el archivo de setup
  }
});
```

- Modificar el `tsconfig.json` para soportar el tipos de vitest

```json
// tsconfig.json
{
  "compilerOptions": {
    ...
    "types": ["vitest/globals"],
    ...
  },
  ...
}
```

> IMPORTANTE: Cada vez que se modifique el setup o la configuración, se debe reiniciar el proceso de `test` o `test:ui` para que reconozca los cambios.


## **Paso 6:** Crear el primer test

- Crea un archivo en la carpeta `/test/` y llámalo `main.test.ts`.
- Añade el siguiente contenido

```ts
// main.test.ts
import { it, expect, describe } from 'vitest'; //Esta línea se puede borrar para comprobar que la configuración funciona

describe('main', () => {
  it('should', () => {
    expect(1).toBeTruthy();
  });
});
```

- Arranca tu test suite: `npm run test:ui`
- Navega a [http://localhost:51204/](http://localhost:51204/)


> DÍA UNO COMPLETADO



