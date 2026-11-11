import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/config/wedding";
import { CalligraphyNameReveal } from "./CalligraphyNameReveal";
import { useWeddingAudio } from "./AudioContext";

export function Opening({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [roomRevealed, setRoomRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const hasStartedReveal = useRef(false);
  const hasPlayedSparkle = useRef(false);
  const hasStartedMusic = useRef(false);
  const { startMusic, playTapSound, playSparkleSound } = useWeddingAudio();

  const finish = () => {
    if (leaving) return;
    if (!hasStartedMusic.current) {
      hasStartedMusic.current = true;
      startMusic();
    }
    setLeaving(true);
    setTimeout(onDone, 900);
  };

  const open = async () => {
    if (playing) return;
    playTapSound();
    setPlaying(true);
    const v = videoRef.current;
    if (!v) return finish();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      playSparkleSound();
      startMusic();
      setRoomRevealed(true);
      return;
    }

    try {
      v.currentTime = 0;
      await v.play();
    } catch {
      finish();
    }
  };

  const handleComplete = useCallback(() => {
    setIsCompleted(true);
    finish();
  }, []);


  // High-precision timeline monitor for opening sequence
  useEffect(() => {
    if (!playing) return;

    let animId: number;
    const checkTime = () => {
      const v = videoRef.current;
      if (v) {
        // 1. As the envelope flap flips open (~0.6s): play sparkling sound
        if (v.currentTime >= 0.6 && !hasPlayedSparkle.current) {
          hasPlayedSparkle.current = true;
          playSparkleSound();
        }

        // 2. Immediately after the envelope finishes opening (~1.8s): start the provided music!
        if (v.currentTime >= 1.8 && !hasStartedMusic.current) {
          hasStartedMusic.current = true;
          startMusic();
        }

        // 3. Curtains complete opening movement at 6.65s - wedding room scene starts!
        if (v.currentTime >= 6.65 && !hasStartedReveal.current) {
          hasStartedReveal.current = true;
          setRoomRevealed(true);
        }

        // 4. When video reaches final frame (~7.85s), pause to hold the Royal Marriage Room
        if (v.currentTime >= 7.85) {
          if (!v.paused) v.pause();
          return; // Stop polling once video is paused on final frame
        }
      }
      animId = requestAnimationFrame(checkTime);
    };

    animId = requestAnimationFrame(checkTime);
    return () => cancelAnimationFrame(animId);
  }, [playing, playSparkleSound, startMusic]);

  // Hold final frame if video fires ended
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };


  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-ivory"
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.9 }}
    >
      {/* blurred fill for wide screens */}
      <img
        src={wedding.assets.sealedPoster}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl pointer-events-none"
      />
      <div
        className="relative h-screen h-[100dvh] w-full max-w-full sm:h-[94svh] sm:max-h-[960px] sm:w-auto sm:aspect-[9/16] sm:min-w-[280px] sm:max-w-[540px] sm:rounded-sm sm:shadow-2xl sm:border sm:border-champagne/40 overflow-hidden flex items-center justify-center"
      >
        <video
          ref={videoRef}
          src={wedding.assets.openingVideo}
          poster={wedding.assets.sealedPoster}
          playsInline
          {...{ "webkit-playsinline": "true", "x5-playsinline": "true" }}
          muted
          preload="auto"
          onEnded={handleVideoEnded}
          onError={finish}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Calligraphic Handwriting Reveal Overlay (Positioned precisely over Royal Marriage Room) */}
        {playing && (
          <div
            className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-3 sm:px-6 transition-opacity duration-700 ${
              roomRevealed ? "opacity-100" : "opacity-0"
            }`}
          >
            <CalligraphyNameReveal
              active={roomRevealed}
              onComplete={handleComplete}
            />
          </div>
        )}

        <AnimatePresence>
          {!playing && (
            <motion.button
              type="button"
              onClick={open}
              aria-label="Tap to open your invitation"
              className="absolute inset-0 flex cursor-pointer flex-col items-center justify-between px-4 py-[8dvh] sm:py-[9dvh] focus:outline-none select-none"
              style={{
                paddingTop: "max(2.5rem, env(safe-area-inset-top, 2.5rem))",
                paddingBottom: "max(2.5rem, env(safe-area-inset-bottom, 2.5rem))",
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="rounded-sm bg-ivory/80 px-3.5 py-1.5 font-display text-[10px] min-[380px]:text-[11px] tracking-[0.25em] min-[380px]:tracking-[0.3em] text-gold-deep backdrop-blur-sm sm:text-xs text-center max-w-[90%]"
              >
                YOU ARE CORDIALLY INVITED
              </motion.p>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {playing && !leaving && (
        <button
          onClick={finish}
          className="absolute z-30 font-display text-[10px] tracking-[0.3em] text-ink/75 hover:text-ink bg-ivory/75 px-3 py-1.5 rounded-sm backdrop-blur-sm border border-champagne/40 transition active:scale-95"
          style={{
            bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
            right: "max(1rem, env(safe-area-inset-right, 1rem))",
          }}
        >
          SKIP
        </button>
      )}
    </motion.div>
  );
}

