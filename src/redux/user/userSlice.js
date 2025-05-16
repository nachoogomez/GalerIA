import { createSlice } from '@reduxjs/toolkit';

/**
 * Se usa Resux Slice para manejar elestado del usuario actual
 * 
 * @property {Object[null]} currentUser - Usuario autenticado,o null sino hay sesion iniciada
 * 
 * @function setCurrentUser - guarda el usuario autenticado en el estado
 * 
 * @function clearCurrentUser - Elimina el usuario del estado (logout)
 */
// Estado inicial
const INITIAL_STATE = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    //Guarda el usuario en el estado
    setCurrentUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    //Elimina el usuario del estado
    clearCurrentUser: (state) => {
      return {
        ...state,
        currentUser: null,
      };
    },
  },
});

export const { setCurrentUser, clearCurrentUser} = userSlice.actions;

export default userSlice.reducer;