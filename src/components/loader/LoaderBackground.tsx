"use client";

import { useEffect, useRef } from "react";

export function LoaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 60;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.25 + 0.05,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      targetAlpha: Math.random() * 0.25 + 0.05,
      alphaSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let lightX = 0;
    let lightDir = 1;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lightX += lightDir * 0.3;
      if (lightX > canvas.width * 1.2) lightDir = -1;
      if (lightX < -canvas.width * 0.2) lightDir = 1;

      const ambientGrad = ctx.createRadialGradient(lightX, canvas.height * 0.45, 0, lightX, canvas.height * 0.45, canvas.width * 0.55);
      ambientGrad.addColorStop(0, "rgba(31,74,56,0.03)");
      ambientGrad.addColorStop(1, "rgba(31,74,56,0)");
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Soft framing vignette — light theme, so this darkens the edges only slightly
      const vig = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.height * 0.15, canvas.width / 2, canvas.height / 2, canvas.width * 0.85);
      vig.addColorStop(0, "rgba(23,23,18,0)");
      vig.addColorStop(1, "rgba(23,23,18,0.05)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;
        if (p.alpha >= p.targetAlpha || p.alpha <= 0.03) {
          p.alphaSpeed *= -1;
          p.targetAlpha = Math.random() * 0.25 + 0.05;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(169,119,60,${p.alpha.toFixed(3)})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}