'use client';

import React, { useEffect, useState } from 'react';

const Heart = ({ style }: { style: React.CSSProperties }) => (
  <div className="heart" style={style}></div>
);

const HeartsAnimation = () => {
  const [hearts, setHearts] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const size = Math.random() * 1.5 + 0.5; // size between 0.5vw and 2vw
      const newHeart = {
        id: Date.now() + Math.random(),
        style: {
          left: `${Math.random() * 100}%`,
          width: `${size}vw`,
          height: `${size}vw`,
          animationDuration: `${Math.random() * 5 + 5}s`, // 5s to 10s
          animationDelay: `${Math.random() * 5}s`,
        },
      };
      return <Heart key={newHeart.id} style={newHeart.style} />;
    };
    
    const initialHearts = Array.from({ length: 20 }).map(createHeart);
    setHearts(initialHearts);

    const interval = setInterval(() => {
      setHearts(prev => [...prev, createHeart()]);
    }, 1000);

    const cleanupInterval = setInterval(() => {
      setHearts(prev => prev.slice(-50)); // Keep only last 50 hearts
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, []);

  return <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">{hearts}</div>;
};

const CometsAnimation = () => {
    const [stars, setStars] = useState<React.ReactNode[]>([]);
    const [comets, setComets] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const createStar = (i: number) => {
            const size = Math.random() * 2 + 1;
            return <div key={`star-${i}`} className="star" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
            }} />
        };
        const initialStars = Array.from({ length: 150 }).map((_, i) => createStar(i));
        setStars(initialStars);
        
        const createComet = (i: number) => {
            return <div key={`comet-${i}`} className="comet" style={{
                top: `${Math.random() * 60}%`, // Start in the top 60%
                left: `-${Math.random() * 20}%`, // Start off-screen to the left
                animationDuration: `${Math.random() * 5 + 8}s`,
                animationDelay: `${Math.random() * 15}s`,
            }} />
        }
        const initialComets = Array.from({length: 7}).map((_, i) => createComet(i));
        setComets(initialComets);

    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {stars}
            {comets}
        </div>
    );
};


interface AnimationBackgroundProps {
    animation: string | undefined;
    children: React.ReactNode;
}

export default function AnimationBackground({ animation, children }: AnimationBackgroundProps) {
    const renderAnimation = () => {
        switch(animation) {
            case 'hearts':
                return <HeartsAnimation />;
            case 'comets':
                return <CometsAnimation />;
            case 'meteors':
            case 'aurora':
            case 'vortex':
            case 'clouds':
            case 'emojis':
                return null;
            default:
                return null;
        }
    }

    return (
        <div className="relative w-full h-full">
            {renderAnimation()}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}
