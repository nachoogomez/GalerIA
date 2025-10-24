import { useState } from "react"
import { ProductTable } from "../components/dashboard/ProductTable"
import { ProductForm } from "../components/dashboard/ProductForm"
import { useProducts } from "../hooks/useProducts"

/**
 * Componente Dashboard
 * 
 * - Renderiza las obras de arte en una tabla
 * - Muestra un formulario modal para crear obras de arte
 * - Edita y elimina obras de arte
 * 
 * @returns {JSX.Element} Componente Dashboard
 */
export default function Dashboard() {
  // Hook personalizado para obtener los productos y funciones CRUD
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts()

  // Estados locales
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)

  /**
   * Maneja la eliminación de un producto.
   * @param {string|number} id - El ID del producto a eliminar
   */
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
    } catch (error) {
      alert("Error deleting product: " + error.message)
    }
  }

  /**
   * Maneja la edición de un producto.
   * @param {object} product - El producto a editar
   */
  const handleEdit = (product) => {
    setCurrentProduct(product)
    setIsFormOpen(true)
  }

  /**
   * Maneja la creación o edición de un producto.
   * @param {FormData} formData - Los datos del formulario
   */
  const handleSubmit = async (formData) => {
    try {
      const nombre = formData.get("nombre")
      const descripcion = formData.get("descripcion")
      const imagen = formData.get("imagen") // Get the image file

      const productData = { nombre, descripcion }
      
      // Add image to productData if it exists
      if (imagen && imagen.size > 0) {
        productData.imagen = imagen
      }

      if (currentProduct) {
        // Edit existing product
        await updateProduct(currentProduct.id, productData)
      } else {
        // Create new product
        await createProduct(productData)
      }

      // Close form and reset state only after successful operation
      setIsFormOpen(false)
      setCurrentProduct(null)
      
      // Operation completed successfully, no need to throw
      return Promise.resolve()
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Error saving product: " + error.message)
      // Re-throw the error so the form knows it failed
      throw error
    }
  }

  /**
   * Maneja el cierre del formulario.
   */
  const handleClose = () => {
    setIsFormOpen(false)
    setCurrentProduct(null)
  }

  //Renderizado del estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  //Renderizado del estado de error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  //Renderizado principal
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-2">Manage your product collection with ease</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <ProductTable products={products} onDelete={handleDelete} onEdit={handleEdit} />
        </div>

        {/* Form Modal */}
        <ProductForm
          isOpen={isFormOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
          currentProduct={currentProduct}
        />
      </div>
    </div>
  )
}
