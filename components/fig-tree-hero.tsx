'use client'

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { Circle, Cpu, Code, Server, Database, Cloud, Lock, Zap } from 'lucide-react';

const FigTreeHero = () => {
  const [showElements, setShowElements] = useState(false);
  const [activePoint, setActivePoint] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Add new state variables
  const [perspective, setPerspective] = useState(1000);
  const [waveAmplitude, setWaveAmplitude] = useState(1);

  // Add spring physics constants
  const SPRING_CONFIG = {
    stiffness: 0.1,
    damping: 0.8,
    mass: 1
  };

  // Enhanced animation state
  const [springVelocity, setSpringVelocity] = useState({ x: 0, y: 0, z: 0 });
  
  // Professional color scheme
  const COLORS = {
    primary: 'hsl(230, 60%, 50%)',
    secondary: 'hsl(280, 60%, 50%)',
    accent: 'hsl(330, 60%, 50%)',
    background: 'hsl(230, 20%, 10%)'
  };

  // Physics configuration
  const SPRING = {
    tension: 0.1,
    friction: 0.8,
    mass: 1
  };

  // Performance optimization
  const debouncedMouseMove = useMemo(
    () => debounce((e: React.MouseEvent<HTMLDivElement>) => handleMouseMove(e), 5),
    []
  );

  // Enhanced animation frame
  const animate = useCallback(() => {
    const deltaTime = 1 / 60;
    const force = {
      x: (mousePosition.x - activePoint.x) * SPRING.tension,
      y: (mousePosition.y - activePoint.y) * SPRING.tension
    };

    setSpringVelocity(prev => ({
      x: (prev.x + force.x) / SPRING.mass * (1 - SPRING.friction),
      y: (prev.y + force.y) / SPRING.mass * (1 - SPRING.friction),
      z: Math.sin(time * 2) * 2
    }));

    setTime(t => t + deltaTime);
    rafRef.current = requestAnimationFrame(animate);
  }, [mousePosition, activePoint, time]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  useEffect(() => {
    setShowElements(true);
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      setScrollProgress(Math.min(scrolled / maxScroll, 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActivePoint({
          x: Math.floor(Math.random() * 12),
          y: Math.floor(Math.random() * 12)
        });
      }, 3000); // Slower interval for smoother effect
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  // Enhanced mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 12;
    const y = ((e.clientY - rect.top) / rect.height) * 12;
    
    // Smooth mouse following
    setMousePosition((prev) => ({
      x: prev.x + (x - prev.x) * 0.1,
      y: prev.y + (y - prev.y) * 0.1
    }));
    
    // Dynamic perspective based on mouse position
    setPerspective(1000 + (x - 6) * 50);
  }, []);

  // Calculate grid points with enhanced wave effect
  const gridPoints = useMemo(() => {
    return Array.from({ length: 144 }, (_, i) => {
      const x = i % 12;
      const y = Math.floor(i / 12);
      const distanceFromMouse = Math.sqrt(
        Math.pow(x - mousePosition.x, 2) + 
        Math.pow(y - mousePosition.y, 2)
      );
      
      const z = Math.sin((x / 11) * Math.PI + time) * 
                Math.cos((y / 11) * Math.PI + time) * 
                waveAmplitude +
                Math.exp(-distanceFromMouse * 0.3) * 2;
      
      const hue = ((z + 3) * 30 + time * 10) % 360;
      return { x, y, z, hue };
    });
  }, [time, mousePosition, waveAmplitude]);

  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  const iconElements = [
    { Icon: Cpu, color: '#60A5FA', delay: 0 },
    { Icon: Code, color: '#34D399', delay: 200 },
    { Icon: Server, color: '#F472B6', delay: 400 },
    { Icon: Database, color: '#A78BFA', delay: 600 },
    { Icon: Cloud, color: '#60A5FA', delay: 800 },
    { Icon: Lock, color: '#34D399', delay: 1000 },
    { Icon: Zap, color: '#F472B6', delay: 1200 }
  ];

  // Enhanced style configuration
  const styles = {
    container: {
      perspective: '2000px',
      transformStyle: 'preserve-3d',
      backgroundImage: `
        radial-gradient(
          circle at 50% 50%,
          ${COLORS.background},
          transparent
        )
      `
    },
    grid: {
      transform: `
        rotateX(${springVelocity.x * 5}deg)
        rotateY(${springVelocity.y * 5}deg)
        translateZ(${springVelocity.z * 10}px)
      `,
      transition: 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden perspective-1000"
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 opacity-40"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          transform: `rotateX(${scrollProgress * 10}deg) rotateY(${scrollProgress * 10}deg)`
        }}
      >
        <div className="relative w-full h-full">
          {gridPoints.map((point, i) => {
            const distance = getDistance(point.x, point.y, activePoint.x, activePoint.y);
            const scale = Math.max(0.1, 1 - distance * 0.1);
            const opacity = Math.max(0.2, 1 - distance * 0.1);
            const hue = ((distance * 30 + point.z * 20) % 360 + 360) % 360;
            
            const zOffset = point.z * (20 + scrollProgress * 20);
            
            return (
              <div
                key={i}
                className="absolute w-2 h-2 transition-all duration-700 ease-out"
                style={{
                  left: `${(point.x / 11) * 100}%`,
                  top: `${(point.y / 11) * 100}%`,
                  transform: `translate3d(0, 0, ${zOffset}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(point.z * 100)
                }}
              >
                <Circle
                  size={8}
                  className="transition-colors duration-700"
                  style={{
                    color: `hsl(${hue}, 70%, 60%)`,
                    filter: `blur(${Math.max(0, -point.z)}px)`
                  }}
                  fill="currentColor"
                />
              </div>
            );
          })}

          {/* Enhanced Connecting Lines with Depth */}
          {gridPoints.map((point, i) => {
            if (point.x < 11) {
              const nextPoint = gridPoints[i + 1];
              const distance = getDistance(point.x, point.y, activePoint.x, activePoint.y);
              const hue = ((distance * 30 + point.z * 20) % 360 + 360) % 360;
              const zOffset = (point.z + nextPoint.z) / 2 * (20 + scrollProgress * 20);
              
              return (
                <div
                  key={`h-${i}`}
                  className="absolute h-px transition-all duration-700"
                  style={{
                    left: `${(point.x / 11) * 100}%`,
                    top: `${(point.y / 11) * 100}%`,
                    width: `${100 / 11}%`,
                    opacity: Math.max(0.1, 0.3 - distance * 0.05),
                    background: `linear-gradient(to right, 
                      hsl(${hue}, 70%, 60%), 
                      hsl(${(hue + 30) % 360}, 70%, 60%)
                    )`,
                    transform: `translate3d(0, 0, ${zOffset}px)`,
                    filter: `blur(${Math.max(0, -point.z)}px)`
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Enhanced Floating Particles with 3D Effect */}
      {/* {[...Array(40)].map((_, i) => {
        const depth = Math.random() * 200 - 100;
        return (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              opacity: Math.random() * 0.5 + 0.2,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              transform: `translate3d(0, 0, ${depth}px)`,
              animation: `
                float-particle ${20 + Math.random() * 40}s infinite linear,
                pulse ${2 + Math.random() * 2}s infinite ease-in-out,
                sway ${5 + Math.random() * 5}s infinite ease-in-out
              `,
              animationDelay: `-${Math.random() * 20}s`,
              filter: `blur(${Math.max(0, -depth/50)}px)`
            }}
          />
        );
      })} */}

      {/* Floating Tech Icons with 3D Effect */}
      {iconElements.map(({ Icon, color, delay }, index) => (
        <div
          key={`icon-${index}`}
          className="absolute transition-all duration-1000 hover:scale-110"
          style={{
            left: `${50 + ((index - (iconElements.length - 1) / 2) * 10)}%`,
            top: '20%',
            transform: `translate3d(
              ${Math.sin(time + index) * 30}px, 
              ${Math.cos(time + index) * 30}px, 
              ${50 + Math.sin(time * 0.5 + index) * 30}px
            )`,
            animation: 'float-icon 10s infinite ease-in-out',
            animationDelay: `${delay}ms`,
          }}
        >
          <Icon 
            size={40} 
            style={{ 
              color,
              filter: 'drop-shadow(0 0 10px currentColor)',
              transition: 'transform 0.3s ease-out',
            }} 
          />
        </div>
      ))}

      {/* Content Overlay with Enhanced Typography and Effects */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div 
          className={`text-center transform transition-all duration-1000 ${
            showElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{
            transform: `translate3d(0, ${scrollProgress * -50}px, ${scrollProgress * 100}px)`
          }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Fig Tree Labs
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 via-purple-800/20 to-pink-700/20 blur-xl -z-10" />
          </h1>
          
          <p className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 mb-8 font-semibold">
            Digital Innovation Reimagined
          </p>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Building tomorrow's solutions with cutting-edge technology and 
            innovative thinking.
          </p>
          
          {/* <button className="group relative px-8 py-3 overflow-hidden rounded-lg bg-transparent border-2 border-white/30 transition-all duration-300">
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out group-hover:w-full" />
            <span className="relative text-lg font-semibold text-white group-hover:text-white">
              Explore Our Work
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-pink-500/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
          </button> */}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .point {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          will-change: transform;
          filter: blur(1px);
        }

        .container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        @keyframes float-particle {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          100% { transform: translate3d(100vw, -100vh, 50px) rotate(360deg); }
        }
        @keyframes float-icon {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotateY(0);
            filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2));
          }
          50% {
            transform: translate3d(0, -20px, 40px) rotateY(180deg);
            filter: drop-shadow(0 20px 25px rgba(0, 0, 0, 0.3));
          }
        }

        .point {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform, opacity;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .magnetic-hover {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -20px, 40px); }
        }

        .point:hover {
          transform: scale(2) translateZ(50px);
          z-index: 10;
          filter: brightness(1.5) drop-shadow(0 0 10px currentColor);
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale3d(1, 1, 1);
            opacity: 0.4;
            filter: blur(0px);
          }
          50% { 
            transform: scale3d(1.5, 1.5, 1.5);
            opacity: 0.8;
            filter: blur(1px);
          }
        }
        .point {
          transition: all 0.3s ease-out;
          will-change: transform;
        }

        .point:hover {
          transform: scale(1.5);
          z-index: 10;
        }
        @keyframes sway {
          0%, 100% { transform: translate3d(-20px, -20px, 0); }
          50% { transform: translate3d(20px, 20px, 30px); }
        }
      `}</style>
    </div>
  );
};

export default FigTreeHero;

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
