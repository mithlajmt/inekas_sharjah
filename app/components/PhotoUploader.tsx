'use client'

interface PhotoUploaderProps {
  onPhotosSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  fileInputRef: React.RefObject<HTMLInputElement>
  canUploadMore: boolean
  currentCount: number
}

export default function PhotoUploader({ onPhotosSelect, fileInputRef, canUploadMore, currentCount }: PhotoUploaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <div className="text-center max-w-2xl mx-auto">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onPhotosSelect}
          className="hidden"
          id="photo-input"
          disabled={!canUploadMore}
        />
        
        <label 
          htmlFor="photo-input"
          className={`group block ${!canUploadMore ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
          {/* Compact Upload Area */}
          <div className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden ${
            canUploadMore 
              ? 'border-slate-300 hover:border-teal-500 hover:bg-teal-50/50' 
              : 'border-slate-200 bg-slate-50'
          }`}>
            {/* Background Pattern */}
            {canUploadMore && (
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>
            )}

            <div className="relative">
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
                canUploadMore
                  ? 'bg-gradient-to-br from-teal-500 to-emerald-600 shadow-teal-500/30 group-hover:scale-110 group-hover:rotate-3'
                  : 'bg-slate-300 shadow-slate-300/30'
              }`}>
                {canUploadMore ? (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                )}
              </div>

              {/* Text */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                {canUploadMore 
                  ? currentCount === 0 ? 'Upload Your Photos' : 'Add More Photos'
                  : 'Maximum Photos Reached'
                }
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {canUploadMore 
                  ? 'Drag and drop or click to browse'
                  : 'You can upload up to 5 photos total'
                }
              </p>

              {/* Button */}
              {canUploadMore && (
                <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-teal-500/40 group-hover:-translate-y-0.5">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm sm:text-base">
                    {currentCount === 0 ? 'Choose Files' : `Add ${5 - currentCount} More`}
                  </span>
                </div>
              )}

              {/* Compact Info */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Up to 5 photos</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center space-x-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>JPG, PNG, HEIC</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center space-x-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>Max 10MB each</span>
                </div>
              </div>
            </div>
          </div>
        </label>

        {/* Compact Features - Single Row */}
        <div className="mt-6 flex items-center justify-center gap-6 sm:gap-8">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-700">Instant</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-700">Secure</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-700">HD Quality</p>
          </div>
        </div>
      </div>
    </div>
  )
}