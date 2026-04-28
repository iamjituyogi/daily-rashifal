'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  location: string;
  text: string;
  avatar: string;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  const topTestimonials = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const bottomTestimonials = testimonials.slice(Math.ceil(testimonials.length / 2));

  const topSlides = Math.ceil(topTestimonials.length / 3);
  const bottomSlides = Math.ceil(bottomTestimonials.length / 3);

  useEffect(() => {
    const topInterval = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % topSlides);
    }, 4000);

    const bottomInterval = setInterval(() => {
      setBottomIndex((prev) => (prev - 1 + bottomSlides) % bottomSlides);
    }, 4000);

    return () => {
      clearInterval(topInterval);
      clearInterval(bottomInterval);
    };
  }, [topSlides, bottomSlides]);

  const getTopSlice = () => {
    const start = topIndex * 3;
    return topTestimonials.slice(start, start + 3);
  };

  const getBottomSlice = () => {
    const start = bottomIndex * 3;
    return bottomTestimonials.slice(start, start + 3);
  };

  return (
    <div className="space-y-6">
      {/* Top Row - Left to Right */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={topIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {getTopSlice().map((testimonial, idx) => (
              <div
                key={`top-${topIndex}-${idx}`}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                  <div className="text-4xl text-gray-300 leading-none">"</div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Row - Right to Left */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={bottomIndex}
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {getBottomSlice().map((testimonial, idx) => (
              <div
                key={`bottom-${bottomIndex}-${idx}`}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                  <div className="text-4xl text-gray-300 leading-none">"</div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
