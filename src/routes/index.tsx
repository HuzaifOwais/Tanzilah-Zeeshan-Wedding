import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, CalendarDays, Landmark, Moon, Users, Utensils, MessageCircle, ChevronDown } from "lucide-react";
import { wedding } from "@/config/wedding";
import { Opening } from "@/components/wedding/Opening";
import { Countdown } from "@/components/wedding/Countdown";
import { Scratch } from "@/components/wedding/Scratch";
import { Controls } from "@/components/wedding/Controls";
import { Divider, Frame, Mosque, SectionTitle, HeartDivider, FloralHeader } from "@/components/wedding/Ornament";
import { Toaster } from "@/components/ui/sonner";
import { AudioProvider } from "@/components/wedding/AudioContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tanzilah Fatema & Zeeshan Alam — Wedding Invitation" },
      { name: "description", content: "You are cordially invited to the Nikah and Dawat-e-Walima of Tanzilah Fatema & Zeeshan Alam, 24 & 26 December 2026, Kolkata." },
      { property: "og:title", content: "Tanzilah Fatema & Zeeshan Alam — Wedding Invitation" },
      { property: "og:description", content: "Nikah on 24 December 2026 and Dawat-e-Walima on 26 December 2026, Kolkata. Tap to open your invitation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.9, ease: "easeOut" },
} as const;

const goldBtn =
  "mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-gold-gradient px-6 py-3 font-display text-[11px] tracking-[0.25em] text-ivory shadow-soft transition hover:brightness-105 max-w-full text-center";

function Names({ size = "lg" }: { size?: "lg" | "md" }) {
  const cls = size === "lg" ? "text-4xl min-[400px]:text-5xl sm:text-7xl md:text-8xl" : "text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl";
  return (
    <div className="text-center">
      <p className={`font-script leading-tight text-gold-gradient ${cls}`}>{wedding.bride}</p>
      <p className="my-1 font-script text-3xl sm:text-4xl text-gold">&amp;</p>
      <p className={`font-script leading-tight text-gold-gradient ${cls}`}>{wedding.groom}</p>
    </div>
  );
}

