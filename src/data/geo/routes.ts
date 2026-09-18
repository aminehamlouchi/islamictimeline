import type { TradeRoute } from "@/lib/types";

/** Major trade routes, schematic waypoint polylines, not surveyed paths. */
export const tradeRoutes: TradeRoute[] = [
  {
    id: "silk-road",
    label: "Silk Road (schematic)",
    fromYear: 600,
    toYear: 1500,
    points: [
      [108.94, 34.34], // Chang'an
      [75.99, 39.47], // Kashgar
      [66.96, 39.65], // Samarkand
      [64.42, 39.77], // Bukhara
      [62.16, 37.66], // Merv
      [58.8, 36.21], // Nishapur
      [51.43, 35.59], // Rayy
      [44.4, 33.34], // Baghdad
      [36.29, 33.51], // Damascus
    ],
  },
  {
    id: "trans-saharan",
    label: "Trans-Saharan routes (schematic)",
    fromYear: 750,
    toYear: 1600,
    points: [
      [-4.98, 34.06], // Fez
      [-4.28, 31.28], // Sijilmasa
      [-5.0, 23.5], // Taghaza (salt)
      [-3.01, 16.77], // Timbuktu
      [-0.04, 16.27], // Gao
    ],
  },
  {
    id: "indian-ocean",
    label: "Indian Ocean monsoon trade (schematic)",
    fromYear: 700,
    toYear: 1600,
    points: [
      [32.55, 29.97], // Suez/Red Sea head
      [39.19, 21.49], // Jeddah
      [45.03, 12.79], // Aden
      [58.41, 23.59], // Muscat
      [56.45, 27.1], // Hormuz
      [72.6, 22.3], // Gujarat (Cambay)
      [75.78, 11.25], // Calicut
      [102.25, 2.2], // Malacca
    ],
  },
  {
    id: "swahili-coast",
    label: "East African coastal trade (schematic)",
    fromYear: 800,
    toYear: 1600,
    points: [
      [45.03, 12.79], // Aden
      [45.34, 2.04], // Mogadishu
      [39.5, -8.96], // Kilwa
    ],
  },
];
