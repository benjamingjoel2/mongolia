import { images } from "@/lib/images";
import type { Region } from "./types";

export const regions: Region[] = [
  {
    slug: "ulaanbaatar-terelj",
    name: "Ulaanbaatar and Terelj",
    shortName: "Ulaanbaatar & Terelj",
    tagline: "Capital energy, granite valleys an hour away",
    summary:
      "Start in a fast-changing capital of monasteries and markets, then trade traffic for the larch forests and granite tors of Gorkhi-Terelj National Park.",
    story:
      "Ulaanbaatar hums with traffic, prayer wheels and new ideas, yet the city gives way to open country faster than you would think. Within ninety minutes the road climbs into Terelj, where *granite towers stand over quiet river meadows* and herders still move their flocks between valleys with the seasons.",
    hero: images.ulaanbaatarSkyline,
    gallery: [images.monasteryCourtyard, images.chinggisStatue, images.greenHillsRocks],
    places: [
      {
        name: "Gandan Monastery",
        description:
          "The capital's great working monastery, home to young monks, morning chanting and a towering standing statue of Avalokiteshvara (Migjid Janraisig).",
        image: images.templeRoof,
      },
      {
        name: "Chinggis Khaan Statue Complex",
        description:
          "A vast stainless-steel equestrian statue on the steppe east of the city; climb inside to stand on the horse's head and look out over the Tuul valley.",
        image: images.chinggisStatue,
      },
      {
        name: "Gorkhi-Terelj National Park",
        description:
          "Larch-fringed valleys, the Tuul and Terelj rivers and weathered granite formations, including the famous Turtle Rock.",
        image: images.greenHillsRocks,
      },
      {
        name: "Aryabal Meditation Temple",
        description:
          "A small hillside temple reached by a footbridge and a long flight of steps, with wide views across the Terelj valley.",
        image: images.gerOrnateDoor,
      },
    ],
    bestMonths: [5, 6, 7, 8, 9],
    highlights: [
      "Morning chanting at Gandan Monastery",
      "Standing on the head of the Chinggis Khaan statue",
      "Walking among granite tors in Gorkhi-Terelj",
      "The climb to Aryabal Meditation Temple",
      "A first night in a ger within easy reach of the capital",
    ],
    map: { x: 59.6, y: 40.0 },
    gettingThere:
      "Most international flights land at Chinggis Khaan International Airport, about an hour south of the city centre. Terelj is roughly 1.5 to 2 hours' drive from central Ulaanbaatar, depending on traffic.",
    seo: {
      title: "Ulaanbaatar and Terelj | Steppe & Sky",
      description:
        "Monasteries, the Chinggis Khaan statue and the granite valleys of Gorkhi-Terelj National Park: where most Mongolian journeys begin.",
    },
  },
  {
    slug: "central-mongolia",
    name: "Central Mongolia",
    shortName: "Central Mongolia",
    tagline: "Old capitals, wild horses, rivers and dunes",
    summary:
      "The historic heart of the steppe: Kharkhorin and Erdene Zuu, the Orkhon Valley's UNESCO-listed landscape, and the wild takhi of Khustai.",
    story:
      "This is where empires were run from the saddle. Kharkhorin's monastery walls rise above the plain, the Orkhon River carves through volcanic rock, and at dusk in Khustai *the wild horses come down to drink*. Between them, herding families keep camps much as their grandparents did.",
    hero: images.steppeRiverGers,
    gallery: [images.wildHorses, images.monasteryCourtyard, images.riverValleyGrey],
    places: [
      {
        name: "Kharkhorin and Erdene Zuu",
        description:
          "Near the site of Karakorum, the 13th-century imperial capital, Erdene Zuu Monastery sits inside a wall crowned with 108 white stupas.",
        image: images.monasteryCourtyard,
      },
      {
        name: "Orkhon Valley",
        description:
          "A UNESCO-listed cultural landscape of river meadows and old stone, with the Ulaan Tsutgalan waterfall and the hilltop Tövkhön Monastery.",
        image: images.riverValleyGrey,
      },
      {
        name: "Khustai National Park",
        description:
          "Rolling hills where takhi, the wild Przewalski's horse, were reintroduced from the 1990s after vanishing from the wild.",
        image: images.wildHorses,
      },
      {
        name: "Elsen Tasarkhai",
        description:
          "A long ribbon of sand dunes running through green steppe, a taste of the Gobi without the long drive south.",
        image: images.duneRipples,
      },
    ],
    bestMonths: [6, 7, 8, 9],
    highlights: [
      "The stupa-lined walls of Erdene Zuu",
      "Watching takhi at dusk in Khustai",
      "Riding through the Orkhon Valley",
      "The hike to Tövkhön Monastery",
      "Ulaan Tsutgalan waterfall after summer rain",
    ],
    map: { x: 46.9, y: 46.7 },
    gettingThere:
      "Khustai is about two hours' drive west of Ulaanbaatar and Kharkhorin roughly six to seven hours on paved road. The Orkhon waterfall adds several more hours of rough track beyond Kharkhorin.",
    seo: {
      title: "Central Mongolia: Kharkhorin and Orkhon | Steppe & Sky",
      description:
        "Erdene Zuu, the UNESCO-listed Orkhon Valley, wild takhi in Khustai and the dunes of Elsen Tasarkhai, in Mongolia's historic heartland.",
    },
  },
  {
    slug: "gobi",
    name: "The Gobi",
    shortName: "The Gobi",
    tagline: "Singing dunes, red cliffs, desert silence",
    summary:
      "Sweeping gravel plains, towering dunes and fossil-rich cliffs in Mongolia's south, home to herders and their two-humped camels.",
    story:
      "The Gobi is not empty sand but a huge, varied desert of gravel plains, saxaul scrub and mountains. Climb Khongoryn Els at sunset and the dunes may hum under your feet, then camp where *the night sky reaches the ground on every side*.",
    hero: images.dunesStorm,
    gallery: [images.flamingCliffs, images.camelsDunes, images.gorgeHikers],
    places: [
      {
        name: "Khongoryn Els",
        description:
          "Known as the singing dunes for the low hum the sand can make as it slides, rising up to around 300 metres and stretching for about 100 km.",
        image: images.duneClimber,
      },
      {
        name: "Flaming Cliffs (Bayanzag)",
        description:
          "Red sandstone cliffs where Roy Chapman Andrews' expeditions found the first recognised dinosaur eggs in the 1920s.",
        image: images.flamingCliffs,
      },
      {
        name: "Yolyn Am",
        description:
          "A narrow gorge in the Gurvan Saikhan mountains where shaded ice can linger well into summer, though in recent years it often melts earlier.",
        image: images.gorgeHikers,
      },
    ],
    bestMonths: [5, 6, 9, 10],
    highlights: [
      "Climbing Khongoryn Els at sunset",
      "Riding Bactrian camels with herding families",
      "Golden light on the Flaming Cliffs",
      "Walking the narrow walls of Yolyn Am",
      "Some of the darkest night skies in Asia",
    ],
    map: { x: 49.1, y: 79.0 },
    gettingThere:
      "Domestic flights to Dalanzadgad take around 1.5 hours from Ulaanbaatar; by road it is a long day of about nine to ten hours. Khongoryn Els is several hours' further drive from Dalanzadgad.",
    seo: {
      title: "The Gobi Desert | Steppe & Sky",
      description:
        "Khongoryn Els, the Flaming Cliffs and Yolyn Am: camel treks, dune camps and dinosaur country in Mongolia's Gobi.",
    },
  },
  {
    slug: "north-khovsgol",
    name: "The North",
    shortName: "The North",
    tagline: "Clear water, larch forest, reindeer country",
    summary:
      "Lake Khövsgöl's deep blue water, larch-covered shores and the taiga beyond, home to the Dukha reindeer herders.",
    story:
      "Khövsgöl feels like another country: cold, clear water stretching north towards Siberia, larch forest on every shore and yaks grazing the meadows. Beyond the lake, in the taiga, the Dukha move with their reindeer, *a way of life carried by very few families*.",
    hero: images.lakeTaiga,
    gallery: [images.lakeBoat, images.reindeerHarness, images.lakeshoreLarch],
    places: [
      {
        name: "Lake Khövsgöl",
        description:
          "Mongolia's deepest lake and its largest store of fresh water, commonly cited as around 2% of the world's fresh water.",
        image: images.lakeBoat,
      },
      {
        name: "Khatgal",
        description:
          "A small town at the lake's southern tip and the usual base for boat trips, riding and hikes along the western shore.",
        image: images.lakeshoreLarch,
      },
      {
        name: "The Taiga and the Dukha",
        description:
          "Remote forest west of the lake where Dukha (Tsaatan) families herd reindeer; visits are arranged with the community and kept small and unhurried.",
        image: images.reindeerHarness,
      },
    ],
    bestMonths: [6, 7, 8, 9],
    highlights: [
      "Paddling or boating on Lake Khövsgöl",
      "Riding the forested western shore",
      "Time with Dukha reindeer herders, arranged through the community",
      "Hiking ridges above the lake",
      "The ice festival in winter, usually early March",
    ],
    map: { x: 39.4, y: 10.5 },
    gettingThere:
      "Flights to Mörön take around 1.5 hours, followed by about two hours by road to Khatgal; driving from Ulaanbaatar takes two long days. Reaching the Dukha camps adds a long drive and then a ride of a day or more on horseback.",
    seo: {
      title: "Lake Khövsgöl and the North | Steppe & Sky",
      description:
        "Lake Khövsgöl, Khatgal and respectful visits with Dukha reindeer herders in the taiga of northern Mongolia.",
    },
  },
  {
    slug: "far-west-altai",
    name: "The Far West",
    shortName: "The Far West",
    tagline: "Glaciers, Kazakh culture and golden eagles",
    summary:
      "Mongolia's highest mountains and Kazakh heartland, where glaciers feed turquoise lakes and eagle hunters ride out in autumn.",
    story:
      "In Bayan-Ölgii the language, food and music shift: this is Kazakh country, ringed by the Altai's ice. Families still train golden eagles here, and on a clear morning *a hunter's bird can lift off into air so sharp it rings*, out over valleys that funnel towards Khüiten's summit.",
    hero: images.eagleHuntersRiver,
    gallery: [images.altaiGreenSnow, images.eagleHuntersPortrait, images.altaiLake],
    places: [
      {
        name: "Altai Tavan Bogd National Park",
        description:
          "Five sacred peaks, long glacial valleys, petroglyphs and lakes such as Khoton and Khurgan on the borders with China and Russia.",
        image: images.altaiGreenSnow,
      },
      {
        name: "Khüiten Peak and the Potanin Glacier",
        description:
          "Mongolia's highest summit, at around 4,374 metres, above the Potanin, the country's largest glacier and a superb trekking objective.",
        image: images.altaiPeaks,
      },
      {
        name: "Ölgii and Kazakh Culture",
        description:
          "The provincial centre, with its mosques, bazaar and Kazakh-speaking community, and the gateway to eagle-hunting families.",
        image: images.eagleHuntersPortrait,
      },
      {
        name: "Eagle Hunting Families",
        description:
          "Burkitshi train golden eagles to hunt foxes and hares in winter, a skill passed down through generations.",
        image: images.eagleLaunch,
      },
    ],
    bestMonths: [6, 7, 8, 9, 10],
    highlights: [
      "Trekking towards the Potanin Glacier",
      "Time with Kazakh eagle hunters",
      "The Golden Eagle Festival in early October",
      "Turquoise lakes of Altai Tavan Bogd",
      "Kazakh hospitality, music and embroidered felt",
    ],
    map: { x: 7.0, y: 29.8 },
    gettingThere:
      "Flights from Ulaanbaatar to Ölgii take around three to four hours; driving takes four or more long days. Base camp below the Potanin Glacier is a further day's drive from Ölgii.",
    seo: {
      title: "The Altai and Bayan-Ölgii | Steppe & Sky",
      description:
        "Altai Tavan Bogd, Khüiten peak, the Potanin Glacier and Kazakh eagle hunters in Mongolia's far west.",
    },
  },
  {
    slug: "east-khentii",
    name: "The East",
    shortName: "The East",
    tagline: "The homeland of Chinggis Khaan",
    summary:
      "Forested Khentii mountains and wide eastern grasslands, the landscape that shaped the young Temüjin and the Mongol Empire.",
    story:
      "Few visitors head east, which is part of the appeal. The Khentii mountains roll out in forest and meadow, rivers run clear, and every valley seems tied to Temüjin's early years. Further on, *grassland runs unbroken to the horizon*, some of the largest intact steppe left on Earth.",
    hero: images.steppeBigSky,
    gallery: [images.horseHerdGreen, images.riderRidge, images.autumnRiverMountains],
    places: [
      {
        name: "Burkhan Khaldun",
        description:
          "The sacred mountain of the Khentii range, linked to Chinggis Khaan's life and listed by UNESCO; access to the sacred area is restricted and respectful.",
        image: images.gerLarchHillside,
      },
      {
        name: "Khökh Nuur",
        description:
          "A small lake below Khar Zurkh mountain, where Temüjin is said to have been proclaimed khan.",
        image: images.autumnRiverMountains,
      },
      {
        name: "Binder and Dadal",
        description:
          "Riverside soums with forest, horse country and local traditions tied to Chinggis Khaan's birthplace, which tradition places near Dadal.",
        image: images.riderRidge,
      },
      {
        name: "The Eastern Steppe",
        description:
          "Wide, open grasslands where Mongolian gazelle still move in large herds across the plains.",
        image: images.steppeBigSky,
      },
    ],
    bestMonths: [6, 7, 8, 9],
    highlights: [
      "Riding through Khentii forest and meadow",
      "Places tied to Chinggis Khaan's early life",
      "Swimming in clear eastern rivers",
      "Big skies over the eastern grasslands",
      "Very few other travellers",
    ],
    map: { x: 67.7, y: 36.2 },
    gettingThere:
      "There are no regular flights; Binder is around eight to ten hours by road from Ulaanbaatar and Dadal a little further, with long stretches of unpaved track.",
    seo: {
      title: "Khentii and the East | Steppe & Sky",
      description:
        "Burkhan Khaldun, Khökh Nuur, Binder and Dadal: ride through Chinggis Khaan's homeland and Mongolia's wide eastern steppe.",
    },
  },
];
