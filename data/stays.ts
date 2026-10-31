import type { Stay } from "./types";
import { images } from "@/lib/images";

/**
 * PLACEHOLDER stays. Names are generic stand-ins until partner agreements are signed.
 * Never replace these with a real camp's name without a signed agreement.
 */
export const stays: Stay[] = [
  {
    slug: "terelj-river-camp",
    name: "Terelj river camp",
    placeholder: true,
    region: "ulaanbaatar-terelj",
    comfort: "comfortable",
    description:
      "A quiet cluster of gers on a river bend among granite outcrops, close enough to Ulaanbaatar for a first or last night but far enough for real silence. Mornings start with mist on the water and horses grazing below the larch slopes.",
    facilities: [
      "Shared hot showers and flush toilets",
      "Wood-burning stove in every ger",
      "Proper beds with warm bedding",
      "Dining ger serving Mongolian and Western dishes",
      "Mains power for charging in the dining ger",
    ],
    image: images.gerCampPath,
  },
  {
    slug: "orkhon-valley-camp",
    name: "Orkhon valley camp",
    placeholder: true,
    region: "central-mongolia",
    comfort: "comfortable",
    description:
      "Set on open pasture above the Orkhon river, this camp is our base for riding days and visits to neighbouring herding families. Expect wide skies, the sound of the river at night and horses saddled at the door.",
    facilities: [
      "Shared hot showers and flush toilets",
      "Wood-burning stove in every ger",
      "Solar power, charging in the dining ger",
      "Hearty set meals, with vegetarian options on request",
      "Tack room and horse lines on site",
    ],
    image: images.steppeRiverGers,
  },
  {
    slug: "gobi-dunes-camp",
    name: "Gobi dunes camp",
    placeholder: true,
    region: "gobi",
    comfort: "luxury",
    description:
      "Spacious gers looking out across gravel plains to a long wall of sand dunes, with private bathrooms and the kind of night sky the Gobi is known for. A comfortable place to recover after long desert drives without losing the sense of where you are.",
    facilities: [
      "Private bathroom with hot shower in each ger",
      "Wood-burning stove and extra blankets for cold desert nights",
      "Restaurant ger with a seasonal menu",
      "Solar and generator power, charging in every ger",
      "Stargazing deck away from camp lights",
      "Camel rides arranged with local herders",
    ],
    image: images.gerCampDusk,
  },
  {
    slug: "khovsgol-lakeshore-camp",
    name: "Khövsgöl lakeshore camp",
    placeholder: true,
    region: "north-khovsgol",
    comfort: "comfortable",
    description:
      "Gers and a few timber cabins set among larch trees on the western shore of the lake, a short walk from water so clear you can count the stones. Evenings are cool even in high summer, so the stove is lit most nights.",
    facilities: [
      "Shared hot showers and flush toilets",
      "Wood-burning stove in every ger",
      "Sauna by the shore",
      "Dining hall with lake views",
      "Generator power in the evenings, charging in the dining hall",
    ],
    image: images.gerLarchHillside,
  },
  {
    slug: "altai-family-gers",
    name: "Altai family gers",
    placeholder: true,
    region: "far-west-altai",
    comfort: "traditional",
    description:
      "Guest gers pitched beside the home of a Kazakh herding family in a high valley below the Altai, run by the family themselves. You eat what they eat, sleep under hand-stitched felt hangings and wake to the sounds of the herd being moved out.",
    facilities: [
      "Long-drop toilet a short walk from the gers",
      "Bowl-and-jug washing; hot water heated on the stove",
      "Wood or dung-burning stove in every ger",
      "Home-cooked Kazakh meals with the family",
      "Small solar panel for phone charging; no other power",
    ],
    image: images.gerOrnateDoor,
  },
  {
    slug: "khentii-steppe-camp",
    name: "Khentii steppe camp",
    placeholder: true,
    region: "east-khentii",
    comfort: "traditional",
    description:
      "A small, simple camp on the rolling eastern grasslands, where rivers wind through birch-lined valleys and you can ride for hours without crossing a road. Basic in the best sense: good food, warm gers and an enormous amount of space.",
    facilities: [
      "Shared showers with hot water at set times",
      "Long-drop toilets kept clean daily",
      "Wood-burning stove in every ger",
      "Solar power, charging in the dining ger",
      "Simple home-style meals",
    ],
    image: images.steppeLoneGer,
  },
];
