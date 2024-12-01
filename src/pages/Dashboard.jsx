import { Container, Typography, Button } from '@mui/material';
import ProductForm from '../components/dashboard/ProductForm';
import ProductTable from '../components/dashboard/ProductTable';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../axios/products';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const token = useSelector((state) => state.user.currentUser.access_token);

  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
 
  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const handleOpen = (product = null) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentProduct(null);
    setOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, formData, token);
      } else {
        await createProduct(formData, token);
      }
      
      if (formData.get('image')) {
        const imageFormData = new FormData();
        imageFormData.append('imagen', formData.get('imagen'));
        
        await axios.post('http://localhost:3000/', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      fetchProductsData();
      handleClose();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, token);
      fetchProductsData();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  if (role !== "SUPER" && role !== "ADMIN") {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
         <p className='flex justify-center items-center text-3xl font-bold '>Usted no tiene permiso para acceder a esta seccion</p>
         <p className='flex justify-center items-center text-xl font-bold '>Sera redirigido en 3 segundos</p>
          {setTimeout(() => {
            window.location.href = '/';
          }, 3000)}
      </div>
    );
  }
 
  return (

    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Productos
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Crear Producto
      </Button>
      <ProductTable products={products} handleOpen={handleOpen} handleDelete={handleDelete} />
      <ProductForm open={open} handleClose={handleClose} handleSubmit={handleSubmit} currentProduct={currentProduct} />
    </Container>
  );
}

export default Dashboard;

