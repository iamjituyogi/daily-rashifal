'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StarCloudAnimation() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random stars
    const starArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
    }));
    setStars(starArray);
  }, []);

  const clouds = Array.from({ length: 6 }, (_, i) => i);

  const cloudPaths = [
    "M50,50 Q30,30 20,40 T10,50 Q10,60 20,60 T30,70 Q40,80 50,70 T70,60 Q80,50 70,40 T60,30 Q50,20 40,30 T30,40 Q20,50 30,50 Z",
    "M40,45 Q25,25 15,35 T5,45 Q5,55 15,55 T25,65 Q35,75 45,65 T65,55 Q75,45 65,35 T55,25 Q45,15 35,25 T25,35 Q15,45 25,45 Z",
    "M60,55 Q45,35 35,45 T25,55 Q25,65 35,65 T45,75 Q55,85 65,75 T85,65 Q95,55 85,45 T75,35 Q65,25 55,35 T45,45 Q35,55 45,55 Z",
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px white`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Clouds */}
      {clouds.map((cloud, index) => {
        const pathIndex = index % cloudPaths.length;
        const size = 150 + (index % 3) * 50;
        const speed = 40 + index * 5;
        const startY = 10 + (index % 4) * 22;
        
        return (
          <motion.div
            key={`cloud-${index}`}
            className="absolute opacity-20"
            initial={{
              x: index % 2 === 0 ? '-20%' : '120%',
              y: `${startY}%`,
            }}
            animate={{
              x: index % 2 === 0 ? '120%' : '-20%',
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg
              width={size}
              height={size * 0.6}
              viewBox="0 0 200 100"
              className="text-white"
            >
              <path
                d={cloudPaths[pathIndex]}
                fill="currentColor"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
