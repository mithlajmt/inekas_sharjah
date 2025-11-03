'use client'
import { useState } from 'react'
import PhotoUploader from './components/PhotoUploader'
import PhotoCard from './components/PhotoCard'
import OrderSummary from './components/OrderSummary'

export default function Home() {
  const [photos, setPhotos] = useState([])
  const [error, setError] = useState('')

  // Price mapping
  const prices = {
    '4x6': 1.5,
    '5x7': 3.0,
    '8x10': 5.0
  }

  const handlePhotoSelect = (event) => {
    const files = Array.from(event.target.files)
    
    // ERROR 1: No files selected
    if (files.length === 0) {
      setError('❌ Please select at least one photo')
      return
    }
    
    // ERROR 2: Too many photos
    if (files.length > 5) {
      setError('❌ Maximum 5 photos allowed! You selected ' + files.length + ' photos.')
      return
    }
    
    // ERROR 3: File too large (optional, 10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const oversizedFiles = files.filter(file => file.size > maxSize)
    if (oversizedFiles.length > 0) {
      setError('❌ Some files are too large! Maximum file size is 10MB.')
      return
    }
    
    // ERROR 4: Invalid file types
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    if (validFiles.length !== files.length) {
      setError('❌ Please upload only image files (JPG, PNG, HEIC, etc.)')
      return
    }
    
    // SUCCESS: Clear errors
    setError('')
    
    // Process photos
    const processedPhotos = validFiles.map((file, index) => ({
      id: Date.now() + index,
      file: file,
      fileName: file.name,
      preview: URL.createObjectURL(file),
      size: '4x6',
      price: 1.5
    }))
    
    setPhotos(processedPhotos)
  }

  // Handle size change
  const handleSizeChange = (photoId, newSize) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, size: newSize, price: prices[newSize] }
        : photo
    ))
  }

  // Handle photo removal
  const handleRemovePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId))
  }

  // Calculate total price
  const totalPrice = photos.reduce((sum, photo) => sum + photo.price, 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          📸 Photo Print Shop
        </h1>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            ⚠️ {error}
          </div>
        )}
        
        {/* Upload Section */}
        <PhotoUploader onPhotosSelect={handlePhotoSelect} />
        
        {/* Success Message */}
        {photos.length > 0 && (
          <p className="text-center text-green-600 mt-4">
            ✅ {photos.length} photo(s) uploaded successfully!
          </p>
        )}
        
        {/* Photo Grid */}
        {photos.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Photos:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map(photo => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onSizeChange={handleSizeChange}
                  onRemove={handleRemovePhoto}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Show message if no photos */}
        {photos.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            <p className="text-lg">No photos uploaded yet.</p>
            <p className="text-sm">Upload up to 5 photos to get started!</p>
          </div>
        )}

<OrderSummary photos={photos} totalPrice={totalPrice} />

      </div>
    </div>
  )
}