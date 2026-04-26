"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { categories, galleryImages } from "@/lib/data";
import { Search, X } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 mt-4 md:mt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 relative inline-block"
          >
            Our Gallery
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-accent rounded-full opacity-50" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-12"
          >
            Explore our intricate and elegant Mehndi designs, crafted with passion and precision. Click any image to view in detail.
          </motion.p>

          {/* Filter Badges - Horizontally Scrollable on Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap md:justify-center gap-3 md:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0"
          >
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 cursor-pointer px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 relative overflow-hidden ${
                  activeCategory === category 
                    ? "text-primary-foreground shadow-lg transform scale-105 border-transparent" 
                    : "bg-background border border-accent/30 text-foreground hover:bg-accent/10 hover:border-accent hover:shadow-md shadow-sm"
                }`}
              >
                {activeCategory === category && (
                  <motion.div 
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-primary z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className="break-inside-avoid relative"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group overflow-hidden rounded-xl md:rounded-2xl cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 w-full mb-4 sm:mb-6">
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 block"
                        loading="lazy"
                      />
                      {/* Luxury Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 backdrop-blur-[2px]">
                        <div className="bg-background/90 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                        </div>
                        <span className="text-white font-medium text-xs sm:text-sm md:text-base mt-4 tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          {img.category}
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>

                  {/* Lightbox Content */}
                  <DialogContent 
                    showCloseButton={false} 
                    className="max-w-[95vw] sm:max-w-[95vw] w-fit h-fit p-0 m-0 bg-transparent border-none ring-0 shadow-none flex justify-center items-center"
                  >
                    <DialogTitle className="sr-only">{img.alt}</DialogTitle>
                    
                    {/* Custom Close Button */}
                    <DialogClose className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] p-2 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all outline-none focus:ring-2 focus:ring-accent flex items-center justify-center border border-white/10 shadow-md cursor-pointer">
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="sr-only">Close</span>
                    </DialogClose>

                    <img 
                      src={img.src} 
                      alt={img.alt}
                      className="max-w-[95vw] max-h-[85vh] w-auto h-auto object-contain rounded-md shadow-2xl"
                    />
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-20 text-muted-foreground font-medium"
          >
            No elegant designs found in this category yet.
          </motion.div>
        )}
      </div>
    </div>
  );
}
