import { Container, Typography, Button } from '@mui/material';
import ProductForm from '../components/dashboard/ProductForm';
import ProductTable from '../components/dashboard/ProductTable';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../axios/products';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const token = useSelector((state) => state.user.currentUser.access_token);

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

