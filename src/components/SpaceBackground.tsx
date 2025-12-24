import React, { useRef, useEffect } from 'react';

interface SpaceBackgroundProps {
  starCount?: number;
  speed?: number; // This now controls the maximum drift speed
  backgroundColor?: string;
  starColor?: string;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({
  starCount = 200,
  speed = 0.5,
  backgroundColor = 'black',
  starColor = 'white',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    // Changed 'speed' to 'vx' and 'vy' to handle 2D movement
    let stars: Array<{ x: number; y: number; radius: number; vx: number; vy: number }> = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          // Random velocity between -speed and +speed
          vx: (Math.random() - 0.5) * 2 * speed,
          vy: (Math.random() - 0.5) * 2 * speed,
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = starColor;
      
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position based on velocity vectors
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around logic (Infinite space effect)
        
        // 1. If it goes off the right, move to left
        if (star.x > canvas.width) {
          star.x = 0;
        } 
        // 2. If it goes off the left, move to right
        else if (star.x < 0) {
          star.x = canvas.width;
        }

        // 3. If it goes off the bottom, move to top
        if (star.y > canvas.height) {
          star.y = 0;
        } 
        // 4. If it goes off the top, move to bottom
        else if (star.y < 0) {
          star.y = canvas.height;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    handleResize();
    draw();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, speed, backgroundColor, starColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default SpaceBackground;