## Description
FrontEnd del proyecto GalerIA

Integrantes: Jessica Conejero
            Eugenia Mora
            Ignacio Gomez

## Para poder llegar a la ejecucion del proyecto:

1- Solo hay que clonar el proyecto y correr npm i o npm install para instalar las dependencias que
se necesitan para que el mismo funcione

2- Luego de eso se debe configurar el archivo .env con las variables de entorno que son:
API_URL=http://localhost:3000/api/v1
VITE_API_URL=http://localhost:3000/api/v1
VITE_AUTH0_DOMAIN=dev-ae0l83x707dt6ukm.us.auth0.com
VITE_AUTH0_CLIENT_ID=OZzVIwhiYTY7yzLzxUSZ8T8zdwAmTnxV

3- Ahora se debe ejecutar el proyecto: npm run dev

4- Cada archivo esta documentado, con que hace, que recibe y que retorna.
Se trabajo con JSDoc en cada caso

5- Con el comando: npx jsdoc src/ -r -d docs/frontend 
Se genera la documentacion

Se busca el index.html en la carpeta /docs/frontend y se ejecuta con Open with Live Server
Se mostrara la pagina con el detalle de la documentacion
