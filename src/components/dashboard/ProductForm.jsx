import { useState, useEffect } from "react"

export function ProductForm({ isOpen, onClose, onSubmit, currentProduct }) {
  const [selectedFile, setSelectedFile] = useState(null)

  // Reset form state when modal opens/closes or currentProduct changes
  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null)
    }
  }, [isOpen, currentProduct])

  if (!isOpen) return null

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (selectedFile) {
      formData.append("imagen", selectedFile)
    }
    
    // Just call onSubmit and let the parent handle success/error and closing
    await onSubmit(formData)
    
    // Reset form state after successful submission
    setSelectedFile(null)
    e.target.reset()
  }

  const handleClose = () => {
    setSelectedFile(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{currentProduct ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={handleClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-md transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Enter product title"
              defaultValue={currentProduct?.nombre || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Describe your product"
              defaultValue={currentProduct?.descripcion || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="imagen" />
              <label htmlFor="imagen" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  {selectedFile ? (
                    <>
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">Click to change image</p>
                    </>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-900">Upload Image</p>
                      <p className="text-xs text-gray-500">Click to select an image file</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {currentProduct ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
