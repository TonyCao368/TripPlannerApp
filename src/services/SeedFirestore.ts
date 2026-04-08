// ============================================================
// SEED SCRIPT — Run once to populate Firestore with destinations
//
// Usage:
//   npx ts-node src/services/SeedFirestore.ts
//
// Or import and call seedDestinations() from your app once.
// ============================================================

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";

const DESTINATIONS = [
  {
    id: "d1",
    name: "Kyoto Temples",
    location: "Kyoto, Japan",
    description:
      "Ancient capital of Japan, home to over 2,000 temples and shrines. Experience traditional tea ceremonies, bamboo groves, and geisha culture in this timeless city.",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400",
    rating: 4.8,
    price: 120,
    tags: ["historic", "culture"],
    favorites: 2340,
    thingsToDo: [
      "Fushimi Inari Shrine",
      "Bamboo Grove walk",
      "Traditional tea ceremony",
      "Nishiki Market",
    ],
    languages: ["Japanese"],
    ageRecommendation: "All ages",
    owner: "Kyoto Tourism Board",
    photos: [],
  },
  {
    id: "d2",
    name: "Machu Picchu",
    location: "Cusco, Peru",
    description:
      "15th-century Inca citadel set high in the Andes Mountains. One of the most recognizable archaeological sites on the planet.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400",
    rating: 4.9,
    price: 85,
    tags: ["historic", "nature", "adventure"],
    favorites: 3100,
    thingsToDo: [
      "Inca Trail hike",
      "Sun Gate viewpoint",
      "Huayna Picchu climb",
      "Local market visit",
    ],
    languages: ["Spanish", "Quechua"],
    ageRecommendation: "12+",
    owner: "Peru Ministry of Culture",
    photos: [],
  },
  {
    id: "d3",
    name: "Santorini",
    location: "Cyclades, Greece",
    description:
      "Volcanic island famous for dramatic views, stunning sunsets, white-washed buildings, and vibrant blue domes.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400",
    rating: 4.7,
    price: 200,
    tags: ["beach", "culture", "food"],
    favorites: 2890,
    thingsToDo: [
      "Oia sunset viewing",
      "Wine tasting tour",
      "Red Beach visit",
      "Caldera boat cruise",
    ],
    languages: ["Greek"],
    ageRecommendation: "All ages",
    owner: "Santorini Tourism",
    photos: [],
  },
  {
    id: "d4",
    name: "Serengeti Safari",
    location: "Tanzania, Africa",
    description:
      "Endless plains teeming with the greatest concentration of wildlife on Earth. Witness the Great Migration and the Big Five.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
    rating: 4.9,
    price: 350,
    tags: ["nature", "adventure"],
    favorites: 1950,
    thingsToDo: [
      "Game drive safari",
      "Hot air balloon ride",
      "Maasai village visit",
      "Night sky stargazing",
    ],
    languages: ["Swahili", "English"],
    ageRecommendation: "6+",
    owner: "Tanzania National Parks",
    photos: [],
  },
  {
    id: "d5",
    name: "New Orleans",
    location: "Louisiana, USA",
    description:
      "Birthplace of jazz, famous for Creole cuisine, vibrant nightlife, and a culture unlike anywhere else in the United States.",
    image: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=400",
    rating: 4.5,
    price: 150,
    tags: ["music", "food", "nightlife", "culture"],
    favorites: 2100,
    thingsToDo: [
      "French Quarter walk",
      "Live jazz on Frenchmen St",
      "Beignets at Cafe Du Monde",
      "Swamp tour",
    ],
    languages: ["English", "French Creole"],
    ageRecommendation: "All ages",
    owner: "New Orleans CVB",
    photos: [],
  },
  {
    id: "d6",
    name: "Swiss Alps",
    location: "Switzerland",
    description:
      "Majestic mountain range with world-class skiing, hiking, and some of the most breathtaking scenery on the planet.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
    rating: 4.8,
    price: 280,
    tags: ["nature", "adventure"],
    favorites: 2670,
    thingsToDo: [
      "Jungfraujoch railway",
      "Skiing in Zermatt",
      "Lake Geneva cruise",
      "Cheese fondue experience",
    ],
    languages: ["German", "French", "Italian"],
    ageRecommendation: "All ages",
    owner: "Switzerland Tourism",
    photos: [],
  },
];

export async function seedDestinations(): Promise<void> {
  for (const dest of DESTINATIONS) {
    const { id, ...data } = dest;
    await setDoc(doc(db, "destinations", id), data);
    console.log(`Seeded: ${dest.name}`);
  }
  console.log("Done seeding destinations.");
}
