import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { Auth0Provider } from '@auth0/auth0-react'

//Variables de entorno para Auth0
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;


/**
 * Renderiza la aplicación en el contenedor con el ID 'root'
 *
 * Auth0 configurado con:
 * - cacheLocation: 'localstorage' para persistir sesiones entre recargas
 * - useRefreshTokens: true para mantener sesiones activas
 */
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </Provider>
)
