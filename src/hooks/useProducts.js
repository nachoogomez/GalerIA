// Custom hook for Firebase CRUD operations
import { useState, useEffect } from "react"
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "../firebase/config"

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const productsCollection = collection(db, "products")

  // Real-time listener for products
  useEffect(() => {
    const unsubscribe = onSnapshot(
      productsCollection,
      (snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setProducts(productsData)
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching products:", error)
        setError(error.message)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  // Helper function to upload image to Firebase Storage
  const uploadImage = async (imageFile, productId) => {
    if (!imageFile) return null
    
    const imageRef = ref(storage, `products/${productId}_${Date.now()}_${imageFile.name}`)
    await uploadBytes(imageRef, imageFile)
    const downloadURL = await getDownloadURL(imageRef)
    return downloadURL
  }

  // Create product
  const createProduct = async (productData) => {
    try {
      setLoading(true)
      
      // Separate image file from other data
      const { imagen, ...otherData } = productData
      
      // Create product document first
      const docRef = await addDoc(productsCollection, {
        ...otherData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      
      // Upload image if provided and update document with image URL
      if (imagen && imagen instanceof File) {
        const imageURL = await uploadImage(imagen, docRef.id)
        await updateDoc(docRef, { imagen: imageURL })
      }
      
    } catch (error) {
      console.error("Error creating product:", error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Update product
  const updateProduct = async (id, productData) => {
    try {
      setLoading(true)
      const productRef = doc(db, "products", id)
      
      // Separate image file from other data
      const { imagen, ...otherData } = productData
      
      // Update basic product data
      const updateData = {
        ...otherData,
        updatedAt: new Date(),
      }
      
      // If there's a new image file, upload it and add URL to update data
      if (imagen && imagen instanceof File) {
        const imageURL = await uploadImage(imagen, id)
        updateData.imagen = imageURL
      }
      
      await updateDoc(productRef, updateData)
    } catch (error) {
      console.error("Error updating product:", error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Delete product
  const deleteProduct = async (id) => {
    try {
      setLoading(true)
      const productRef = doc(db, "products", id)
      await deleteDoc(productRef)
    } catch (error) {
      console.error("Error deleting product:", error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  }


}
