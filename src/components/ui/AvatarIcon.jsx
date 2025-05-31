import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

/**
 * Componente que muestra un avatar con la letra "A"
 * 
 * Utiliza componentes de Material UI para la presentación del avatar y su disposición
 * 
 * @returns {JSX.Element} Avatar simple dentro de un stack horizontal
 */
const AvatarIcon = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar>A</Avatar>
    </Stack>
  );
};

export default AvatarIcon;