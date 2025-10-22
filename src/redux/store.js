import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

/**
 * Configuración de la store de Redux con persistencia encriptada.
 *
 * SEGURIDAD:
 * - Combina los reducers (actualmente solo `user`).
 * - Aplica redux-persist para guardar el estado en localStorage.
 * - ENCRIPTA los datos sensibles usando AES-256.
 * - Solo persiste datos necesarios (whitelist).
 * - Desactiva el chequeo de serialización del middleware para evitar errores con redux-persist.
 *
 * @constant {object} store - La store de Redux ya configurada y lista para usar.
 * @constant {object} persistor - Persistor para mantener el estado entre recargas.
 */

// Configuración de encriptación
const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY || 'fallback-secret-key-only-for-development',
  onError: function (error) {
    // Manejo de errores de encriptación/desencriptación
    console.error('Error en encriptación de Redux Persist:', error);
  },
});

// Combine all reducers
const reducers = combineReducers({
    user: userReducer,
})

// Persist configuration con encriptación
const persistConfig = {
    key: 'root',
    storage,
    // Encriptar todo el contenido persistido
    transforms: [encryptor],
    // Whitelist: solo persistir el estado del usuario (no todo)
    whitelist: ['user'],
}

//Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers)

//Exporta la store y el persistor
export const store = configureStore({
    reducer: persistedReducer,
    // Middleware para evitar el error de serialización con redux-persist
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // Ignorar estas acciones de redux-persist
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
    })
});

export const persistor = persistStore(store);