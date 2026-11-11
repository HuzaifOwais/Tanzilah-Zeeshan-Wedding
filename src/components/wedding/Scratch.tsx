import { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";

const HEART =
  "M50 88 C20 66 4 50 4 30 C4 15 16 5 29 5 C38 5 45 10 50 18 C55 10 62 5 71 5 C84 5 96 15 96 30 C96 50 80 66 50 88Z";

export function fireCelebratoryConfetti() {
  if (typeof window === "undefined") return;

  // Realistic metallic and celebratory jewel-tone colors
  const metallicColors = [
    "#FFD700", // Metallic Gold
    "#D4AF37", // Royal Gold
    "#FFF2A8", // Bright Gold Sparkle
    "#E6C687", // Champagne Gold
    "#C0C0C0", // Metallic Silver
    "#B76E79", // Rose Gold
    "#E0115F", // Ruby
    "#00CED1", // Turquoise
    "#4169E1", // Royal Sapphire
    "#2E8B57", // Emerald
    "#FF69B4", // Shimmer Pink
    "#FFA500", // Warm Amber
  ];

  // 1. Initial wide celebratory blast from top center downwards
  confetti({
    particleCount: 120,
    angle: 270, // Burst downwards into the screen
    spread: 160, // Spread widely across the viewport
    origin: { x: 0.5, y: -0.03 }, // Top edge of the screen
    startVelocity: 42,
    gravity: 1.15,
    ticks: 360,
    decay: 0.94,
    colors: metallicColors,
    shapes: ["square", "circle"],
    scalar: 1.2,
  });

  // 2. Outward left-top cascade
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 285,
      spread: 130,
      origin: { x: 0.22, y: -0.03 },
      startVelocity: 38,
      gravity: 1.1,
      ticks: 380,
      decay: 0.94,
      colors: metallicColors,
      shapes: ["square", "circle"],
      scalar: 1.15,
    });
  }, 140);

  // 3. Outward right-top cascade
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 255,
      spread: 130,
      origin: { x: 0.78, y: -0.03 },
      startVelocity: 38,
      gravity: 1.1,
      ticks: 380,
      decay: 0.94,
      colors: metallicColors,
      shapes: ["square", "circle"],
      scalar: 1.15,
    });
  }, 280);

  // 4. Shimmering metallic gold rain flutter
  setTimeout(() => {
    confetti({
      particleCount: 95,
      angle: 270,
      spread: 180,
      origin: { x: 0.5, y: -0.02 },
      startVelocity: 32,
      gravity: 1.0,
      ticks: 400,
      decay: 0.95,
      colors: ["#FFD700", "#D4AF37", "#FFE58F", "#FFF8DC", "#C0C0C0", "#E6C687", "#FFFFFF"],
      shapes: ["square", "circle"],
      scalar: 1.25,
    });
  }, 480);
}

