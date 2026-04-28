'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { StaticRashi } from '@/data/rashis';

interface RashiSliderProps {
  rashis: StaticRashi[];
}

export default function RashiSlider({ rashis }: RashiSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(rashis.length / 3));
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, [rashis.length]);

  // Group rashis into sets of 3
  const getVisibleRashis = () => {
    const start = currentIndex * 3;
    return rashis.slice(start, start + 3);
  };

  const visibleRashis = getVisibleRashis();
  const totalSlides = Math.ceil(rashis.length / 3);

  return (
    <div className="relative overflow-hidden">
      <div className="relative">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {visibleRashis.map((rashi) => (
            <Link key={rashi.id} href={`/rashi/${rashi.id}`}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center cursor-pointer h-full">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4" style={{ borderColor: rashi.themeColor }}>
                  <Image
                    src={`/${rashi.icon}`}
                    alt={rashi.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: rashi.themeColor }}>
                  {rashi.name}
                </h3>
                {rashi.nameNepali && (
                  <p className="text-sm text-gray-600 mb-3">{rashi.nameNepali}</p>
                )}
                <p className="text-gray-600 text-sm line-clamp-2">
                  {rashi.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-green-600 w-8'
                : 'bg-gray-300 hover:bg-gray-400 w-3'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
