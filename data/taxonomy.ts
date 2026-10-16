import type { Activity, ComfortLevel, Difficulty, MonthNumber, Season, TripStyle } from "./types";

export const activityLabels: Record<Activity, string> = {
  overland: "4x4 overland",
  "horse-riding": "Horse riding",
  "camel-trekking": "Camel trekking",
  hiking: "Trekking",
  "eagle-hunting": "Eagle hunting",
  festival: "Festivals",
  culture: "Nomadic culture",
  photography: "Photography",
  family: "Family",
  wildlife: "Wildlife",
};

export const difficultyLabels: Record<Difficulty, { label: string; description: string; level: 1 | 2 | 3 | 4 }> = {
  easy: { label: "Easy", description: "Gentle walks and short rides. Long drives are the main effort.", level: 1 },
  moderate: { label: "Moderate", description: "Half-day hikes or rides, some rough roads and simple camps.", level: 2 },
  challenging: { label: "Challenging", description: "Full days in the saddle or on foot, basic camps, cold nights.", level: 3 },
  expedition: { label: "Expedition", description: "Remote, multi-day trekking at altitude. Good fitness essential.", level: 4 },
};

export const seasonLabels: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
};

export const styleLabels: Record<TripStyle, string> = {
  group: "Small group",
  private: "Private",
};

export const comfortLabels: Record<ComfortLevel, { label: string; description: string }> = {
  traditional: {
    label: "Traditional ger camps",
    description: "Family gers and simple camps. Shared, basic washing; the most authentic nights.",
  },
  comfortable: {
    label: "Comfortable ger camps",
    description: "Proper beds, wood stoves, hot showers and flush toilets in a shared block.",
  },
  luxury: {
    label: "Luxury ger camps",
    description: "Spacious gers with private bathrooms, fine linen and the best food on the steppe.",
  },
};

export const monthNames: Record<MonthNumber, string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const monthShort = (m: MonthNumber) => monthNames[m].slice(0, 3);

export interface DurationBucket {
  id: "short" | "medium" | "long";
  label: string;
  min: number;
  max: number;
}

export const durationBuckets: DurationBucket[] = [
  { id: "short", label: "Up to 9 days", min: 0, max: 9 },
  { id: "medium", label: "10 to 12 days", min: 10, max: 12 },
  { id: "long", label: "13 days or more", min: 13, max: 99 },
];
