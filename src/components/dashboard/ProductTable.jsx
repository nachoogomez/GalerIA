/**
 * Componente que muestra una tabla de productos obtenidos desde Firebase.
 * 
 * Permite visualizar los productos existentes y realizar acciones como editar o eliminar.
 * La eliminación se confirma con el usuario antes de ejecutarse.
 *
 * @param {Object} props - Propiedades recibidas por el componente.
 * @param {Array} props.products - Lista de productos obtenidos desde Firestore.
 * @param {Function} props.onEdit - Función que se ejecuta al hacer clic en "Edit".
 * 
 * @returns {JSX.Element} Tabla de productos con opciones para editar y eliminar.
 */
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export function ProductTable({ products, onEdit }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No artworks to display yet
      </div>
    );
  }

  /**
   * Elimina un producto de la colección "products" en Firestore.
   * 
   * Muestra una confirmación antes de proceder con la eliminación.
   * 
   * @async
   * @param {string} id - ID del producto a eliminar.
   */
  const handleDelete = async (id) => {
    if (confirm("¿Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
    }
  };

  return (
    <div className="overflow-hidden border rounded-lg">
      <div className="bg-gray-50 px-6 py-3 font-medium text-gray-700">
        Products
      </div>

      <div className="divide-y divide-gray-200">
        {products.map((product) => (
          <div key={product.id} className="p-4 flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-gray-800">{product.nombre}</h4>
              <p className="text-gray-600 text-sm">{product.descripcion}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(product)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

