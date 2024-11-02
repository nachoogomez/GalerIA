import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import userReducer from "./user/userSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
    products: productsReducer,
    user: userReducer, 
})


const persistConfig  = {
    key: 'root',
    storage,
    whitelist: ['user'],
}

const persistedReducer = persistReducer (persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (gerDefaultMiddleware) => gerDefaultMiddleware({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store);