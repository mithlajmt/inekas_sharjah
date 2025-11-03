'use client'
import { useState } from 'react'

export default function OrderSummary({ photos, totalPrice }) {
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleCheckout = () => {
    if (photos.length === 0) {
      alert('⚠️ Please upload at least one photo before checkout!')
      return
    }
    
    // Show success message
    setOrderPlaced(true)
    
    // Simulate order placement
    setTimeout(() => {
      alert(`🎉 Order Placed Successfully!\n\nTotal: AED ${totalPrice.toFixed(2)}\n${photos.length} photo(s)\n\nThank you for your order!`)
      setOrderPlaced(false)
    }, 500)
  }

  if (photos.length === 0) {
    return null // Don't show if no photos
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      
      {/* Itemized List */}
      <div className="space-y-2 mb-4">
        {photos.map((photo, index) => (
          <div key={photo.id} className="flex justify-between text-gray-700">
            <span>Photo {index + 1} ({photo.size})</span>
            <span>AED {photo.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      {/* Divider */}
      <hr className="my-4" />
      
      {/* Total */}
      <div className="flex justify-between items-center text-xl font-bold">
        <span>Total:</span>
        <span className="text-blue-600">AED {totalPrice.toFixed(2)}</span>
      </div>
      
      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={orderPlaced}
        className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition-colors ${
          orderPlaced 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {orderPlaced ? '⏳ Processing...' : '💳 Pay Now'}
      </button>
      
      {/* Info Text */}
      <p className="text-sm text-gray-500 text-center mt-3">
        * This is a demo. No actual payment will be processed.
      </p>
    </div>
  )
}