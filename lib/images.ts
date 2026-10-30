/**
 * Placeholder photography (Unsplash licence). Every image was checked to show Mongolia
 * or a closely matching scene. Replace with commissioned photography before launch.
 */

export interface Img {
  src: string;
  alt: string;
  /** Natural orientation of the source photo, used to pick sensible crops. */
  orientation: "landscape" | "portrait";
}

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

function img(id: string, alt: string, orientation: Img["orientation"] = "landscape"): Img {
  return { src: u(id), alt, orientation };
}

export const images = {
  // Steppe and sky
  steppeLoneGer: img("1785042379212-af7cb35739d9", "A single white ger on an endless green steppe under a pale sky"),
  steppeRiverGers: img("1760776679643-0e28cbcd4214", "A cluster of gers beside a winding river on rolling green steppe"),
  gersSnowPeaks: img("1742205024727-245bb73b38e5", "Three gers on a golden plain below snow-streaked mountains"),
  altaiPlain: img("1589654615616-6756a5653100", "Wide brown steppe running to blue snow-capped mountains"),
  riverValleyGrey: img("1707669904569-072dbdd02e47", "A river crossing a broad green valley under heavy grey cloud"),
  greenHillsRocks: img("1751255593200-87d5abfe1bc8", "Green hills and granite outcrops under a bright blue sky"),
  steppeBigSky: img("1695197974691-96ab7764b112", "Endless green steppe beneath towering white clouds"),
  autumnRiverMountains: img("1742205024877-cc32e30dafcd", "A still river reflecting autumn grass and rust-coloured mountains"),

  // Gers
  gerCampValley: img("1575415868394-e3b78f3e9b3f", "Gers in a grassy valley with low mountains behind"),
  gerCampSunset: img("1547448271-fde9cf7d6afc", "A path leading to gers under a dramatic sunset sky", "portrait"),
  gerLarchHillside: img("1745155541534-0b611f491762", "A ger with its door open on a rocky hillside among larch trees"),
  gerInterior: img("1745155541633-da6d9bb28f5c", "Inside a ger: painted beds, a low table and colourful felt"),
  gerOrnateDoor: img("1695554477492-303aacd40561", "A ger with an ornate painted wooden door beside a granite cliff"),
  gerSnow: img("1645017130453-901f7d4d24e7", "A ger with a painted door half buried in snow"),
  gerSunsetCar: img("1749610391764-e27ccac1560c", "The sun setting behind a ger and a 4x4 on the open steppe"),
  gerCampPath: img("1672834625106-f1536519701b", "A stone path between gers in a green mountain valley"),
  gerCampDusk: img("1547448161-c56e75b54317", "A wide ger camp at dusk with mountains catching the last light"),
  gersFence: img("1713835877802-e3f21670064b", "Gers behind a wooden fence on a grassy rise"),

  // Horses and riders
  eagleHuntersRiver: img("1711127016876-9a1b7e05126f", "Kazakh eagle hunters on horseback splashing through a river, an eagle in flight"),
  horsesFestival: img("1742205368206-bbdf78727ad0", "Saddled horses and riders gathered on the steppe"),
  horsesDust: img("1584237863847-b21b4f7ccd4f", "Horses walking through golden dust on a hazy plain"),
  riderRidge: img("1742205025290-f8d83fe1bb58", "A lone rider on a ridge overlooking white mountains and plains"),
  wildHorses: img("1765881775363-300e01a6b61f", "Wild horses grazing on dry steppe grass"),
  horseHerdGreen: img("1717489578184-99ec316d7407", "A herd of horses running across a bright green steppe"),
  herderPreparingHorse: img("1742205368318-bc975a44d226", "A herder in a deel preparing a spotted horse before the mountains"),

  // Eagle hunters
  eagleHuntersPortrait: img("1773379418260-c34d07daf797", "Three Kazakh eagle hunters in embroidered dress with a golden eagle"),
  eagleRiderRiver: img("1742201911007-bedad5779a46", "An eagle hunter riding through a river with his eagle", "portrait"),
  eagleHunterHorseback: img("1742201934199-750a39f4c277", "An eagle hunter on horseback raising his golden eagle", "portrait"),
  eagleLaunch: img("1742201876634-94ac20075dc6", "A golden eagle taking off from a hunter's arm", "portrait"),
  eagleRiderSlope: img("1742201929743-90e14da35f28", "A rider with an eagle crossing a snowy mountain slope", "portrait"),
  eagleHuntersGroup: img("1742205334719-3f12786cc074", "Eagle hunters in fur coats gathered on horseback"),
  eagleHunterRock: img("1547371107-336f6b2de76a", "An eagle hunter crouching on a rock with his eagle", "portrait"),

  // Gobi
  dunesStorm: img("1773379409995-16f93486d845", "Golden dunes beneath a dark storm sky", "portrait"),
  duneClimber: img("1773379410738-effb7bf62b12", "A lone walker climbing a towering sand dune", "portrait"),
  flamingCliffs: img("1773379410075-122d44982a07", "Red sandstone cliffs glowing above the desert plain"),
  gorgeHikers: img("1773379410323-ad09969190cd", "Hikers in a narrow green gorge between rocky walls", "portrait"),
  camelsDunes: img("1571821807771-62cf66ac3f14", "Bactrian camels walking along the edge of sand dunes", "portrait"),
  camelLone: img("1707935976077-5fbb43b576de", "A saddled Bactrian camel standing on the open Gobi"),
  camelsPlain: img("1707935976047-b728dcf1d523", "Camels crossing a wide gravel plain"),
  camelPortrait: img("1587619220946-7ea28f3a4028", "Close portrait of a shaggy Bactrian camel"),
  camelsStars: img("1543693259-805446e1bcc3", "The Milky Way over resting camels in the desert"),
  duneRipples: img("1561991123-455af4470ffd", "Wind-rippled sand rising to a sharp dune crest"),

  // Khövsgöl and the North
  lakeBoat: img("1664770427500-5c812c9038d4", "A boat crossing a vast blue lake under broken cloud"),
  lakeSilver: img("1664770427522-816a575230ec", "Light breaking on a wide northern lake"),
  lakeshoreLarch: img("1639851769881-97e24e4c7fe1", "A larch tree on a grassy lakeshore under grey skies"),
  lakeTaiga: img("1665031400827-b6c2ee549c04", "Taiga forest running down to a long blue lake", "portrait"),
  lakeForestCove: img("1664770427537-f24e362b0c30", "A forested headland on a calm lake"),
  lakeStorm: img("1639851770004-5be574a7aae2", "Storm light over a dark lake"),
  reindeerSnow: img("1695324928226-3f7fc0043473", "A reindeer with tall antlers standing on frozen ground", "portrait"),
  reindeerHarness: img("1719247552735-f4832c547da2", "A white reindeer in a harness among pine trees"),

  // Altai and the Far West
  altaiGreenSnow: img("1619426288206-e678b4d09d2d", "Green valleys below a long wall of snowy peaks"),
  altaiPeaks: img("1717506638083-d0f97fa52904", "Snow-capped peaks rising above forested slopes", "portrait"),
  altaiLake: img("1673335055461-d39091a6533e", "A turquoise mountain lake between steep forested slopes"),
  altaiPinkPeaks: img("1742205024236-54b3c6dffb99", "Snowy mountains turning pink in evening light"),
  altaiGoldenPlain: img("1742205024280-02ab2ab5207a", "Snow-capped mountains above a golden autumn plain"),
  rockyRidgeWinter: img("1711125265155-35d2d5fff83b", "A golden rocky ridge dusted with snow"),

  // Ulaanbaatar, culture, history
  chinggisStatue: img("1708873395735-dcad0140e3a2", "The giant steel statue of Chinggis Khaan on horseback"),
  ulaanbaatarSkyline: img("1711919343092-cb3c38989d5a", "Ulaanbaatar at golden hour with hills behind the city"),
  monasteryCourtyard: img("1706901549707-908e73f91f66", "A Buddhist temple courtyard with red pillars and curved roofs"),
  governmentPalace: img("1588737036653-2e88a952b93d", "The colonnaded government palace in central Ulaanbaatar", "portrait"),
  templeRoof: img("1695553895173-f0e57e7e81a1", "Carved temple roof detail against a blue sky"),
  naadamGrounds: img("1585218225329-fbac29c1c926", "Crowds and tents on the grassy festival grounds"),
  musicians: img("1585218225186-344c33ae570a", "Musicians in traditional dress playing string instruments"),
  herderPortrait: img("1784035117363-ac1dffdead3a", "A herder in a long deel standing among gers"),
  teaWithHerders: img("1742205367575-c7209db8ce81", "A herding family sharing tea and food beside a white horse"),
  herderCamels: img("1561990768-fc6c571931cc", "A herder in a deel sitting with resting camels", "landscape"),
  sheepMountain: img("1589654888866-4b717275499f", "Sheep and goats grazing below a dark volcanic hill"),

  // Winter and night
  goatsSnow: img("1709718095857-81b88db6c822", "Cashmere goats and yaks gathered on snowy steppe"),
  walkerSnow: img("1711124478481-09eb00111938", "A figure in red walking across snowy steppe"),
  frozenDunes: img("1548141262-b6e455ea61bf", "Wind-sculpted snow drifts on a winter plain"),
  frozenRiver: img("1695741966940-7c0fbde8aff4", "A frozen river at dawn with violet light on the ice"),
  tentMilkyWay: img("1638862925201-4e373cb6a630", "A glowing tent under the Milky Way", "portrait"),
  milkyWaySteppe: img("1662747975359-9c40ddd55551", "The Milky Way arching over a dark steppe horizon"),
} satisfies Record<string, Img>;

export type ImageKey = keyof typeof images;

/** Build a sized Unsplash URL (used outside next/image, e.g. OG images). */
export function sized(image: Img, width: number, quality = 75) {
  return `${image.src}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