// Helper to draw specular 4-point sparkle stars on canvas
function drawSparkleStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
    ctx.lineTo(cx + Math.cos(angle + Math.PI / 4) * (r * 0.25), cy + Math.sin(angle + Math.PI / 4) * (r * 0.25));
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function Scratch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const strokeMoves = useRef(0);
  const revealedRef = useRef(false);

  const triggerReveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setDone(true);
    fireCelebratoryConfetti();
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const size = c.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    c.width = size * dpr;
    c.height = size * dpr;
    ctx.scale(dpr, dpr);

    // 1. Base Rich Metallic Gold Gradient
    const g = ctx.createLinearGradient(0, 0, size, size);
    g.addColorStop(0, "#9A7B38");
    g.addColorStop(0.18, "#E6C687");
    g.addColorStop(0.35, "#FFF5D1");
    g.addColorStop(0.5, "#D4AF37");
    g.addColorStop(0.68, "#B38728");
    g.addColorStop(0.85, "#FDF3BD");
    g.addColorStop(1, "#8A6216");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    // 2. Sparkling Gold Micro-Glitter Texture (750+ particles)
    const glitterColors = [
      "rgba(255, 255, 255, 0.85)",
      "rgba(255, 248, 220, 0.9)",
      "rgba(255, 235, 130, 0.85)",
      "rgba(255, 215, 0, 0.75)",
      "rgba(212, 175, 55, 0.8)",
      "rgba(245, 222, 179, 0.7)",
      "rgba(255, 255, 255, 0.95)",
    ];

    for (let i = 0; i < 750; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 1.5 + 0.4;
      ctx.fillStyle = glitterColors[i % glitterColors.length];
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Specular 4-Point Sparkle Twinkles
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    const sparkles = [
      [size * 0.28, size * 0.28, 5],
      [size * 0.72, size * 0.28, 5],
      [size * 0.5, size * 0.2, 4],
      [size * 0.38, size * 0.42, 6],
      [size * 0.62, size * 0.42, 6],
      [size * 0.22, size * 0.4, 4],
      [size * 0.78, size * 0.4, 4],
      [size * 0.5, size * 0.65, 5],
      [size * 0.42, size * 0.72, 4],
      [size * 0.58, size * 0.72, 4],
    ];
    sparkles.forEach(([x, y, r]) => drawSparkleStar(ctx, x, y, r));

    // 4. Elegant Scratchable Typography & Decorative Star
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 4;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `600 ${size * 0.05}px "Cinzel", "Cormorant Garamond", serif`;
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.2em";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", size / 2, size * 0.44);

    ctx.font = `italic ${size * 0.042}px "Cormorant Garamond", serif`;
    ctx.fillStyle = "rgba(255, 250, 235, 0.95)";
    ctx.fillText("Swipe gently across", size / 2, size * 0.52);

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  }, []);

  // Check if scratched halfway through
  const checkScratchRatio = useCallback(() => {
    if (revealedRef.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    try {
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let clear = 0;
      let sampled = 0;
      // Sample step of 32 for smooth high-performance calculation
      for (let i = 3; i < data.length; i += 32) {
        sampled++;
        if (data[i] === 0) clear++;
      }
      const clearRatio = clear / sampled;
      // Heart covers ~55% of the square canvas.
      // 14% cleared canvas represents > 30% of the heart scratched (halfway / 2-3 swipes)
      if (clearRatio > 0.14) {
        triggerReveal();
      }
    } catch {
      // In case of any context error, fallback to stroke count
      if (strokeMoves.current > 16) {
        triggerReveal();
      }
    }
  }, [triggerReveal]);

  const scratchAt = (x: number, y: number) => {
    if (revealedRef.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const r = c.getBoundingClientRect();
    const brushRadius = r.width * 0.11; // Generous brush for smooth scratching

    ctx.globalCompositeOperation = "destination-out";

    // Interpolate line if dragging smoothly
    if (lastPoint.current) {
      ctx.beginPath();
      ctx.lineWidth = brushRadius * 2;
      ctx.lineCap = "round";
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();

    lastPoint.current = { x, y };
    strokeMoves.current++;

    // Check periodically during drag every 4 moves or if enough swipes made
    if (strokeMoves.current % 4 === 0) {
      checkScratchRatio();
    }
    // Auto-reveal if user has swiped back and forth 2-3 times
    if (strokeMoves.current >= 18) {
      triggerReveal();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (revealedRef.current) return;
    drawing.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const r = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    lastPoint.current = { x, y };
    scratchAt(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drawing.current || revealedRef.current) return;
    const r = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    scratchAt(x, y);
  };

  const handlePointerUp = () => {
    drawing.current = false;
    lastPoint.current = null;
    checkScratchRatio();
  };

  return (
    <div className="relative mx-auto aspect-square w-72 max-w-[calc(100vw-3rem)] sm:w-80 transition-transform duration-300 hover:scale-[1.01]">
      {/* SVG Clip Path for Heart */}
      <svg width="0" height="0" className="absolute">
        <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
          <path d={HEART} transform="scale(0.01)" />
        </clipPath>
      </svg>

      {/* Decorative Outer Heart Glow */}
      <div
        className="pointer-events-none absolute -inset-2 opacity-50 blur-md transition-opacity duration-700 bg-gradient-to-r from-gold-deep/20 via-champagne/40 to-gold-deep/20"
        style={{ clipPath: "url(#heart-clip)" }}
      />

      {/* REVEALED CONTENT (Inside Heart, revealed upon scratching) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-ivory px-8 pt-4 pb-2 text-center select-none shadow-inner"
        style={{ clipPath: "url(#heart-clip)" }}
      >
        <p className="font-display text-[9px] min-[380px]:text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-gold-deep uppercase font-medium max-w-[80%]">
          Save The Auspicious Date
        </p>

        {/* Revealed Date as requested (NO bride/groom names) */}
        <p className="mt-2 font-playfair text-2xl min-[380px]:text-3xl sm:text-4xl font-bold tracking-tight text-gold-deep drop-shadow-sm">
          24th December 2026
        </p>

        <div className="my-2 h-[1px] w-16 bg-gradient-to-r from-transparent via-champagne to-transparent" />

        <p className="font-serif text-sm min-[380px]:text-base sm:text-lg italic text-ink/90 font-medium tracking-wide">
          Thursday
        </p>
      </div>

      {/* SPARKLING GOLD SCRATCH CANVAS (Vanishes smoothly on halfway scratch) */}
      <canvas
        ref={canvasRef}
        aria-label="Scratch the sparkling golden heart to reveal the date"
        className={`absolute inset-0 h-full w-full touch-none transition-all duration-700 ease-out ${
          done ? "pointer-events-none scale-105 opacity-0 filter blur-[1px]" : "cursor-pointer opacity-100"
        }`}
        style={{ clipPath: "url(#heart-clip)" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  );
}
