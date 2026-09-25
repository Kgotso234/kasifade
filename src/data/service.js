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
    id: "classic-cut",
    name: "Classic Cut",
    price: 250,
    duration: 30,
    description: "A clean, timeless cut finished to your style.",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    price: 280,
    duration: 45,
    description: "Precision fading with sharp lines and a clean finish.",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    price: 150,
    duration: 20,
    description: "Shape, line-up and refine your beard.",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "cut-and-beard",
    name: "Cut + Beard",
    price: 350,
    duration: 60,
    description: "The complete Kasifade session.",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "kids-cut",
    name: "Kids Cut",
    price: 180,
    duration: 30,
    description: "Fresh, clean cuts for the younger generation.",
    image:
      "https://images.unsplash.com/photo-1599351431610-8a8a8a8a8a8a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "executive-grooming",
    name: "Executive Grooming",
    price: 450,
    duration: 75,
    description: "The full experience, from cut to finish.",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=85",
  },
];

export const barbers = [
  {
    id: "sipho",
    name: "Sipho Mokoena",
    role: "Senior Barber",
    specialty: "Precision fades & classic cuts",
    services: [
      "classic-cut",
      "skin-fade",
      "cut-and-beard",
      "executive-grooming",
    ],
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "thabo",
    name: "Thabo Molefe",
    role: "Fade Specialist",
    specialty: "Skin fades & modern styles",
    services: ["skin-fade", "beard-trim", "cut-and-beard"],
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "jordan",
    name: "Jordan Naidoo",
    role: "Master Barber",
    specialty: "Classic grooming & beard shaping",
    services: [
      "classic-cut",
      "beard-trim",
      "kids-cut",
      "executive-grooming",
    ],
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85",
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
  barbers.filter((b) => b.services.includes(serviceId));