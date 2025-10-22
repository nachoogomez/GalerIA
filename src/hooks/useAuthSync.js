import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, clearCurrentUser } from '../redux/user/userSlice';

/**
 * Hook personalizado para sincronizar el estado de Auth0 con Redux.
 *
 * Funcionalidades:
 * - Sincroniza automáticamente cuando Auth0 detecta un usuario autenticado.
 * - Guarda el usuario en Redux cuando hay sesión activa.
 * - Limpia el estado de Redux cuando el usuario cierra sesión.
 * - Se ejecuta solo cuando cambia el estado de autenticación o carga.
 *
 * @returns {void}
 */
export const useAuthSync = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // Esperar a que Auth0 termine de cargar
    if (isLoading) {
      return;
    }

    // Si Auth0 tiene un usuario autenticado
    if (isAuthenticated && user) {
      // Solo actualizar Redux si el usuario cambió o no existe
      if (!currentUser || currentUser.email !== user.email) {
        dispatch(setCurrentUser(user));
      }
    }
    // Si Auth0 NO tiene usuario autenticado pero Redux sí
    else if (!isAuthenticated && currentUser) {
      // Limpiar Redux (el usuario cerró sesión)
      dispatch(clearCurrentUser());
    }
  }, [isAuthenticated, isLoading, user, currentUser, dispatch]);
};
