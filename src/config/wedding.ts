// Central wedding configuration — edit names, dates, venues and assets here.
import openingVideo from "@/assets/invitation_opening.mp4.asset.json";
import sealedPoster from "@/assets/invitation_sealed.jpg.asset.json";
import hallImage from "@/assets/wedding_hall.jpg.asset.json";

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const wedding = {
  bride: "Tanzilah Fatema",
  groom: "Zeeshan Alam",
  hosts: "Mrs. & Mr. Anjum Pervez",
  hostsUpper: "MRS. & MR. ANJUM PERVEZ",
  brideFamily: ["Grand D/o. Late Manzar Alam", "& D/o. Anjum Pervez"],
  groomFamily: ["S/o. Masud Alam"],
  inviteLine:
    "Cordially invite your esteemed presence on the auspicious occasion of the marriage of their daughter.",
  // Countdown target: Thursday 24 Dec 2026, midnight Asia/Kolkata (UTC+5:30)
  countdownTarget: "2026-12-24T00:00:00+05:30",
  revealDate: "24 December 2026",
  nikah: {
    title: "NIKAH",
    date: "Thursday, 24th December 2026",
    time: "After Namaz-e-Asr",
    venue: "Jama Masjid, Rajabazar",
    address: ["Kolkata – 700009 (Kol-09)."],
    mapsUrl: maps("Jama Masjid, Rajabazar, Kolkata 700009"),
    button: "VIEW NIKAH LOCATION",
  },
  barat: {
    title: "BARAT ARRIVAL",
    date: "Thursday, 24th December 2026",
    time: "8:00 PM",
    venue: "METRO PALACE",
    landmark: "Near Masjid-e-Numania (Teenwali)",
    address: ["H-29/30, G.R. Road,", "Kolkata – 700024 (Kol-24)."],
    mapsUrl: maps("Metro Palace, H-29/30, G.R. Road, Kolkata 700024"),
    button: "VIEW BARAT VENUE",
  },
  walima: {
    title: "DAWAT-E-WALIMA",
    subtitle: "Reception",
    date: "Saturday, 26th December 2026",
    time: "8:00 PM onwards",
    venue: "SAGAR (210)",
    venueSub: "RAILWAY OFFICER'S CLUB, SEALDAH",
    address: ["82, Kaiser Street,", "Eastern Railway Sealdah,", "Kolkata – 700009."],
    mapsUrl: maps("Railway Officer's Club, 82 Kaiser Street, Sealdah, Kolkata 700009"),
    button: "VIEW RECEPTION LOCATION",
  },
  timeline: [
    {
      day: "24 DECEMBER 2026",
      items: [
        { title: "NIKAH", time: "After Namaz-e-Asr", place: "Jama Masjid, Rajabazar." },
        { title: "BARAT ARRIVAL", time: "8:00 PM", place: "Metro Palace, Garden Reach Road." },
      ],
    },
    {
      day: "26 DECEMBER 2026",
      items: [
        { title: "DAWAT-E-WALIMA", time: "8:00 PM onwards", place: "Railway Officer's Club, Sealdah." },
      ],
    },
  ],
  honourableHosts: ["Mr. Md. Shibli Alam", "Al-Feras Adil", "Mohammad Musab", "All Relatives & Friends"],
  compliments: {
    from: "Mrs. & Mr. Anjum Pervez",
    address: ["H-49, Ghulam Abbas Lane,", "G.R. Road,", "Kolkata – 700024."],
  },
  // RSVP: add a WhatsApp number in international format (digits only, e.g. "9198xxxxxxxx").
  // Left empty, the button opens WhatsApp so the guest can choose who to reply to.
  rsvpWhatsApp: "",
  assets: {
    openingVideo: openingVideo.url,
    sealedPoster: sealedPoster.url,
    hallImage: hallImage.url,
    weddingMusic: "/wedding_music.mp3",
  },
};
