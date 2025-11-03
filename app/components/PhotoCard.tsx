'use client'
import { useState } from 'react'

interface Photo {
  id: number
  file: File
  fileName: string
  preview: string
  size: '4x6' | '5x7' | '8x10'
  price: number
}

interface PhotoCardProps {
  photo: Photo
  index: number
  onSizeChange: (photoId: number, newSize: '4x6' | '5x7' | '8x10') => void
  onRemove: (photoId: number) => void
}

export default function PhotoCard({ photo, index, onSizeChange, onRemove }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const sizes = [
    { label: '4 × 6 inches', value: '4x6', price: 1.5, desc: 'Standard' },
    { label: '5 × 7 inches', value: '5x7', price: 3.0, desc: 'Popular' },
    { label: '8 × 10 inches', value: '8x10', price: 5.0, desc: 'Large' }
  ]

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-teal-300 animate-fadeIn">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        
        {/* Image */}
        {!imageError ? (
          <img 
            src={photo.preview} 
            alt={photo.fileName}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } group-hover:scale-105`}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg className="w-12 h-12 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-slate-500">Failed to load</p>
            </div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Photo Number Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
          #{index + 1}
        </div>
        
        {/* Remove Button */}
        <button
          onClick={() => onRemove(photo.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-red-500 text-slate-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 hover:rotate-90"
          aria-label="Remove photo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* File Size Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
          {formatFileSize(photo.file.size)}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* File Name */}
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-500 mb-1">File name</p>
          <p className="text-sm font-semibold text-slate-900 truncate" title={photo.fileName}>
            {photo.fileName}
          </p>
        </div>

        {/* Size Selector */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Print Size
          </label>
          
          <div className="space-y-2">
            {sizes.map(size => (
              <button
                key={size.value}
                onClick={() => onSizeChange(photo.id, size.value as '4x6' | '5x7' | '8x10')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 ${
                  photo.size === size.value
                    ? 'border-teal-500 bg-teal-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    photo.size === size.value
                      ? 'border-teal-500 bg-teal-500'
                      : 'border-slate-300'
                  }`}>
                    {photo.size === size.value && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-semibold ${
                      photo.size === size.value ? 'text-teal-900' : 'text-slate-900'
                    }`}>
                      {size.label}
                    </p>
                    <p className="text-xs text-slate-500">{size.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-base font-bold ${
                    photo.size === size.value ? 'text-teal-600' : 'text-slate-900'
                  }`}>
                    AED {size.price.toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Price Badge */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-100">
          <span className="text-sm font-medium text-slate-700">Selected Price</span>
          <span className="text-lg font-bold text-teal-600">
            AED {photo.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}