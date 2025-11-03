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

interface OrderSummaryProps {
  photos: Photo[]
  totalPrice: number
}

export default function OrderSummary({ photos, totalPrice }: OrderSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = () => {
    if (photos.length === 0) {
      alert('⚠️ Please upload at least one photo before checkout!')
      return
    }
    
    setIsProcessing(true)
    
    setTimeout(() => {
      alert(
        `✅ Order Placed Successfully!\n\n` +
        `Total Amount: AED ${totalPrice.toFixed(2)}\n` +
        `Number of Prints: ${photos.length}\n\n` +
        `Thank you for your order!\n` +
        `We'll process your prints shortly.`
      )
      setIsProcessing(false)
    }, 1000)
  }

  if (photos.length === 0) {
    return null
  }

  const deliveryFee = 0 // Free delivery
  const finalTotal = totalPrice + deliveryFee

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-teal-50 px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
          <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-full shadow-sm">
            <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">{photos.length} {photos.length === 1 ? 'Item' : 'Items'}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Itemized List */}
        <div className="space-y-3 mb-6">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="flex items-center space-x-4 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors"
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-slate-200 shadow-sm">
                <img 
                  src={photo.preview} 
                  alt={`Print ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  Print #{index + 1}
                </p>
                <p className="text-xs text-slate-500">
                  Size: {photo.size}
                </p>
              </div>
              
              {/* Price */}
              <div className="flex-shrink-0">
                <p className="text-sm font-bold text-slate-900">
                  AED {photo.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pricing Breakdown */}
        <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-semibold text-slate-900">AED {totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-slate-600">Delivery</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                FREE
              </span>
            </div>
            <span className="font-semibold text-emerald-600">AED {deliveryFee.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Total */}
        <div className="mb-6">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border-2 border-teal-200">
            <span className="text-lg font-bold text-slate-900">Total Amount</span>
            <span className="text-2xl font-bold text-teal-600">
              AED {finalTotal.toFixed(2)}
            </span>
          </div>
        </div>


        
        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 ${
            isProcessing
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing Order...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Place Order</span>
            </span>
          )}
        </button>
        
        {/* Security Info */}
        <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-slate-500">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Demo mode - No payment will be processed</span>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-teal-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-xs font-medium text-slate-600">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs font-medium text-slate-600">Fast</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-xs font-medium text-slate-600">Quality</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}