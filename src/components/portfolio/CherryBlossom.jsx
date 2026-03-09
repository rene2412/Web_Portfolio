import React, { useEffect, useRef } from 'react';

const PETAL_COUNT = 38;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createPetal() {
  return {
    x: randomBetween(5, 95),
    y: randomBetween(-20, -5),
    size: randomBetween(5, 11),
    speedY: randomBetween(0.3, 0.9),
    speedX: randomBetween(-0.3, 0.3),
    rotation: randomBetween(0, 360),
    rotationSpeed: randomBetween(-1.5, 1.5),
    opacity: randomBetween(0.5, 0.95),
    sway: randomBetween(0.3, 0.8),
    swayOffset: randomBetween(0, Math.PI * 2),
    swaySpeed: randomBetween(0.01, 0.025),
  };
}

export default function CherryBlossom() {
  const canvasRef = useRef(null);
  const petalsRef = useRef(Array.from({ length: PETAL_COUNT }, createPetal));
  const frameRef = useRef(null);
  const tickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate((p.x / 100) * canvas.width, (p.y / 100) * canvas.height);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      // Petal shape - elongated oval leaf
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.3, p.size * 0.7, 0, 0, Math.PI * 2);

      // Gradient fill
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, 'rgba(255, 220, 230, 1)');
      grad.addColorStop(0.5, 'rgba(255, 170, 195, 0.9)');
      grad.addColorStop(1, 'rgba(220, 120, 160, 0.6)');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tickRef.current += 1;

      petalsRef.current = petalsRef.current.map((p) => {
        const sway = Math.sin(tickRef.current * p.swaySpeed + p.swayOffset) * p.sway;
        const newX = p.x + p.speedX + sway;
        const newY = p.y + p.speedY;
        const newRot = p.rotation + p.rotationSpeed;

        drawPetal({ ...p, x: newX, y: newY, rotation: newRot });

        if (newY > 110) {
          return { ...createPetal(), x: randomBetween(5, 95), y: randomBetween(-10, 0) };
        }
        return { ...p, x: newX, y: newY, rotation: newRot };
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}