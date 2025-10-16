// Custom hook for Firebase CRUD operations
import { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";

/**
 * Custom hook para manejar operaciones CRUD con Firebase Firestore y Storage.
 * 
 * Permite crear, leer, actualizar y eliminar productos, además de subir imágenes a Firebase Storage.
 * Utiliza un listener en tiempo real con `onSnapshot` para mantener la lista de productos actualizada.
 * 
 * @returns {Object} - Devuelve los datos y funciones del hook.
 * @property {Array} products - Lista de productos obtenidos desde Firestore.
 * @property {boolean} loading - Indica si hay una operación en curso.
 * @property {string|null} error - Contiene el mensaje de error si ocurre alguno.
 * @property {Function} createProduct - Crea un nuevo producto en Firestore.
 * @property {Function} updateProduct - Actualiza un producto existente.
 * @property {Function} deleteProduct - Elimina un producto de Firestore.
 */
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

    /**
   * Sube una imagen a Firebase Storage y devuelve su URL pública.
   *
   * @async
   * @param {File} imageFile - Archivo de imagen seleccionado por el usuario.
   * @param {string} productId - ID del producto asociado a la imagen.
   * @returns {Promise<string|null>} - URL de descarga de la imagen o null si no se sube.
   */
  const uploadImage = async (imageFile, productId) => {
    if (!imageFile) return null;

    const imageRef = ref(storage, `products/${productId}_${Date.now()}_${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  /**
  * Crea un nuevo producto en Firestore.
  * Si se incluye una imagen, la sube a Storage y guarda la URL.
  *
  * @async
  * @param {Object} productData - Datos del producto a crear.
  * @param {string} productData.nombre - Nombre del producto.
  * @param {string} [productData.descripcion] - Descripción del producto.
  * @param {number} [productData.precio] - Precio del producto.
  * @param {File} [productData.imagen] - Archivo de imagen a subir.
  * @throws {Error} - Lanza error si la creación falla.
  */
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

  /**
  * Actualiza los datos de un producto existente.
  * Si se pasa una nueva imagen, la reemplaza en Storage.
  *
  * @async
  * @param {string} id - ID del producto a actualizar.
  * @param {Object} productData - Nuevos datos del producto.
  * @param {string} [productData.nombre] - Nombre actualizado.
  * @param {string} [productData.descripcion] - Descripción actualizada.
  * @param {number} [productData.precio] - Precio actualizado.
  * @param {File} [productData.imagen] - Nueva imagen del producto.
  * @throws {Error} - Lanza error si la actualización falla.
  */
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

  /**
  * Elimina un producto de Firestore según su ID.
  *
  * @async
  * @param {string} id - ID del producto a eliminar.
  * @throws {Error} - Lanza error si la eliminación falla.
  */
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
