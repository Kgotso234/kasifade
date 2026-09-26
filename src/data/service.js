// Dummy data. Replace with backend calls later;
// the shape can stay the same.

export const business = {
  name: "Kasifade Barbershop",
  shortName: "Kasifade",
  area: "Tembisa",
  since: "2019",
  address: "Tembisa, Gauteng",
  phone: "+27 11 555 0142",
  phoneHref: "tel:+27115550142",
  whatsappHref: "https://wa.me/27115550142",
  email: "hello@kasifade.co.za",
  instagramHref: "https://instagram.com/kasifade",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Tembisa+Gauteng",
  payments: "Cash, card or EFT",
  bookingHref: "/booking",
};

export const hours = [
  { days: "Mon – Fri", time: "08:00 – 18:30" },
  { days: "Sat", time: "08:00 – 17:00" },
  { days: "Sun", time: "09:00 – 14:00" },
];

export const openingHours = {
  0: { open: "09:00", close: "14:00" },
  1: { open: "08:00", close: "18:30" },
  2: { open: "08:00", close: "18:30" },
  3: { open: "08:00", close: "18:30" },
  4: { open: "08:00", close: "18:30" },
  5: { open: "08:00", close: "18:30" },
  6: { open: "08:00", close: "17:00" },
};

export const bookingSettings = {
  slotIntervalMinutes: 30,
  leadTimeMinutes: 60,
  maxDaysAhead: 30,
  maxPartySize: 6,
  timeZone: "Africa/Johannesburg",
};

export const services = [
  {
    id: "chiskop",
    name: "Chiskop",
    price: 250,
    duration: 30,
    description: "A deeply popular and classic clean-shaven look.",
    image:
      "/images/chiskop.jpg",
  },
  {
    id: "low-cut-chillas",
    name: "Low Cut / Chillas",
    price: 280,
    duration: 45,
    description: "Very short, uniform clipper cut, paired with a clean hairline.",
    image:
      "/images/low-cut.jpg",
  },
  {
    id: "three-step-fade",
    name: "Three-Step Fade",
    price: 150,
    duration: 20,
    description: "Distinct tiered transition with three visible, sharp gradient lines.",
    image:
      "/images/three-stepfade.jpg",
  },
  {
    id: "taper-fade",
    name: "Taper Fade",
    price: 350,
    duration: 60,
    description: "Gradual fading at the sideburns and nape, leaving bulk on top.",
    image:
      "/images/taperfade.jpg",
  },
  {
    id: "line-up-chiszzp",
    name: "Line-Up / Chiszzp",
    price: 180,
    duration: 30,
    description: "Precision razor work to map out sharp, geometric straight edges.",
    image:
      "/images/lineup.jpg",
  },
  {
    id: "sponge-twist",
    name: "Sponge Twist",
    price: 450,
    duration: 75,
    description: "Neat coils and twists created on top with faded sides.",
    image:
      "/images/spongetwist.jpg",
  },
];

export const barbers = [
  {
    id: "barber-1",
    name: "Sipho",
    role: "Master Barber",
    specialties: [
      "chiskop",
      "low-cut-chillas",
      "three-step-fade"
    ],
    image:
      "/images/1790377180175.jpg",
  },
  {
    id: "barber-2",
    name: "Thabo",
    role: "Fade & Line-Up Specialist",
    specialties: [
      "taper-fade",
      "line-up-chiszzp",
      "sponge-twist"
    ],
    image:
      "/images/1790377233299.jpg",
  },
  {
    id: "barber-3",
    name: "Jabu",
    role: "Stylist & Texture Specialist",
    specialties: [
      "three-step-fade",
      "taper-fade",
      "sponge-twist",
      "line-up-chiszzp"
    ],
    image:
      "/images/1790377260573.jpg",
  },
  {
    id: "barber-4",
    name: "Kabelo",
    role: "Style Consultant",
    specialties: [
      "three-step-fade",
      "taper-fade",
      "sponge-twist",
      "line-up-chiszzp"
    ],
    image:
      "/images/1790377292778.jpg",
  },
  {
    id: "barber-5",
    name: "Lefa",
    role: "Hairdresser",
    specialties: [
      "taper-fade",
      "sponge-twist",
      "line-up-chiszzp"
    ],
    image:
      "/images/1790377341450.jpg",
  },
  {
    id: "barber-6",
    name: "Bafana",
    role: "Hairdresser",
    specialties: [
      "three-step-fade",
      "taper-fade",
      "sponge-twist"
    ],
    image:
      "/images/1790377571252.jpg",
  },
  {
    id: "barber-7",
    name: "Xola",
    role: "Creative Director",
    specialties: [
      "three-step-fade",
      "taper-fade",
      "sponge-twist",
      "line-up-chiszzp"
    ],
    image:
      "/images/1790377575217.jpg",
  },
  {
    id: "barber-8",
    name: "Tshepo",
    role: "Colorist",
    specialties: [
      "three-step-fade",
      "taper-fade",
      "line-up-chiszzp"
    ],
    image:
      "/images/1790377578930.jpg",
  },
];
export const story = {
  eyebrow: "Our story",
  title: "BUILT FROM THE CHAIR UP.",
  intro:
    "Kasifade started with a simple idea: create a barbershop where a great cut comes with great energy.",

  paragraphs: [
    "Since 2019, Kasifade has been part of the Tembisa community, bringing together sharp cuts, personal style and the kind of atmosphere that keeps people coming back.",
    "We believe a barbershop should feel like more than a place you visit for a haircut. It's a place to catch up, have a laugh, talk life and leave feeling fresh.",
    "Every barber brings their own style to the chair, but the standard stays the same — clean work, attention to detail and making every client feel at home.",
  ],

  images: {
    hero:
      "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1800&q=90",

    interior:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=85",

    barber:
      "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1200&q=85",

    detail:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=85",
  },

  milestones: [
    {
      year: "2019",
      title: "THE FIRST CHAIR",
      text: "Kasifade begins with a vision to create something of its own.",
    },
    {
      year: "2021",
      title: "THE COMMUNITY",
      text: "The shop becomes a familiar place for regulars and new faces.",
    },
    {
      year: "TODAY",
      title: "STILL CUTTING",
      text: "The same energy, sharper craft and a growing Kasifade family.",
    },
  ],
};

export const contact = {
  title: "COME THROUGH.",
  description:
    "Whether you're booking your next cut, asking a question or just want to say what's up, we'd love to hear from you.",
  phone: business.phone,
  phoneHref: business.phoneHref,
  whatsappHref: business.whatsappHref,
  email: business.email,
  instagramHref: business.instagramHref,
  address: business.address,
  mapsHref: business.mapsHref,
};

export const formatPrice = (amount) => `R${amount}`;

export const startingPrice = Math.min(...services.map((s) => s.price));

export const barbersFor = (serviceId) =>
  barbers.filter((barber) =>
    barber.specialties?.includes(serviceId)
  );