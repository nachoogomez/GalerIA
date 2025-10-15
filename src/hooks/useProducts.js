// Custom hook for Firebase CRUD operations
import { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productsCollection = collection(db, "products"); // 🔹 colección unificada

  // Listener en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(
      productsCollection,
      (snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false);
        console.log("Productos cargados:", productsData); // depuración
      },
      (error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Subir imagen a Storage y obtener URL
  const uploadImage = async (imageFile, productId) => {
    if (!imageFile) return null;

    const imageRef = ref(storage, `products/${productId}_${Date.now()}_${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  // Crear producto
  const createProduct = async (productData) => {
    try {
      setLoading(true);
      const { imagen, ...otherData } = productData;

      const docRef = await addDoc(productsCollection, {
        ...otherData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (imagen && imagen instanceof File) {
        const imageURL = await uploadImage(imagen, docRef.id);
        await updateDoc(docRef, { imagenUrl: imageURL });
      }
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const productRef = doc(db, "products", id);
      const { imagen, ...otherData } = productData;

      const updateData = { ...otherData, updatedAt: new Date() };

      if (imagen && imagen instanceof File) {
        const imageURL = await uploadImage(imagen, id);
        updateData.imagenUrl = imageURL;
      }

      await updateDoc(productRef, updateData);
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, createProduct, updateProduct, deleteProduct };
};

