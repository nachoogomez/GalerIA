import { createSlice } from "@reduxjs/toolkit";
import  { Products, TotalProducts } from '../../data/Products';
/**
 * Slice de Redux para manejar el estado global de productos
 *
 * Utiliza Redux Toolkit para simplificar la creación de reducers y acciones.
 *
 * Estado inicial:
 * - products: Lista de productos precargados desde un archivo local.
 * - totalProducts: Cantidad total de productos disponibles.
 *
 * Reducers:
 * - getProducts: Acción que simplemente retorna el estado actual de los productos.
 *   Puede utilizarse como plantilla para futuras acciones o para mantener coherencia estructural.
 *
 * Exportaciones:
 * - getProducts: Acción que puede despacharse desde los componentes.
 * - productsSlice.reducer: Reducer que debe incluirse en el store principal de Redux.
 *
 * Este archivo es útil para mantener una fuente de verdad centralizada del catálogo de productos.
 */
// Initial State
const INITIAL_STATE = {
    products: Products,
    totalProducts: TotalProducts,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: INITIAL_STATE,
    reducers: {
        getProducts: state => {
            return state;
        },
    },
});

export const { getProducts } = productsSlice.actions;

export default productsSlice.reducer;