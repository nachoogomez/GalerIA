
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";

// Generar placeholder base64
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

  if (!isOpen) return null;

  const handleFileChange = (e) => setSelectedFile(e.target.files?.[0]);

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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input name="nombre" placeholder="Título" required className="w-full border p-2 rounded" />
          <textarea name="descripcion" placeholder="Descripción" required className="w-full border p-2 rounded" />
          <input type="file" accept="image/*" required onChange={handleFileChange} />
          <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white py-2 rounded">
            {uploading ? "Subiendo..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}
