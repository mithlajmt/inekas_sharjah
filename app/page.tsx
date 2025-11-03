'use client'
import { useState, useRef, useEffect } from 'react'
import PhotoUploader from './components/PhotoUploader'
import PhotoCard from './components/PhotoCard'
import OrderSummary from './components/OrderSummary'

interface Photo {
  id: number
  file: File
  fileName: string
  preview: string
  size: '4x6' | '5x7' | '8x10'
  price: number
}

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const photosRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const prices: Record<string, number> = {
    '4x6': 1.5,
    '5x7': 3.0,
    '8x10': 5.0
  }

  // Cleanup blob URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      photos.forEach(photo => {
        URL.revokeObjectURL(photo.preview)
      })
    }
  }, [photos])

  // Auto-scroll to photos when uploaded
  useEffect(() => {
    if (photos.length > 0 && photosRef.current) {
      setTimeout(() => {
        photosRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 300)
    }
  }, [photos.length])

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    const files = event.target.files ? Array.from(event.target.files) : []
    
    // Reset file input for re-upload same files
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    
    if (files.length === 0) {
      setError('Please select at least one photo')
      setIsLoading(false)
      return
    }
    
    // Check if adding more would exceed limit
    const totalPhotos = photos.length + files.length
    if (totalPhotos > 5) {
      setError(`You can only upload ${5 - photos.length} more photo(s). Maximum is 5 total.`)
      setIsLoading(false)
      return
    }
    
    const maxSize = 10 * 1024 * 1024
    const oversizedFiles = files.filter(file => file.size > maxSize)
    if (oversizedFiles.length > 0) {
      setError('Some files are too large. Maximum file size is 10MB per photo.')
      setIsLoading(false)
      return
    }
    
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    if (validFiles.length !== files.length) {
      setError('Please upload only image files (JPG, PNG, HEIC, WebP)')
      setIsLoading(false)
      return
    }
    
    setError('')
    
    setTimeout(() => {
      const processedPhotos: Photo[] = validFiles.map((file, index) => ({
        id: Date.now() + index,
        file: file,
        fileName: file.name,
        preview: URL.createObjectURL(file),
        size: '4x6',
        price: 1.5
      }))
      
      // Append to existing photos instead of replacing
      setPhotos(prev => [...prev, ...processedPhotos])
      setIsLoading(false)
    }, 500)
  }

  const handleSizeChange = (photoId: number, newSize: '4x6' | '5x7' | '8x10') => {
    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, size: newSize, price: prices[newSize] }
        : photo
    ))
  }

  const handleRemovePhoto = (photoId: number) => {
    const photoToRemove = photos.find(p => p.id === photoId)
    if (photoToRemove) {
      // Clean up blob URL
      URL.revokeObjectURL(photoToRemove.preview)
    }
    setPhotos(photos.filter(photo => photo.id !== photoId))
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all photos?')) {
      // Clean up all blob URLs
      photos.forEach(photo => URL.revokeObjectURL(photo.preview))
      setPhotos([])
    }
  }

  const totalPrice = photos.reduce((sum, photo) => sum + photo.price, 0)
  const canUploadMore = photos.length < 5

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-50">
      {/* Minimal Header */}
      <header className="bg-white/95 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">PrintHub</h1>
                <p className="text-xs text-slate-500 hidden sm:block">Premium Photo Printing</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Secure</span>
              </div>
              <div className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                photos.length >= 5 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {photos.length}/5 Photos
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Error Message with dismiss button */}
        {error && (
          <div className="mb-6 sm:mb-8 bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 shadow-sm animate-shake">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
              <button
                onClick={() => setError('')}
                className="text-red-400 hover:text-red-600 transition-colors ml-4"
                aria-label="Dismiss error"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Upload Section */}
        <div className="mb-8 sm:mb-12">
          <PhotoUploader 
            onPhotosSelect={handlePhotoSelect} 
            fileInputRef={fileInputRef}
            canUploadMore={canUploadMore}
            currentCount={photos.length}
          />
          
          {isLoading && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center justify-center space-x-3">
                <div className="w-8 h-8 border-3 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <span className="text-slate-600 font-medium">Processing images...</span>
              </div>
            </div>
          )}
          
          {photos.length > 0 && !isLoading && (
            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold text-emerald-800">
                  {photos.length} {photos.length === 1 ? 'photo' : 'photos'} ready to print
                  {canUploadMore && ` • ${5 - photos.length} more ${5 - photos.length === 1 ? 'slot' : 'slots'} available`}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Photo Grid */}
        {photos.length > 0 ? (
          <div ref={photosRef} className="mb-8 sm:mb-12 scroll-mt-24">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Photos</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Select print size for each photo
                </p>
              </div>
              <button
                onClick={handleClearAll}
                className="flex items-center space-x-2 text-sm text-slate-600 hover:text-red-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">Clear All</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {photos.map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  onSizeChange={handleSizeChange}
                  onRemove={handleRemovePhoto}
                />
              ))}
            </div>
          </div>
        ) : !isLoading && (
          <div className="text-center py-12 sm:py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">No photos yet</h3>
              <p className="text-slate-600 mb-6 text-sm">
                Upload your favorite photos to get started
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>HD Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Best Price</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Order Summary */}
        <OrderSummary photos={photos} totalPrice={totalPrice} />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2025 PrintHub. Crafted with care for your memories.</p>
        </div>
      </footer>
    </div>
  )
}