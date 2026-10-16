import type { Person } from "./types";
import { images } from "@/lib/images";

/**
 * PLACEHOLDER team profiles. Names and bios are stand-ins until real profiles and
 * portraits are supplied. Images are scene photography, not portraits of these people.
 */
export const people: Person[] = [
  {
    slug: "specialist-saraa",
    name: "Saraa (placeholder)",
    placeholder: true,
    role: "specialist",
    title: "Trip specialist",
    bio: "Saraa is your single point of contact from first enquiry to the drive back to the airport, shaping every route, camp and departure around how you want to travel. She grew up between Ulaanbaatar and her grandparents' summer pastures, and knows exactly how long that 'short' drive really takes.",
    languages: ["Mongolian", "English", "Russian"],
    regions: ["ulaanbaatar-terelj", "central-mongolia", "gobi", "north-khovsgol", "far-west-altai", "east-khentii"],
    image: images.teaWithHerders,
  },
  {
    slug: "guide-bat",
    name: "Bat (placeholder)",
    placeholder: true,
    role: "guide",
    title: "Riding and overland guide",
    bio: "Bat has spent most of his life in the saddle and leads our horse treks through the Orkhon valley and the Khangai foothills. He reads weather, pasture and horses the way other people read maps, and is quietly brilliant at matching nervous riders with steady mounts.",
    languages: ["Mongolian", "English"],
    regions: ["central-mongolia", "ulaanbaatar-terelj", "east-khentii"],
    image: images.riderRidge,
  },
  {
    slug: "guide-oyuna",
    name: "Oyuna (placeholder)",
    placeholder: true,
    role: "guide",
    title: "Culture and Gobi guide",
    bio: "Oyuna studied history in Ulaanbaatar before swapping lecture halls for the Gobi, where she guides our desert and Naadam journeys. Ask her about monasteries, fossil beds or the etiquette of a herder's ger and you will get a thoughtful answer, usually with a story attached.",
    languages: ["Mongolian", "English", "German"],
    regions: ["gobi", "central-mongolia", "ulaanbaatar-terelj"],
    image: images.herderPortrait,
  },
  {
    slug: "guide-tuya",
    name: "Tuya (placeholder)",
    placeholder: true,
    role: "guide",
    title: "Northern lakes and family trips guide",
    bio: "Tuya leads our trips around Khövsgöl and our family departures, and has a knack for turning a long drive into a game and a wet afternoon into a felt-making lesson. She has close friendships with herding families in the north and introduces guests as friends, not customers.",
    languages: ["Mongolian", "English"],
    regions: ["north-khovsgol", "central-mongolia"],
    image: images.herderPreparingHorse,
  },
  {
    slug: "guide-erlan",
    name: "Erlan (placeholder)",
    placeholder: true,
    role: "guide",
    title: "Altai and eagle traditions guide",
    bio: "Erlan is a Kazakh guide from Bayan-Ölgii whose family has kept golden eagles for generations. He leads our Altai treks and eagle festival expeditions, and opens doors in the far west that few visitors ever walk through.",
    languages: ["Kazakh", "Mongolian", "English"],
    regions: ["far-west-altai"],
    image: images.eagleHunterHorseback,
  },
  {
    slug: "driver-ganaa",
    name: "Ganaa (placeholder)",
    placeholder: true,
    role: "driver",
    title: "Expedition driver",
    bio: "Ganaa has driven every corner of the country and can fix most mechanical problems with whatever is in the back of the vehicle. Calm on washboard tracks and river crossings, he knows where the best roadside noodle soup is in almost every province.",
    languages: ["Mongolian", "Basic English"],
    regions: ["gobi", "central-mongolia", "far-west-altai", "north-khovsgol", "east-khentii"],
    image: images.gerSunsetCar,
  },
];