function Row({ icon: Icon, children }: { icon: typeof Clock; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-center gap-3 text-left">
      <Icon size={18} className="mt-1 shrink-0 text-gold" />
      <div className="font-serif text-lg leading-snug text-ink sm:text-xl">{children}</div>
    </div>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const rsvpText = encodeURIComponent(
    `Assalamu Alaikum! Thank you for the invitation to the wedding of ${wedding.bride} & ${wedding.groom}. I would like to RSVP:`,
  );
  const rsvpUrl = `https://wa.me/${wedding.rsvpWhatsApp}?text=${rsvpText}`;

  return (
    <AudioProvider>
      <div className="min-h-screen bg-ivory text-ink">
        {!opened && <Opening onDone={() => setOpened(true)} />}
      <Toaster />
      {opened && <Controls />}

      {/* HERO — cream */}
      <section id="home" className="relative overflow-hidden section-cream">
        <img src={wedding.assets.hallImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/80 to-cream" />
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute h-1.5 w-1.5 rounded-full bg-champagne animate-sparkle"
            style={{ left: `${(i * 37) % 100}%`, top: `${30 + ((i * 53) % 60)}%`, animationDelay: `${(i * 0.7) % 5}s` }}
          />
        ))}
        <div className="relative mx-auto flex min-h-[100dvh] max-w-2xl flex-col items-center justify-center px-3 min-[400px]:px-5 pb-16 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={opened ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2 }}
            className="relative w-full overflow-hidden rounded-sm border border-champagne/70 bg-[#faf6f0] shadow-2xl backdrop-blur-sm px-[16%] min-[450px]:px-[18%] sm:px-[19%] pt-28 sm:pt-36 pb-28 sm:pb-36 text-center"
          >
            {/* Flowered Bottom Door Frame background */}
            <img
              src="/flowered_door_frame.jpg"
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-fill pointer-events-none select-none opacity-95"
            />

            <div className="relative z-10 flex flex-col items-center">
              {/* Bismillah Calligraphy dragged downwards to avoid arch cusp overlap */}
              <img
                src="/bismillah_gold.png"
                alt="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
                className="mt-2 sm:mt-4 h-9 sm:h-12 w-auto max-w-[75%] object-contain select-none drop-shadow-sm"
              />
              <Divider className="my-5 sm:my-6" />
              <p className="font-display text-xs min-[400px]:text-sm sm:text-base tracking-[0.18em] sm:tracking-[0.25em] text-ink">{wedding.hostsUpper}</p>
              <p className="mx-auto mt-3 max-w-sm font-serif text-xs min-[360px]:text-sm sm:text-base md:text-lg italic leading-relaxed text-ink/90">{wedding.inviteLine}</p>
              <div id="couple" className="mt-6 sm:mt-8 scroll-mt-20 w-full">
                <p className="font-script text-3xl min-[380px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl leading-tight text-gold-gradient">{wedding.bride}</p>
                {wedding.brideFamily.map((l) => (
                  <p key={l} className="font-serif text-xs min-[380px]:text-sm sm:text-base text-muted-foreground">{l}</p>
                ))}
                <p className="my-1.5 sm:my-2.5 font-script text-2xl min-[380px]:text-3xl sm:text-4xl text-gold animate-float">&amp;</p>
                <p className="font-script text-3xl min-[380px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl leading-tight text-gold-gradient">{wedding.groom}</p>
                {wedding.groomFamily.map((l) => (
                  <p key={l} className="font-serif text-xs min-[380px]:text-sm sm:text-base text-muted-foreground">{l}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scroll Down Option */}
          <motion.a
            href="#welcome"
            initial={{ opacity: 0, y: -8 }}
            animate={opened ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-6 sm:mt-8 flex flex-col items-center gap-1.5 text-gold-deep hover:text-gold transition group cursor-pointer select-none focus:outline-none"
            aria-label="Scroll down to view invitation details"
          >
            <span className="font-display text-[10px] min-[380px]:text-[11px] tracking-[0.25em] uppercase text-ink/75 group-hover:text-gold-deep transition">
              Scroll Down
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-champagne/70 bg-ivory/80 shadow-xs backdrop-blur-xs transition group-hover:border-gold group-hover:bg-cream">
              <ChevronDown className="h-4 w-4 animate-bounce text-gold-deep" />
            </div>
          </motion.a>
        </div>
      </section>

      {/* GENTLE MESSAGE — ivory */}
      <section id="welcome" className="section-ivory px-5 py-20 sm:py-28">
        <motion.div {...reveal} className="mx-auto max-w-xl">
          <div className="arch-top relative border border-champagne bg-cream/65 px-6 py-14 sm:px-12 sm:py-20 text-center shadow-soft backdrop-blur-sm">
            <FloralHeader className="mb-4" />
            <HeartDivider className="mb-8" />
            <div className="mx-auto max-w-md space-y-3 font-serif text-lg min-[380px]:text-xl sm:text-2xl italic leading-relaxed text-ink/90">
              <p>We are honored to welcome you to the</p>
              <p>
                wedding ceremony of{" "}
                <span className="font-semibold text-gold-deep not-italic sm:italic">
                  {wedding.bride} &amp; {wedding.groom}
                </span>{" "}
                as
              </p>
              <p>they begin their journey together in</p>
              <p className="font-medium text-gold-deep">faith and love,</p>
              <p>we thank you for being part of this</p>
              <p>
                blessed occasion{" "}
                <span className="text-gold text-xl sm:text-2xl align-baseline inline-block ml-1">♥</span>
              </p>
            </div>
            <HeartDivider className="mt-8" />
          </div>
        </motion.div>
      </section>

      {/* SCRATCH TO REVEAL — cream (placed right after gentle message) */}
      <section id="scratch" className="section-cream px-5 py-20">
        <motion.div {...reveal}>
          <SectionTitle title="SCRATCH TO REVEAL" />
          <Scratch />
          <p className="mt-4 text-center font-serif italic text-muted-foreground">Swipe your finger across the sparkling golden heart</p>
        </motion.div>
      </section>

      {/* COUNTDOWN — ivory */}
      <section className="section-ivory px-5 py-20">
        <motion.div {...reveal}>
          <SectionTitle title="COUNTING DOWN TO A BEAUTIFUL BEGINNING" />
          <Countdown />
        </motion.div>
      </section>

      {/* NIKAH — cream */}
      <section id="events" className="section-cream scroll-mt-12 px-5 py-20">
        <motion.div {...reveal} className="mx-auto max-w-xl">
          <SectionTitle eyebrow="EVENT 01" title={wedding.nikah.title} />
          <Frame className="bg-ivory/85 px-6 py-12 text-center">
            <Mosque className="mx-auto mb-6 h-16 w-24 text-gold" />
            <div className="space-y-4">
              <Row icon={CalendarDays}>{wedding.nikah.date}</Row>
              <Row icon={Moon}>{wedding.nikah.time}</Row>
              <Row icon={MapPin}>
                <strong className="font-semibold">{wedding.nikah.venue}</strong>
                {wedding.nikah.address.map((a) => <span key={a} className="block">{a}</span>)}
              </Row>
            </div>
            <a href={wedding.nikah.mapsUrl} target="_blank" rel="noreferrer" className={goldBtn}>
              <MapPin size={14} /> {wedding.nikah.button}
            </a>
          </Frame>
        </motion.div>
      </section>

      {/* BARAT — ivory */}
      <section className="section-ivory px-5 py-20">
        <motion.div {...reveal} className="mx-auto max-w-xl">
          <SectionTitle eyebrow="ON THE NIKAH DAY" title={wedding.barat.title} />
          <div className="grid gap-0 overflow-hidden rounded-sm border border-champagne bg-cream/75 shadow-soft sm:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col items-center justify-center bg-gold-gradient px-6 py-8 text-ivory">
              <p className="font-display text-xs tracking-[0.3em]">24 DEC 2026</p>
              <p className="mt-2 font-playfair text-5xl">8:00</p>
              <p className="font-display text-sm tracking-[0.3em]">PM</p>
            </div>
            <div className="px-6 py-8 text-center sm:text-left">
              <p className="font-serif text-lg italic text-muted-foreground">{wedding.barat.date}</p>
              <p className="mt-2 font-display text-2xl tracking-[0.2em] text-gold-deep">{wedding.barat.venue}</p>
              <p className="mt-3 flex items-center justify-center gap-2 font-serif text-lg text-ink sm:justify-start">
                <Landmark size={16} className="text-gold" /> {wedding.barat.landmark}
              </p>
              <p className="mt-2 font-serif text-lg leading-snug text-ink">
                {wedding.barat.address.map((a) => <span key={a} className="block">{a}</span>)}
              </p>
              <a href={wedding.barat.mapsUrl} target="_blank" rel="noreferrer" className={goldBtn}>
                <MapPin size={14} /> {wedding.barat.button}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WALIMA — cream */}
      <section id="reception" className="section-cream scroll-mt-12 px-5 py-20">
        <motion.div {...reveal} className="mx-auto max-w-xl">
          <SectionTitle eyebrow="EVENT 02" title={wedding.walima.title} />
          <div className="arch-top relative border-2 border-champagne bg-ivory/85 px-6 pb-12 pt-14 sm:pt-16 text-center shadow-soft">
            <p className="font-script text-5xl sm:text-6xl text-gold-gradient pt-2 pb-1 leading-normal">
              {wedding.walima.subtitle}
            </p>
            <div className="mt-6 space-y-4">
              <Row icon={CalendarDays}>{wedding.walima.date}</Row>
              <Row icon={Utensils}>Dinner: {wedding.walima.time}</Row>
            </div>
            <Divider className="my-6" />
            <p className="font-display text-2xl tracking-[0.2em] text-gold-deep">{wedding.walima.venue}</p>
            <p className="mt-1 font-display text-xs tracking-[0.2em] text-ink sm:text-sm">{wedding.walima.venueSub}</p>
            <p className="mt-4 font-serif text-lg leading-snug text-ink">
              {wedding.walima.address.map((a) => <span key={a} className="block">{a}</span>)}
            </p>
            <a href={wedding.walima.mapsUrl} target="_blank" rel="noreferrer" className={goldBtn}>
              <MapPin size={14} /> {wedding.walima.button}
            </a>
          </div>
        </motion.div>
      </section>

      {/* TIMELINE — ivory */}
      <section className="section-ivory px-5 py-20">
        <motion.div {...reveal} className="mx-auto max-w-xl">
          <SectionTitle title="THE WEDDING CELEBRATION" />
          {wedding.timeline.map((d) => (
            <div key={d.day} className="mb-10">
              <p className="mb-6 text-center font-display text-sm tracking-[0.3em] text-gold-deep">{d.day}</p>
              <ol className="relative ml-4 border-l border-champagne">
                {d.items.map((it, i) => (
                  <motion.li key={it.title} {...reveal} transition={{ duration: 0.7, delay: i * 0.15 }} className="relative mb-8 pl-8 last:mb-0">
                    <span className="absolute -left-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-champagne bg-cream">
                      <span className="h-2 w-2 rotate-45 bg-gold" />
                    </span>
                    <p className="font-display tracking-[0.2em] text-ink">{it.title}</p>
                    <p className="flex items-center gap-2 font-serif text-lg text-gold-deep"><Clock size={14} /> {it.time}</p>
                    <p className="font-serif text-lg text-muted-foreground">{it.place}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FAMILY — cream */}
      <section id="family" className="section-cream scroll-mt-12 px-5 py-20">
        <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
          <SectionTitle title="WITH THE BLESSINGS AND GOOD WISHES OF OUR FAMILIES" />
          <p className="flex items-center justify-center gap-2 font-display text-sm tracking-[0.3em] text-gold-deep"><Users size={16} /> THE HON'BLE HOSTS</p>
          <ul className="mt-5 space-y-2 font-playfair text-xl text-ink sm:text-2xl">
            {wedding.honourableHosts.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <Divider className="my-10" />
          <p className="font-display text-sm tracking-[0.3em] text-gold-deep">WITH BEST COMPLIMENTS FROM</p>
          <p className="mt-3 font-script text-4xl sm:text-5xl text-gold-gradient pt-2 pb-1 leading-normal">{wedding.compliments.from}</p>
          <p className="mt-3 font-serif text-lg leading-snug text-ink">
            {wedding.compliments.address.map((a) => <span key={a} className="block">{a}</span>)}
          </p>
          <div className="mt-12 rounded-sm border border-champagne bg-ivory/85 px-6 py-8">
            <p className="font-display text-sm tracking-[0.3em] text-ink">KINDLY RSVP</p>
            <p className="mt-2 font-serif text-lg italic text-muted-foreground">Let the family know you'll be joining the celebration.</p>
            <a href={rsvpUrl} target="_blank" rel="noreferrer" className={goldBtn}>
              <MessageCircle size={14} /> RSVP ON WHATSAPP
            </a>
          </div>
        </motion.div>
      </section>

      {/* FINAL — ivory */}
      <section className="section-ivory px-5 pb-28 pt-20">
        <motion.div {...reveal} className="mx-auto max-w-2xl">
          <Frame className="bg-cream/70 px-6 py-14 text-center sm:px-12">
            <p className="font-display text-base leading-relaxed tracking-[0.18em] text-ink sm:text-xl">
              YOUR PRESENCE WILL MAKE OUR CELEBRATION EVEN MORE SPECIAL.
            </p>
            <p className="mt-4 font-serif text-lg italic text-muted-foreground">We look forward to celebrating this beautiful occasion with you.</p>
            <Divider className="my-8" />
            <Names size="md" />
            <Divider className="my-8" />
            <p className="font-serif text-xl italic text-gold-deep">With Love &amp; Best Wishes</p>
            <p className="mt-2 font-display tracking-[0.2em] text-ink">{wedding.hosts}</p>
          </Frame>
        </motion.div>
      </section>
      </div>
    </AudioProvider>
  );
}
