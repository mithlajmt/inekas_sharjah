'use client'

export default function PhotoCard({ photo, onSizeChange, onRemove }) {
  const sizes = [
    { label: '4×6', value: '4x6', price: 1.5 },
    { label: '5×7', value: '5x7', price: 3.0 },
    { label: '8×10', value: '8x10', price: 5.0 }
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Photo Preview */}
      <div className="relative">
        <img 
          src={photo.preview} 
          alt="Photo preview"
          className="w-full h-48 object-cover rounded-lg"
        />
        {/* Remove button */}
        <button
          onClick={() => onRemove(photo.id)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
        >
          ✕
        </button>
      </div>
      
      {/* Size Selector */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Size:
        </label>
        <select
          value={photo.size}
          onChange={(e) => onSizeChange(photo.id, e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sizes.map(size => (
            <option key={size.value} value={size.value}>
              {size.label} - AED {size.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Price Display */}
      <div className="mt-3 text-right">
        <span className="text-lg font-bold text-blue-600">
          AED {photo.price.toFixed(2)}
        </span>
      </div>
    </div>
  )
}