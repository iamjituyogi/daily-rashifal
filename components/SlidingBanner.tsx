'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    title: 'Welcome to RashiNow',
    subtitle: 'Discover Your Destiny Through Vedic Astrology',
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920&q=80',
    overlay: 'from-blue-900/80 to-indigo-900/80',
  },
  {
    id: 2,
    title: '12 Divine Rashis',
    subtitle: 'Explore the Mystical World of Zodiac Signs',
    image: 'https://images.unsplash.com/photo-1462331940025-496df0c73629?w=1920&q=80',
    overlay: 'from-blue-900/80 to-cyan-900/80',
  },
  {
    id: 3,
    title: 'Your Daily Guidance',
    subtitle: 'Get Personalized Predictions for Your Rashi',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&q=80',
    overlay: 'from-indigo-900/80 to-blue-900/80',
  },
];

export default function SlidingBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl mb-12">
      {banners.map((banner, index) => (
        <motion.div
          key={banner.id}
          className="absolute inset-0"
          initial={{ opacity: 0, x: index > currentIndex ? '100%' : '-100%' }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            x: index === currentIndex ? 0 : index > currentIndex ? '100%' : '-100%',
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="relative w-full h-full">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.overlay} flex items-center justify-center flex-col text-white`}>
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-4 text-center px-4 drop-shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {banner.title}
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-center px-4 drop-shadow-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {banner.subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
