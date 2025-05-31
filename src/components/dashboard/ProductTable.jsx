import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
//import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/**
 * Componente 'ProductTable', renderiza una tabla con la lista de productos
 * 
 * Cada fila tiene nombre, descripcion y el boton para eliminar el producto
 * 
 * @param {Array<Object>} products - Lista de productos a mostrar
 * @param {Function} handleDelete - Funcion que se ejecuta cuando se hace click en "Eliminar"
 * @returns {JSX.Element} Tabla con la lista de productos 
 */
const ProductTable = ({ products, handleDelete }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.nombre}</TableCell>
              <TableCell>{product.descripcion}</TableCell>
              <TableCell>
                {/*<Button onClick={() => handleOpen(product)}><EditIcon/></Button>*/}
                <Button onClick={() => handleDelete(product.id)}><DeleteForeverIcon/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;