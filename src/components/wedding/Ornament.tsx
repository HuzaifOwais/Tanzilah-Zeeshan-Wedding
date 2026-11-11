export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-champagne sm:w-24" />
      <svg width="44" height="18" viewBox="0 0 44 18" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M22 1 L27 9 L22 17 L17 9 Z" fill="currentColor" fillOpacity=".25" />
        <path d="M2 9 C8 2, 12 2, 16 9 C12 16, 8 16, 2 9Z M42 9 C36 2, 32 2, 28 9 C32 16, 36 16, 42 9Z" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-champagne sm:w-24" />
    </div>
  );
}

export function HeartDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold/80 ${className}`} aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent via-gold/50 to-gold/30 sm:w-24" />
      <span className="text-xs text-gold select-none sm:text-sm">♥</span>
      <span className="h-px w-14 bg-gradient-to-l from-transparent via-gold/50 to-gold/30 sm:w-24" />
    </div>
  );
}

export function FloralHeader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center text-gold/80 ${className}`} aria-hidden>
      <svg width="120" height="28" viewBox="0 0 120 28" fill="none" className="h-7 w-auto text-gold">
        <path d="M60 22 C52 16, 38 12, 10 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M60 22 C68 16, 82 12, 110 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M46 16 C42 12, 38 11, 34 14 C36 18, 41 18, 46 16 Z" fill="currentColor" fillOpacity=".3" />
        <path d="M32 14 C28 10, 24 9, 20 12 C22 16, 27 16, 32 14 Z" fill="currentColor" fillOpacity=".3" />
        <path d="M52 20 C50 16, 47 14, 44 17 C46 20, 49 21, 52 20 Z" fill="currentColor" fillOpacity=".3" />
        <path d="M74 16 C78 12, 82 11, 86 14 C84 18, 79 18, 74 16 Z" fill="currentColor" fillOpacity=".3" />
        <path d="M88 14 C92 10, 96 9, 100 12 C98 16, 93 16, 88 14 Z" fill="currentColor" fillOpacity=".3" />
        <path d="M68 20 C70 16, 73 14, 76 17 C74 20, 71 21, 68 20 Z" fill="currentColor" fillOpacity=".3" />
        <circle cx="60" cy="22" r="2.5" fill="currentColor" />
        <circle cx="56" cy="18" r="1.5" fill="currentColor" fillOpacity=".5" />
        <circle cx="64" cy="18" r="1.5" fill="currentColor" fillOpacity=".5" />
      </svg>
    </div>
  );
}

export function Star8({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <rect x="20" y="20" width="60" height="60" />
      <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="14" />
    </svg>
  );
}

export function Mosque({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M40 60 V40 C40 26 60 18 60 8 C60 18 80 26 80 40 V60" />
      <path d="M60 2 v6" /><circle cx="60" cy="2" r="1.5" />
      <path d="M18 60 V24 l3-6 3 6 V60 M96 60 V24 l3-6 3 6 V60" />
      <path d="M52 60 V48 a8 8 0 0 1 16 0 V60" />
      <path d="M6 60 H114" />
    </svg>
  );
}

export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M2 58 V12 Q2 2 12 2 H58" />
      <path d="M8 58 V16 Q8 8 16 8 H58" opacity=".6" />
      <path d="M14 22 c6 -2 8 -4 8 -8 c4 0 6 2 8 8" />
      <circle cx="14" cy="14" r="2.5" fill="currentColor" fillOpacity=".4" />
    </svg>
  );
}

export function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`frame-ornate relative ${className}`}>
      <Corner className="absolute left-2 top-2 h-10 w-10 text-gold" />
      <Corner className="absolute right-2 top-2 h-10 w-10 -scale-x-100 text-gold" />
      <Corner className="absolute bottom-2 left-2 h-10 w-10 -scale-y-100 text-gold" />
      <Corner className="absolute bottom-2 right-2 h-10 w-10 -scale-100 text-gold" />
      {children}
    </div>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && <p className="mb-3 font-display text-xs tracking-[0.35em] text-gold-deep">{eyebrow}</p>}
      <h2 className="font-display text-xl leading-snug tracking-[0.18em] text-ink sm:text-3xl">{title}</h2>
      <Divider className="mt-5" />
    </div>
  );
}
