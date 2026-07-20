import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Filter, Grid3X3, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Image {
  id: number;
  url: string;
  title: string;
  category: string;
  description: string;
}

const categories = ['All', 'Nature', 'Architecture', 'Technology', 'People'];

const sampleImages: Image[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Mountain Peak', category: 'Nature', description: 'Majestic mountain peaks at sunset' },
  { id: 2, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', title: 'City Skyline', category: 'Architecture', description: 'Modern city architecture' },
  { id: 3, url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', title: 'Tech Chip', category: 'Technology', description: 'Close-up of computer processor' },
  { id: 4, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Portrait', category: 'People', description: 'Natural portrait photography' },
  { id: 5, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', title: 'Forest Path', category: 'Nature', description: 'Serene forest pathway' },
  { id: 6, url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800', title: 'Modern Building', category: 'Architecture', description: 'Contemporary architectural design' },
  { id: 7, url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800', title: 'Coding Setup', category: 'Technology', description: 'Developer workspace' },
  { id: 8, url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800', title: 'Smiling Face', category: 'People', description: 'Genuine smile capture' },
  { id: 9, url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800', title: 'Waterfall', category: 'Nature', description: 'Cascading waterfall' },
  { id: 10, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', title: 'Office Space', category: 'Architecture', description: 'Modern office interior' },
  { id: 11, url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', title: 'Cyber Security', category: 'Technology', description: 'Digital security concept' },
  { id: 12, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800', title: 'Fashion Model', category: 'People', description: 'Fashion photography' },
];

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? sampleImages 
    : sampleImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Image Gallery
          </h1>
          <p className="text-gray-300 text-lg">Explore our curated collection of stunning images</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <Filter className="w-5 h-5 text-purple-400 mr-2 self-center" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                  hoveredImage === image.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-purple-400 text-xs font-semibold uppercase tracking-wider">
                      {image.category}
                    </span>
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{image.description}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Image Count */}
        <div className="text-center mt-8 text-gray-400">
          <Grid3X3 className="w-5 h-5 inline mr-2" />
          Showing {filteredImages.length} images
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 z-10 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 z-10 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[currentImageIndex].url}
                alt={filteredImages[currentImageIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
                  {filteredImages[currentImageIndex].category}
                </span>
                <h3 className="text-white font-bold text-2xl mt-1">
                  {filteredImages[currentImageIndex].title}
                </h3>
                <p className="text-gray-400 mt-1">
                  {filteredImages[currentImageIndex].description}
                </p>
                <p className="text-gray-500 text-sm mt-3">
                  {currentImageIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}