import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';

/**
 * Configuración de la store de Redux con persistencia.
 * - Combina los reducers (actualmente solo `user`).
 * - Aplica redux-persist para guardar el estado en localStorage.
 * - Desactiva el chequeo de serialización del middleware para evitar errores con redux-persist.
 *
 * @constant {object} store - La store de Redux ya configurada y lista para usar.
 * @constant {object} persistor - Persistor para mantener el estado entre recargas.
 */
// Combine all reducers
const reducers = combineReducers({
    user: userReducer, 
})

//Persist configuration
const persistConfig  = {
    key: 'root',
    storage,
}

//Create a persisted reducer
const persistedReducer = persistReducer (persistConfig, reducers)

//Exporta la store y el persistor
export const store = configureStore({
    reducer: persistedReducer,
    //Middleware para evitar el error de serialización
    middleware: (gerDefaultMiddleware) => gerDefaultMiddleware({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store);