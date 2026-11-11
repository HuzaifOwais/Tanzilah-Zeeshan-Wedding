import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/config/wedding";

export function getRemaining(target: string, now: number) {
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff / 36e5) % 24),
    minutes: Math.floor((diff / 6e4) % 60),
    seconds: Math.floor((diff / 1e3) % 60),
  };
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return <div className="h-28" />;
  const r = getRemaining(wedding.countdownTarget, now);
  if (!r)
    return (
      <p className="text-center font-serif text-2xl italic text-ink">
        Alhamdulillah — the blessed day has arrived. Thank you for celebrating with us.
      </p>
    );
  const items: [string, number][] = [["DAYS", r.days], ["HOURS", r.hours], ["MINUTES", r.minutes], ["SECONDS", r.seconds]];
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-1.5 min-[380px]:gap-2 sm:gap-5">
      {items.map(([label, v]) => (
        <div key={label} className="frame-ornate flex flex-col items-center bg-cream/75 px-1 py-4 sm:py-7 shadow-xs">
          <div className="relative h-9 min-[380px]:h-10 overflow-hidden sm:h-14">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={v}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="block font-playfair text-2xl min-[380px]:text-3xl text-gold-deep sm:text-5xl"
              >
                {String(v).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-1.5 sm:mt-2 font-display text-[8px] min-[380px]:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] text-ink sm:text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}
