## Descripcion
Proyecto GalerIA

Integrantes: Jessica Conejero
             Eugenia Mora
             Ignacio Gomez

## Tecnologias utilizadas:
- React
- Tailwind CSS
- Redux
- JavaScript

## Objetivo
Lograr una Galeria de arte virtual donde se puedan cargar obras de arte y se pueda recorrer por artista, el usuario (a futuro) podra tener sus favoritos y comentar obras, entre otras funcionalidades a agregar.

## Para poder llegar a la ejecucion del proyecto:

1- Solo hay que clonar el proyecto y correr npm i o npm install para instalar las dependencias que
se necesitan para que el mismo funcione

2- Luego de eso se debe configurar el archivo .env con las variables de entorno que son:
# Environment Auth0 variables 
VITE_AUTH0_DOMAIN=dev-ae0l83x707dt6ukm.us.auth0.com 
VITE_AUTH0_CLIENT_ID=OZzVIwhiYTY7yzLzxUSZ8T8zdwAmTnxV 
VITE_AUTH0_NAMESPACE=https://your-app.com

# Environment Firebase variables 
VITE_FIREBASE_API_KEY=AIzaSyCosVgE5H9qGxsBHG15gHfOZL2435lxuv4 
VITE_FIREBASE_AUTH_DOMAIN=galeria-3a8cd.firebaseapp.com 
VITE_FIREBASE_PROJECT_ID=galeria-3a8cd 
VITE_FIREBASE_STORAGE_BUCKET=galeria-3a8cd.firebasestorage.app 
VITE_FIREBASE_MESSAGING_SENDER_ID=814218301208 
VITE_FIREBASE_APP_ID=1:814218301208:web:df6a3b768f4f60430f586d

3- Ahora se debe ejecutar el proyecto: npm run dev

4- Cada archivo esta documentado, con que hace, que recibe y que retorna.
Se trabajo con JSDoc en cada caso

5- Con el comando: npx jsdoc src/ -r -d docs/frontend 
Se genera la documentacion

Se busca el index.html en la carpeta /docs/frontend y se ejecuta con Open with Live Server
Se mostrara la pagina con el detalle de la documentacion

## El link del BRIEF del proyecto es:
https://www.canva.com/design/DAGxy8IuiWU/70GWgWYeMr6Z35FBtxXcnw/edit?utm_content=DAGxy8IuiWU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton