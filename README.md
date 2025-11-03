# 📸 PrintHub - Photo Printing Web Application

A modern, production-ready photo printing web application built with Next.js 14, TypeScript, and Tailwind CSS. Features instant photo upload, size selection, real-time price calculation, and a seamless mobile-first user experience.


## 🚀 Live Demo

**[View Live Application →](https://inekas-sharjah-3nbm.vercel.app/)**

---

## ✨ Features

### Core Functionality
- ✅ **Upload up to 5 photos** with drag-and-drop support
- ✅ **Instant preview** with thumbnail generation
- ✅ **Multiple print sizes** (4×6, 5×7, 8×10 inches)
- ✅ **Real-time price calculation** based on selected sizes
- ✅ **Order summary** with itemized breakdown

### User Experience
- 🎨 **Modern, clean design** with professional teal/emerald color palette
- 📱 **Mobile-first responsive design** optimized for all devices
- ⚡ **Lazy loading images** for optimal performance
- 🔄 **Smooth animations** and transitions throughout
- 💾 **Auto-scroll** to photos after upload
- ⏱️ **Auto-dismiss errors** after 5 seconds
- 🗑️ **Confirmation dialogs** for destructive actions

### Technical Features
- 🧹 **Memory leak prevention** with proper blob URL cleanup
- 🖼️ **Loading states** with skeleton animations
- 📊 **File size display** for each photo
- 🔢 **Photo numbering** for easy reference
- ♿ **WCAG accessibility compliant**
- 🎯 **TypeScript** for type safety

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **React Hooks** | State management (useState, useEffect, useRef) |
| **Vercel** | Deployment and hosting |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/mithlajmt/inekas_sharjah.git
cd inekas_sharjah
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
photo-print-app/
├── app/
│   ├── page.tsx                    # Main application page
│   ├── layout.tsx                  # Root layout with metadata
│   ├── globals.css                 # Global styles & animations
│   └── components/
│       ├── PhotoUploader.tsx       # File upload component
│       ├── PhotoCard.tsx           # Individual photo card with size selector
│       └── OrderSummary.tsx        # Order summary & checkout
├── public/                         # Static assets
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── next.config.js                  # Next.js configuration
└── README.md                       # This file
```

---

## 💰 Pricing

| Size | Dimensions | Price (AED) |
|------|-----------|-------------|
| Standard | 4×6 inches | 1.50 |
| Popular | 5×7 inches | 3.00 |
| Large | 8×10 inches | 5.00 |

**Delivery:** FREE for all orders

---

## 🎯 Key Implementation Details

### State Management
```typescript
const [photos, setPhotos] = useState<Photo[]>([])
const [error, setError] = useState<string>('')
const [isLoading, setIsLoading] = useState<boolean>(false)
```

### Memory Management
```typescript
useEffect(() => {
  return () => {
    photos.forEach(photo => URL.revokeObjectURL(photo.preview))
  }
}, [photos])
```

### Auto-Scroll on Upload
```typescript
useEffect(() => {
  if (photos.length > 0 && photosRef.current) {
    setTimeout(() => {
      photosRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }
}, [photos.length])
```

### Lazy Loading
```typescript
<img 
  src={photo.preview} 
  loading="lazy"
  onLoad={() => setImageLoaded(true)}
/>
```

---

## ⚙️ Configuration

### File Upload Limits
- **Maximum photos:** 5 per order
- **File size limit:** 10MB per photo
- **Accepted formats:** JPG, PNG, HEIC, WebP

### Validation Rules
- ✅ File type validation
- ✅ File size validation
- ✅ Maximum photo count enforcement
- ✅ Duplicate filename handling

---

## 🎨 Design System

### Color Palette
```css
Primary: Teal-500 (#14b8a6) to Emerald-600 (#059669)
Background: Slate-50 (#f8fafc) with teal tints
Text: Slate-900 (#0f172a)
Success: Emerald-600 (#059669)
Error: Red-500 (#ef4444)
```

### Typography
- **Headings:** Bold, Slate-900
- **Body:** Regular, Slate-600
- **Buttons:** Semibold, White

### Spacing
- **Mobile:** 4-6 padding units
- **Desktop:** 8-12 padding units
- **Touch targets:** Minimum 44px

---

## 📱 Mobile Optimization

- **Responsive breakpoints:** 320px, 640px, 768px, 1024px, 1280px
- **Touch-friendly buttons:** Minimum 44×44px tap targets
- **iOS Safari optimized:** Prevents zoom on input focus
- **Loading states:** Skeleton screens for perceived performance
- **Lazy loading:** Images load only when visible
- **No horizontal scroll:** Fluid grid system

---

## ♿ Accessibility Features

- ✅ **ARIA labels** on all interactive elements
- ✅ **Keyboard navigation** fully supported
- ✅ **Focus indicators** visible on all focusable elements
- ✅ **Screen reader compatible** with semantic HTML
- ✅ **Color contrast** meets WCAG AA standards
- ✅ **Alternative text** for images

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Live in ~2 minutes! 🎉

### Environment Variables
No environment variables required for this demo application.

---

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Upload 1 photo successfully
- [ ] Upload 5 photos (maximum)
- [ ] Attempt to upload 6 photos (should show error)
- [ ] Change print size for each photo
- [ ] Verify price updates correctly
- [ ] Remove individual photos
- [ ] Clear all photos with confirmation
- [ ] Place order (demo checkout)

### Mobile Tests (Chrome DevTools)
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] Samsung Galaxy S20 (360px)
- [ ] iPad (768px)
- [ ] Test on slow 3G network

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Screen reader announces elements
- [ ] Focus indicators visible
- [ ] Color contrast passes WCAG AA

---

## 🐛 Known Limitations

- **Demo Mode:** Payment button is mock (no real payment processing)
- **Client-Side Only:** Photos not persisted (refresh clears uploads)
- **No Backend:** No database or server-side storage
- **Session Storage:** Photos stored in browser memory only
- **No Authentication:** No user accounts or login system

---

## 📄 License

This project is created as an interview assignment and is available for educational purposes.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **Tailwind CSS** for the utility-first CSS framework
- **Inekas** for the interview opportunity

---

## 📞 Support

For questions about this project:
- Open an issue on GitHub
- Email: mithlajmatta@gmail.com
- Connect on LinkedIn

---


## ⭐ Key Features That Stand Out

1. **Production-Ready Code**
   - TypeScript for type safety
   - Proper error handling
   - Memory leak prevention
   - Performance optimizations

2. **Professional UI/UX**
   - Modern design system
   - Smooth animations
   - Loading states
   - User feedback

3. **Mobile-First Approach**
   - Responsive design
   - Touch optimized
   - Fast loading
   - No layout shift

4. **Accessibility**
   - WCAG compliant
   - Keyboard navigation
   - Screen reader support
   - Focus management

5. **Best Practices**
   - Clean code structure
   - Component reusability
   - Semantic HTML

---

**Built with ❤️ for Inekas- Interview Assignment 2025**

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel --prod
```

---

**⚡ Ready to impress!** This application demonstrates modern web development practices, clean code, and professional user experience design.