/**
 * Componente que muestra un formulario para agregar un nuevo producto a Firebase.
 * 
 * Permite subir una imagen al Storage, generar una versión base64 como placeholder,
 * y guardar la información del producto en la colección "products" de Firestore.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Controla la visibilidad del formulario modal.
 * @param {Function} props.onClose - Función para cerrar el formulario.
 * @param {Function} [props.onSubmit] - Función opcional que se ejecuta tras guardar el producto.
 * 
 * @returns {JSX.Element|null} Modal con el formulario de carga de producto o `null` si está cerrado.
 */
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";

/**
 * Genera una versión base64 reducida de una imagen seleccionada.
 * 
 * Se utiliza para crear un placeholder liviano que puede mostrarse
 * mientras se carga la imagen real.
 * 
 * @async
 * @param {File} file - Archivo de imagen seleccionado por el usuario.
 * @returns {Promise<string>} Cadena base64 representando una versión reducida de la imagen.
 */
async function generatePlaceholder(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const MAX_WIDTH = 20;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.5));
      };
    };
    reader.readAsDataURL(file);
  });
}

export function ProductForm({ isOpen, onClose, onSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Si el formulario no esta abierto, no mostrar nada
  if (!isOpen) return null;

  /**
   * Maneja el cambio de archivo seleccionado por el usuario.
   * 
   * @param {Event} e - Evento del input de tipo "file".
   */
  const handleFileChange = (e) => setSelectedFile(e.target.files?.[0]);

  /**
   * Envía el formulario, sube la imagen al Storage, genera el placeholder
   * y guarda los datos del producto en Firestore.
   * 
   * @async
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Selecciona una imagen");

    setUploading(true);

    try {
      const formData = new FormData(e.target);
      const nombre = formData.get("nombre");
      const descripcion = formData.get("descripcion");

      // Subir imagen
      const storageRef = ref(storage, `products/${Date.now()}_${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const imagenUrl = await getDownloadURL(storageRef);

      // Placeholder
      const placeholderUrl = await generatePlaceholder(selectedFile);

      // Guardar producto en Firestore
      await addDoc(collection(db, "products"), {
        nombre,
        descripcion,
        imagenUrl,
        placeholderUrl,
        createdAt: new Date(),
      });

      // Limpiar formulario y cerrar modal
      setSelectedFile(null);
      e.target.reset();
      onClose();
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el producto");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800">Agregar producto</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✖</button>
        </div>

        {/* Formulario de carga */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input name="nombre" placeholder="Title" required className="w-full border p-2 rounded" />
          <textarea name="descripcion" placeholder="Description" required className="w-full border p-2 rounded" />
          <input type="file" accept="image/*" required onChange={handleFileChange} />
          <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white py-2 rounded">
            {uploading ? "Uploading..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
