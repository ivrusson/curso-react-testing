# Pruebas de Aplicaciones React

Este es el proyecto inicial para mi curso de pruebas React donde aprenderás todo lo que necesitas saber para probar efectivamente aplicaciones React.

## Acerca de este Proyecto

Esta es una aplicación React construida con las siguientes tecnologías y bibliotecas:

- Auth0
- Tailwind
- RadixUI
- React Router
- React Query
- Redux Toolkit

Por favor, sigue estas instrucciones cuidadosamente para configurar este proyecto en tu máquina.

## Configurando Auth0 para Autenticación

1. **Regístrate para una Cuenta de Auth0:**

   Si aún no tienes una cuenta de Auth0, puedes registrarte en [https://auth0.com/](https://auth0.com/). Auth0 ofrece un nivel gratuito que puedes usar para tu proyecto.

2. **Crea una Nueva Aplicación:**

   - Inicia sesión en tu cuenta de Auth0.
   - Ve al Panel de Control de Auth0.
   - Haz clic en "Aplicaciones" en la barra lateral izquierda.
   - Haz clic en el botón "Crear Aplicación".
   - Dale un nombre a tu aplicación (por ejemplo, "Mi Aplicación React").
   - Selecciona "Aplicaciones Web de Una Página" como tipo de aplicación.

3. **Configura la Configuración de la Aplicación:**

   - En la página de configuración de la aplicación, configura las siguientes opciones:
     - URLs de Retorno Permitidas: `http://localhost:5173`
     - URLs de Cierre de Sesión Permitidas: `http://localhost:5173`
     - Orígenes Web Permitidos: `http://localhost:5173`
   - Guarda los cambios.

4. **Obtén el Dominio y el ID del Cliente de Auth0:**

   - En la página de configuración de la aplicación, encontrarás tu Dominio de Auth0 e ID de Cliente cerca de la parte superior de la página.
   - Copia el Dominio de Auth0 (por ejemplo, `tu-domino-auth0.auth0.com`) e ID de Cliente (por ejemplo, `tu-id-de-cliente`).

5. **Crea un Archivo `.env.local`:**

   - En el directorio raíz del proyecto, encontrarás un archivo de muestra `.env`. Haz una copia y guárdalo como `.env.local`.
   - Reemplaza el Dominio de Auth0 y el ID de Cliente con los valores reales que obtuviste de Auth0.

## Ejecutando la Aplicación

Ahora que has configurado Auth0 y tus variables de e
