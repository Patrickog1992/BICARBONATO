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

const MeteorsAnimation = () => {
    const [stars, setStars] = useState<React.ReactNode[]>([]);
    const [meteors, setMeteors] = useState<React.ReactNode[]>([]);

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
        
        const createMeteor = (i: number) => {
            return <div key={`meteor-${i}`} className="meteor" style={{
                top: `${Math.random() * 40 - 20}%`,
                left: `-${Math.random() * 20}%`,
                animationDuration: `${Math.random() * 1 + 2}s`,
                animationDelay: `${Math.random() * 8}s`,
            }} />
        }
        const initialMeteors = Array.from({length: 10}).map((_, i) => createMeteor(i));
        setMeteors(initialMeteors);

    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {stars}
            {meteors}
        </div>
    );
};

const AuroraAnimation = () => {
    return (
        <div className="aurora">
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
        </div>
    );
};

const Emoji = ({ style, emoji }: { style: React.CSSProperties; emoji: string }) => (
  <div className="falling-emoji" style={style}>
    {emoji}
  </div>
);

const EmojisAnimation = ({ emojis }: { emojis?: string }) => {
  const [fallingEmojis, setFallingEmojis] = useState<React.ReactNode[]>([]);
  
  const emojiArray = emojis && emojis.trim() !== '' ? Array.from(emojis.replace(/\s/g, '')) : ['❤️', '✨', '🎉'];

  useEffect(() => {
    const createEmoji = () => {
      const size = Math.random() * 1.5 + 1;
      const selectedEmoji = emojiArray[Math.floor(Math.random() * emojiArray.length)];
      const newEmoji = {
        id: Date.now() + Math.random(),
        style: {
          left: `${Math.random() * 100}%`,
          fontSize: `${size}rem`,
          animationDuration: `${Math.random() * 5 + 7}s`,
          animationDelay: `${Math.random() * 7}s`,
        },
        emoji: selectedEmoji,
      };
      return <Emoji key={newEmoji.id} style={newEmoji.style} emoji={newEmoji.emoji} />;
    };
    
    const initialEmojis = Array.from({ length: 30 }).map(createEmoji);
    setFallingEmojis(initialEmojis);

    const interval = setInterval(() => {
      setFallingEmojis(prev => [...prev, createEmoji()]);
    }, 800);

    const cleanupInterval = setInterval(() => {
      setFallingEmojis(prev => prev.slice(-60));
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, [JSON.stringify(emojiArray)]);

  return <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">{fallingEmojis}</div>;
};


interface AnimationBackgroundProps {
    animation: string | undefined;
    children: React.ReactNode;
    emojis?: string;
}

export default function AnimationBackground({ animation, children, emojis }: AnimationBackgroundProps) {
    const renderAnimation = () => {
        switch(animation) {
            case 'hearts':
                return <HeartsAnimation />;
            case 'comets':
                return <CometsAnimation />;
            case 'meteors':
                return <MeteorsAnimation />;
            case 'aurora':
                return <AuroraAnimation />;
            case 'emojis':
                return <EmojisAnimation emojis={emojis} />;
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
