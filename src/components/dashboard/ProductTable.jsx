import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
//import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/**
 * Componente 'ProductTable'
 * 
 * Muestra la tabla de productos
 * Cada fila tiene nombre, descripcion y el boton para eliminar el producto
 * 
 * @component
 * @param {Array<Object>} products - Lista de productos a mostrar
 * @param {Function} handleDelete - Funcion que se ejecuta cuando se hace click en "Eliminar"
 *  
 * @returns {JSX.Element} Tabla con la lista de productos 
 */
// Componente para mostrar la tabla de productos, recibe los productos, la función para abrir el modal y la función para eliminar un producto como props y retorna la tabla con los productos usando map para mostrarlos en la tabla y botones para editar y eliminar los productos
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