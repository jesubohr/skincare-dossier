import { Client } from "./types"

export const clients: Client[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    initials: "SJ",
    avatarColor: "#D4A574",
    status: "active",
    skinType: "Combination",
    birthDate: "1990-01-01",
    phone: "3025559123",
    email: "sarah.jenkins@example.com",
    lastTreatment: {
      date: "Oct 24, 2023",
      type: "Botox Touch-up",
    },
    treatmentHistory: [
      {
        date: "Oct 12, 2023",
        time: "10:00 AM",
        doctor: "Dr. Miller",
        type: "Anti-Aging Facial",
        observations:
          "Client reported increased dryness on forehead. Slight redness observed around the nose area. Elasticity test showed moderate improvement from last session.",
        recommendations: ["Hydrating serum twice daily (AM/PM)", "SPF 50 mineral sunscreen", "Avoid hot water during facial cleansing"],
        nextVisit: "Nov 15, 2023",
      },
      {
        date: "Sep 10, 2023",
        time: "02:30 PM",
        doctor: "Dr. Miller",
        type: "Chemical Peel",
        observations: "Mild acne scarring visible on cheeks. Skin tolerance test passed. Proceeded with Level 1 peel.",
        recommendations: ["Post-peel balm applied", "No direct sunlight for 48 hours"],
      },
      {
        date: "Aug 01, 2023",
        time: "02:30 PM",
        doctor: "Dr. Miller",
        type: "Chemical Peel",
        observations: "Patient onboarding complete. Skin analysis performed. Discussed long-term goals for anti-aging and hydration.",
        recommendations: ["Start of Treatment History"],
      },
    ],
  },
  {
    id: "2",
    name: "Monica Ross",
    initials: "MR",
    avatarColor: "#9CA3AF",
    status: "none",
    skinType: "Normal",
    birthDate: "1990-01-01",
    phone: "(555) 123-4567",
    lastTreatment: {
      date: "Nov 02, 2023",
      type: "HydraFacial",
    },
  },
  {
    id: "3",
    name: "Emily Lewis",
    initials: "EL",
    avatarColor: "#D4A574",
    status: "needs-follow-up",
    skinType: "Normal",
    birthDate: "1990-01-01",
    phone: "(555) 123-4567",
    email: "emily.lewis@example.com",
    lastTreatment: {
      date: "Aug 15, 2023",
      type: "Needs Follow-up",
    },
  },
  {
    id: "4",
    name: "Jessica Wong",
    initials: "JW",
    avatarColor: "#9CA3AF",
    status: "none",
    skinType: "Normal",
    birthDate: "1990-01-01",
    phone: "(555) 123-4567",
    email: "jessica.wong@example.com",
    lastTreatment: {
      date: "Yesterday",
      type: "Chemical Peel",
    },
  },
  {
    id: "5",
    name: "Rachel Kim",
    initials: "RK",
    avatarColor: "#D4A574",
    status: "none",
    skinType: "Normal",
    birthDate: "1990-01-01",
    phone: "(555) 123-4567",
    email: "rachel.kim@example.com",
    lastTreatment: {
      date: "Sep 20, 2023",
      type: "Micro-needling",
    },
  },
  {
    id: "6",
    name: "Amanda Brown",
    initials: "AB",
    avatarColor: "#9CA3AF",
    status: "payment-overdue",
    skinType: "Normal",
    birthDate: "1990-01-01",
    phone: "(555) 123-4567",
    email: "amanda.brown@example.com",
    lastTreatment: {
      date: "Oct 05, 2023",
      type: "Payment Overdue",
    },
  },
]

export const treatments = [
  {
    id: "1",
    name: "Anti-Aging Facial",
    description: "Rejuvenating facial treatment to reduce fine lines and wrinkles.",
    price: 150,
    duration: 60,
  },
  {
    id: "2",
    name: "Chemical Peel",
    description: "Exfoliating treatment to improve skin texture and tone.",
    price: 200,
    duration: 45,
  },
  {
    id: "3",
    name: "HydraFacial",
    description: "Deep cleansing and hydration treatment.",
    price: 250,
    duration: 60,
  },
  {
    id: "4",
    name: "Micro-needling",
    description: "Collagen-stimulating treatment for acne scars and skin texture.",
    price: 300,
    duration: 60,
  },
]

export const stats = [
  { label: "Total Clients", value: "142", trend: "+12%" },
  { label: "Appointments Today", value: "5", subtext: "3 remaining" },
  { label: "Retention Rate", value: "88%", icon: "trending-up" },
  { label: "Pending Follow-ups", value: "8", icon: "bell" },
]
