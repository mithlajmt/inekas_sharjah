'use client'

export default function PhotoUploader({ onPhotosSelect }: any) {
  return (
    <div className="text-center py-8">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onPhotosSelect}
        className="hidden"
        id="photo-input"
      />
      <label
        htmlFor="photo-input"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 inline-block"
      >
        📷 Choose Photos (Max 5)
      </label>
    </div>
  )
}
