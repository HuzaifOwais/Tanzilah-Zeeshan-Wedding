import { useState } from "react";
import { Menu, Music, Share2, VolumeX, X } from "lucide-react";
import { toast } from "sonner";
import { useWeddingAudio } from "./AudioContext";

const NAV = [
  ["Home", "home"],
  ["The Couple", "couple"],
  ["Events", "events"],
  ["Reception", "reception"],
  ["Family", "family"],
] as const;

const iconBtn =
  "flex h-11 w-11 items-center justify-center rounded-full border border-champagne bg-ivory/85 text-gold-deep shadow-soft backdrop-blur transition hover:bg-cream";

export function Controls() {
  const [open, setOpen] = useState(false);
  const music = useWeddingAudio();

  const share = async () => {
    const data = { title: "Tanzilah Fatema & Zeeshan Alam — Wedding Invitation", url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch { /* cancelled */ }
      return;
    }
    await navigator.clipboard.writeText(data.url);
    toast.success("Invitation link copied");
  };

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-40 hidden justify-center bg-ivory/70 py-3 backdrop-blur md:flex"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top, 0.75rem))",
        }}
      >
        <ul className="flex gap-8 font-display text-[11px] tracking-[0.3em] text-ink">
          {NAV.map(([l, id]) => (
            <li key={id}><a href={`#${id}`} className="transition hover:text-gold-deep">{l.toUpperCase()}</a></li>
          ))}
        </ul>
      </nav>
      <div
        className="fixed z-40 md:hidden"
        style={{
          top: "max(0.75rem, env(safe-area-inset-top, 0.75rem))",
          right: "max(0.75rem, env(safe-area-inset-right, 0.75rem))",
        }}
      >
        <button className={iconBtn} aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={18} /></button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 bg-ivory/95 backdrop-blur md:hidden">
          <button
            className={`${iconBtn} absolute`}
            style={{
              top: "max(0.75rem, env(safe-area-inset-top, 0.75rem))",
              right: "max(0.75rem, env(safe-area-inset-right, 0.75rem))",
            }}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
          {NAV.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="font-display text-sm tracking-[0.3em] text-ink">{l.toUpperCase()}</a>
          ))}
        </div>
      )}
      <div
        className="fixed z-40 flex flex-col gap-2"
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
          right: "max(0.75rem, env(safe-area-inset-right, 0.75rem))",
        }}
      >
        <button className={iconBtn} onClick={music.toggle} aria-label={music.playing ? "Turn music off" : "Turn music on"} aria-pressed={music.playing}>
          {music.playing ? <Music size={18} /> : <VolumeX size={18} />}
        </button>
        <button className={iconBtn} onClick={share} aria-label="Share invitation"><Share2 size={18} /></button>
      </div>
    </>
  );
}
