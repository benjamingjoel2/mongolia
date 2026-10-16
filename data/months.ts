import { images } from "@/lib/images";
import type { MonthGuide } from "./types";

export const months: MonthGuide[] = [
  {
    month: 1,
    name: "January",
    dayTempC: [-20, -14],
    nightTempC: -30,
    conditions:
      "The coldest month, with clear skies, still air and very few visitors. Winter trips suit experienced travellers, and Tsagaan Sar can fall in late January in some years.",
    rating: 1,
    festivals: ["tsagaan-sar"],
    bestRegions: ["ulaanbaatar-terelj", "far-west-altai"],
    image: images.gerSnow,
  },
  {
    month: 2,
    name: "February",
    dayTempC: [-16, -9],
    nightTempC: -26,
    conditions:
      "Still deep winter, with bright, cold days and snow on the steppe. Tsagaan Sar often falls this month, a rare chance to join a family celebration for well-prepared travellers.",
    rating: 1,
    festivals: ["tsagaan-sar"],
    bestRegions: ["ulaanbaatar-terelj", "central-mongolia"],
    image: images.goatsSnow,
  },
  {
    month: 3,
    name: "March",
    dayTempC: [-8, 0],
    nightTempC: -18,
    conditions:
      "Cold but sunnier, with lengthening days and winds picking up. Ice and camel festivals usually fall in early March, giving winter trips a strong focus.",
    rating: 2,
    festivals: ["khovsgol-ice-festival", "thousand-camel-festival"],
    bestRegions: ["north-khovsgol", "gobi"],
    image: images.frozenRiver,
  },
  {
    month: 4,
    name: "April",
    dayTempC: [2, 10],
    nightTempC: -6,
    conditions:
      "A changeable month of thawing ground, dust storms and occasional snow. Few travellers and newborn animals in the herds, but brown landscapes and unpredictable weather.",
    rating: 2,
    festivals: [],
    bestRegions: ["gobi", "central-mongolia"],
    image: images.horsesDust,
  },
  {
    month: 5,
    name: "May",
    dayTempC: [10, 18],
    nightTempC: 1,
    conditions:
      "Warming quickly but still windy, with green just starting to show. A good shoulder month for the Gobi before the summer heat and before the main season crowds.",
    rating: 3,
    festivals: [],
    bestRegions: ["gobi", "ulaanbaatar-terelj", "central-mongolia"],
    image: images.camelsPlain,
  },
  {
    month: 6,
    name: "June",
    dayTempC: [17, 24],
    nightTempC: 8,
    conditions:
      "Green steppe, long days and comfortable temperatures mark the start of the main travel season, which runs roughly June to September. Good for every region, with fewer visitors than July.",
    rating: 5,
    festivals: [],
    bestRegions: ["central-mongolia", "north-khovsgol", "far-west-altai", "gobi", "east-khentii"],
    image: images.steppeRiverGers,
  },
  {
    month: 7,
    name: "July",
    dayTempC: [22, 28],
    nightTempC: 12,
    conditions:
      "The warmest and busiest month, with occasional heavy afternoon showers. Naadam brings festival energy to every corner of the country, so book early.",
    rating: 5,
    festivals: ["naadam"],
    bestRegions: ["ulaanbaatar-terelj", "central-mongolia", "north-khovsgol", "far-west-altai", "east-khentii"],
    image: images.naadamGrounds,
  },
  {
    month: 8,
    name: "August",
    dayTempC: [19, 26],
    nightTempC: 10,
    conditions:
      "Warm and green, though often the wettest month, with rain showers and lush pastures. Excellent for riding, trekking in the Altai and summer dairy in the countryside.",
    rating: 5,
    festivals: [],
    bestRegions: ["north-khovsgol", "far-west-altai", "central-mongolia", "east-khentii"],
    image: images.horseHerdGreen,
  },
  {
    month: 9,
    name: "September",
    dayTempC: [11, 19],
    nightTempC: 2,
    conditions:
      "Crisp, clear days, golden larch and quieter roads as the summer crowds fade. One of the best months for photography, the Gobi and the Altai, with a smaller Sagsai eagle festival often held mid to late month.",
    rating: 4,
    festivals: [],
    bestRegions: ["gobi", "far-west-altai", "north-khovsgol", "central-mongolia"],
    image: images.autumnRiverMountains,
  },
  {
    month: 10,
    name: "October",
    dayTempC: [2, 9],
    nightTempC: -8,
    conditions:
      "Cold nights and the first snows on the high ground, with few other travellers. The Golden Eagle Festival near Ölgii, typically on the first weekend, is the month's great draw.",
    rating: 3,
    festivals: ["golden-eagle-festival"],
    bestRegions: ["far-west-altai", "gobi"],
    image: images.eagleHuntersGroup,
  },
  {
    month: 11,
    name: "November",
    dayTempC: [-8, -2],
    nightTempC: -18,
    conditions:
      "Winter settles in fast, with short days and frozen rivers. Quiet and austere, suited to experienced travellers seeking eagle hunting in the Altai.",
    rating: 2,
    festivals: [],
    bestRegions: ["far-west-altai", "ulaanbaatar-terelj"],
    image: images.eagleRiderSlope,
  },
  {
    month: 12,
    name: "December",
    dayTempC: [-17, -11],
    nightTempC: -27,
    conditions:
      "Deep cold, clear skies and the longest nights of the year. A month for hardy winter travellers, with snowy steppe, quiet monasteries and smoky city air in Ulaanbaatar.",
    rating: 1,
    festivals: [],
    bestRegions: ["ulaanbaatar-terelj", "far-west-altai"],
    image: images.walkerSnow,
  },
];
