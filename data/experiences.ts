import { images } from "@/lib/images";
import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    slug: "nomad-family-ger-stay",
    title: "Staying with Nomad Families",
    summary:
      "Sleep in a family ger, help with the herds and share the rhythm of a working nomadic camp.",
    story:
      "The door opens to the south, the stove crackles at the centre and tea is poured before you have finished sitting down. A night in a herding family's ger is *hospitality offered without fuss*, and an honest window onto life lived with the seasons.",
    body: [
      "Around a quarter of Mongolians still live a mobile or semi-mobile herding life, moving between summer and winter pastures with their sheep, goats, horses, yaks or camels. We work with families who choose to host travellers, staying either in a guest ger beside theirs or, by invitation, sharing their own.",
      "Days follow the animals. You might help milk mares or goats, bring the herds in at dusk, collect dried dung for the stove or simply sit and talk through your guide. Nothing is staged, so the pace depends on the season and what needs doing.",
      "Comfort is simple: felt walls, painted beds, a wood or dung stove and a pit toilet a short walk away. Bring a sleeping bag liner, a head torch and a small gift for the family; your guide will help with ideas that are useful rather than showy.",
      "Families are paid fairly and directly for hosting, and we rotate visits so no single camp carries the weight of guests through the summer.",
    ],
    regions: ["central-mongolia", "gobi", "north-khovsgol", "far-west-altai", "east-khentii"],
    months: [5, 6, 7, 8, 9],
    etiquette: [
      "Do not step on or lean on the threshold when entering a ger.",
      "Move clockwise inside the ger and avoid walking between the central posts.",
      "Accept tea, food and gifts with your right hand, or with both hands, supporting the right elbow with the left.",
      "Do not point your feet at the stove or the family altar at the back of the ger.",
      "Ask before taking photographs of people or the inside of the home.",
    ],
    hero: images.herderPortrait,
    gallery: [images.gerInterior, images.teaWithHerders, images.steppeLoneGer],
    adventures: [
      "classic-mongolia-gobi-kharkhorin",
      "family-nomad-adventure",
      "orkhon-valley-horse-trek",
      "khovsgol-reindeer-herders",
    ],
    seo: {
      title: "Stay with Nomad Families in a Ger | Steppe & Sky",
      description:
        "Sleep in a herding family's ger, help with the animals and learn the etiquette of Mongolian nomadic hospitality.",
    },
  },
  {
    slug: "horse-riding",
    title: "Horse Riding",
    summary:
      "Ride sturdy Mongolian horses across open steppe, river valleys and forested hills with local horsemen.",
    story:
      "Mongolian horses are small, tough and half wild, and they know the country better than any map. Ride out with a herder and *the land opens at the pace of hooves*: no fences, no roads, just the next ridge and the river beyond it.",
    body: [
      "Horses are central to Mongolian life, and there are more of them than people. They are compact, sure-footed and spirited, bred to live outdoors all year. Riding one is the most natural way to travel the steppe.",
      "Our rides range from a gentle few hours near camp to multi-day treks in the Orkhon Valley, around Lake Khövsgöl or through the Khentii, with gear carried by pack horse or support vehicle. Local horsemen ride with every group, choose horses to suit each rider and set the pace.",
      "Mongolian saddles are traditionally wooden and high; we offer Russian-style or Western saddles on longer treks. Riding helmets are provided, and we ask for an honest description of your experience so we can match you with the right horse.",
      "Novice riders are welcome on shorter rides. Multi-day treks suit those comfortable in the saddle for five or six hours a day, at a walk and trot with the occasional canter.",
    ],
    regions: ["central-mongolia", "north-khovsgol", "east-khentii", "ulaanbaatar-terelj", "far-west-altai"],
    months: [6, 7, 8, 9],
    etiquette: [
      "Approach and mount a Mongolian horse from the left, as herders do.",
      "Follow your horseman's lead on pace and never gallop past the group.",
      "Do not step over a lasso pole (uurga) or a saddle.",
    ],
    hero: images.riderRidge,
    gallery: [images.herderPreparingHorse, images.horseHerdGreen, images.riderRidge],
    adventures: ["orkhon-valley-horse-trek", "khovsgol-reindeer-herders", "family-nomad-adventure"],
    seo: {
      title: "Horse Riding in Mongolia | Steppe & Sky",
      description:
        "Ride Mongolian horses with local horsemen through the Orkhon Valley, around Lake Khövsgöl and across the Khentii hills.",
    },
  },
  {
    slug: "camel-trekking",
    title: "Camel Trekking",
    summary:
      "Travel the Gobi on the back of a two-humped Bactrian camel, guided by the herders who raise them.",
    story:
      "A Bactrian camel rises in two lurching stages, then settles into a slow, rocking stride. Along the edge of Khongoryn Els, with a herder walking ahead, *the desert finally makes sense at camel pace*: wide, quiet and full of small detail.",
    body: [
      "Mongolia's camels are Bactrian, with two humps, a thick winter coat and the ability to cope with both summer heat and bitter winter cold. Gobi families raise them for wool, milk, meat and transport.",
      "Most visitors ride for an hour or two near the dunes, sitting comfortably between the humps. Our longer treks spend several days moving between camps on foot and by camel, with a support vehicle carrying tents and supplies.",
      "Camels are led by herders throughout, so no experience is needed. Expect a gentle pace, wide-legged comfort and a strong argument for cushioned trousers.",
    ],
    regions: ["gobi"],
    months: [5, 6, 7, 8, 9, 10],
    etiquette: [
      "Let the herder couch (seat) the camel before you mount or dismount.",
      "Avoid walking directly behind camels, and keep calm movements around them.",
      "Ask before photographing herders and their families.",
    ],
    hero: images.camelsDunes,
    gallery: [images.camelPortrait, images.herderCamels, images.camelsPlain],
    adventures: ["gobi-camel-trek-dune-camping", "classic-mongolia-gobi-kharkhorin", "family-nomad-adventure"],
    seo: {
      title: "Camel Trekking in the Gobi | Steppe & Sky",
      description:
        "Ride two-humped Bactrian camels with Gobi herders along the dunes of Khongoryn Els, from short rides to multi-day treks.",
    },
  },
  {
    slug: "eagle-hunting-traditions",
    title: "Eagle Hunting Traditions",
    summary:
      "Meet the Kazakh burkitshi of Bayan-Ölgii, who raise and train golden eagles to hunt in winter.",
    story:
      "The eagle sits hooded on its master's arm, still as stone. Then the hood comes off, the bird reads the valley in a single glance and launches. Among the Kazakh families of the Altai, *this partnership between hunter and eagle* is passed from parent to child.",
    body: [
      "Eagle hunting has been practised across Central Asia for centuries. In Mongolia it survives mainly among Kazakh families in Bayan-Ölgii, where burkitshi train female golden eagles, larger and stronger than males, to hunt foxes and hares in the winter months.",
      "A bird is usually taken young, trained over months, and traditionally kept for a number of years before being released back to the wild to breed. The bond between hunter and eagle is deep, and many families take great care to keep the practice responsible.",
      "We visit eagle-hunting families in their homes, with time to watch training, hear stories and share a meal. In autumn you can also see the hunters gather at the Golden Eagle Festival near Ölgii; winter hunts are for hardy travellers only.",
    ],
    regions: ["far-west-altai"],
    months: [9, 10, 11, 12, 1, 2, 3],
    etiquette: [
      "Keep a respectful distance from eagles and never try to touch one unless the hunter invites you.",
      "Ask before photographing hunters and their families, and accept a no.",
      "Accept tea and food with your right hand, or both hands, as a Kazakh host offers it.",
    ],
    hero: images.eagleHunterHorseback,
    gallery: [images.eagleLaunch, images.eagleHuntersGroup, images.eagleHunterRock],
    adventures: ["golden-eagle-festival-expedition", "photography-expedition", "altai-mountains-trek"],
    seo: {
      title: "Eagle Hunting Traditions in the Altai | Steppe & Sky",
      description:
        "Spend time with Kazakh eagle hunters in Bayan-Ölgii and learn how golden eagles are raised, trained and released.",
    },
  },
  {
    slug: "naadam-games",
    title: "The Naadam Games",
    summary:
      "Wrestling, horse racing and archery: the three manly games at the heart of Mongolia's summer festival.",
    story:
      "Wrestlers in embroidered vests flap their arms in the eagle dance, archers call out each hit in song and, far across the steppe, a dust cloud signals the racehorses. Naadam's *eriin gurvan naadam, the three games of men*, have been contested for centuries.",
    body: [
      "Wrestling (bökh) has no weight classes or time limits; a bout ends when any part of a wrestler's body other than feet or hands touches the ground. Winners earn titles such as falcon, elephant and lion, and the champion performs the eagle dance.",
      "Horse races run across open country over distances of roughly 10 to 30 km, depending on the age of the horses. The jockeys are children, usually from around seven upwards; age limits and safety rules such as helmets have been tightened in recent years amid an ongoing public debate about child-jockey welfare.",
      "Archery is contested by men and women alike, shooting at small leather targets with composite bows. Despite the name, women also take part in the horse racing as jockeys, while wrestling remains men only.",
      "We choose between the national celebrations in Ulaanbaatar and smaller local naadams, where you can stand right by the finish line and share the day with families.",
    ],
    regions: ["ulaanbaatar-terelj", "central-mongolia", "east-khentii"],
    months: [7],
    etiquette: [
      "Do not walk across the wrestling field or the archery range during competition.",
      "Keep well back from the race finish, where horses arrive at full speed.",
      "Ask before photographing riders, wrestlers and families.",
    ],
    hero: images.naadamGrounds,
    gallery: [images.naadamGrounds, images.horsesFestival, images.horsesDust],
    adventures: ["naadam-festival-journey", "classic-mongolia-gobi-kharkhorin", "family-nomad-adventure"],
    seo: {
      title: "Naadam Games: Wrestling, Racing, Archery | Steppe & Sky",
      description:
        "Wrestling, horse racing and archery at Mongolia's Naadam festival, from the national stadium to local soum celebrations.",
    },
  },
  {
    slug: "throat-singing",
    title: "Throat Singing and the Morin Khuur",
    summary:
      "Hear khöömei, the overtone singing of the steppe, and the morin khuur horsehead fiddle, both UNESCO-listed traditions.",
    story:
      "One voice, two notes: a low drone and a whistling melody floating above it. Khöömei imitates wind, water and the steppe itself, and paired with the morin khuur *a single ger can feel as wide as the valley outside*.",
    body: [
      "Khöömei is a form of overtone singing in which a performer produces a fundamental note and one or more harmonics at the same time. Mongolian khöömei is inscribed on UNESCO's list of the Intangible Cultural Heritage of Humanity.",
      "The morin khuur, a two-stringed fiddle topped with a carved horse's head, is a symbol of Mongolia and is also UNESCO-listed. Its music often evokes horses: galloping rhythms, whinnies and the long, slow songs of the steppe.",
      "In Ulaanbaatar you can see polished concert performances; in the countryside we arrange informal evenings with local musicians, sometimes with a chance to try a few notes yourself.",
    ],
    regions: ["ulaanbaatar-terelj", "central-mongolia", "far-west-altai"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    etiquette: [
      "Stay quiet during long songs; applause usually comes at the end.",
      "Ask before recording or filming a performance in a family setting.",
    ],
    hero: images.musicians,
    gallery: [images.gerInterior, images.steppeRiverGers],
    adventures: ["classic-mongolia-gobi-kharkhorin", "naadam-festival-journey", "winter-mongolia-tsagaan-sar"],
    seo: {
      title: "Mongolian Throat Singing and Morin Khuur | Steppe & Sky",
      description:
        "Hear khöömei overtone singing and the horsehead fiddle, two UNESCO-listed traditions, in concert halls and herders' gers.",
    },
  },
  {
    slug: "dinosaur-fossil-sites",
    title: "Dinosaur Fossil Sites",
    summary:
      "Walk the Flaming Cliffs of Bayanzag, where the first recognised dinosaur eggs were found in the 1920s.",
    story:
      "Late afternoon turns the Flaming Cliffs a deep, burning orange. A century ago, Roy Chapman Andrews' expedition found dinosaur eggs here, and the Gobi has kept giving up *the bones of a world eighty million years gone*.",
    body: [
      "The Gobi is one of the richest dinosaur fossil regions in the world. Its Late Cretaceous rocks have yielded Protoceratops, Velociraptor, Oviraptor and the famous fighting dinosaurs, locked together where they died.",
      "At Bayanzag, the Flaming Cliffs, the American Museum of Natural History expeditions led by Roy Chapman Andrews found the first nests of dinosaur eggs to be scientifically recognised, in the 1920s. Nearby sites such as Nemegt and Tugrugiin Shiree are known to palaeontologists but harder to reach.",
      "Fossils are protected by Mongolian law and must never be collected, moved or bought. If you spot something, photograph it, leave it in place and tell your guide. Back in Ulaanbaatar, the Central Museum of Mongolian Dinosaurs shows fossils that were returned to the country.",
    ],
    regions: ["gobi"],
    months: [5, 6, 7, 8, 9, 10],
    etiquette: [
      "Never remove, move or buy fossils; it is illegal and robs science of its context.",
      "Stay on established paths at the cliff edges, which are fragile and crumble easily.",
      "Report any finds to your guide rather than handling them.",
    ],
    hero: images.flamingCliffs,
    gallery: [images.duneRipples, images.camelLone],
    adventures: ["classic-mongolia-gobi-kharkhorin", "family-nomad-adventure", "gobi-camel-trek-dune-camping"],
    seo: {
      title: "Dinosaur Fossil Sites in the Gobi | Steppe & Sky",
      description:
        "Explore the Flaming Cliffs of Bayanzag, where Roy Chapman Andrews found dinosaur eggs in the 1920s, and learn how fossils are protected.",
    },
  },
  {
    slug: "stargazing",
    title: "Stargazing",
    summary:
      "Some of the darkest skies in Asia, with the Milky Way rising over the Gobi and the steppe.",
    story:
      "With barely a light for a hundred kilometres, the sky over the Gobi turns from blue to black and then *fills edge to edge with stars*. The Milky Way rises over the dunes, bright enough to cast a faint glow on the sand.",
    body: [
      "Low population, dry air and high altitude make much of Mongolia exceptionally dark. Away from Ulaanbaatar and the provincial centres, light pollution is minimal, and the Gobi and the Altai are especially clear.",
      "The best viewing comes on moonless nights; check the lunar calendar when choosing dates. Late summer and autumn bring long, dark evenings and the Milky Way's bright core, while winter nights are clearest but bitterly cold.",
      "Our guides can point out constellations and share Mongolian star stories, and on photography trips we schedule nights for astrophotography. Bring a warm layer even in summer, as desert nights cool quickly.",
    ],
    regions: ["gobi", "far-west-altai", "central-mongolia", "east-khentii"],
    months: [5, 6, 7, 8, 9, 10],
    etiquette: [
      "Use a red head torch around camp to protect everyone's night vision.",
      "Keep voices low near family gers late at night.",
    ],
    hero: images.camelsStars,
    gallery: [images.milkyWaySteppe, images.tentMilkyWay],
    adventures: ["gobi-camel-trek-dune-camping", "photography-expedition", "classic-mongolia-gobi-kharkhorin"],
    seo: {
      title: "Stargazing in Mongolia | Steppe & Sky",
      description:
        "Watch the Milky Way rise over the Gobi and the steppe under some of Asia's darkest skies, with tips on timing and gear.",
    },
  },
  {
    slug: "overland-4x4",
    title: "4x4 Overland Journeys",
    summary:
      "Cross the country by UAZ furgon or Land Cruiser on tracks that link valleys, deserts and mountains.",
    story:
      "Paved road gives way to braided tracks, and the driver chooses one by instinct. Hours pass with nothing but grass, sky and the occasional ger. Overland travel here is long, dusty and *the truest way to feel how vast Mongolia is*.",
    body: [
      "Outside the main paved routes, much of Mongolia is crossed on dirt tracks that branch, merge and shift with the weather. Our drivers know them intimately and handle everything from river crossings to sudden repairs.",
      "We use two kinds of vehicle: the Russian UAZ furgon, a boxy van that is basic but famously easy to fix, and Toyota Land Cruisers, which are more comfortable on long drives. Both carry all gear and supplies, and we keep groups small.",
      "Be ready for long days: five to eight hours of driving is common between regions, and rough tracks can mean slow progress. We break journeys with stops at herders' camps, viewpoints and walks, and plan rest days so the road never becomes the whole trip.",
    ],
    regions: ["central-mongolia", "gobi", "north-khovsgol", "far-west-altai", "east-khentii"],
    months: [5, 6, 7, 8, 9, 10],
    etiquette: [
      "Ask your driver before taking photos of military or border areas.",
      "Pack all rubbish out, including from roadside stops.",
      "Bring patience and snacks; long drives are part of the journey.",
    ],
    hero: images.gerSunsetCar,
    gallery: [images.altaiPlain, images.riverValleyGrey, images.horsesDust],
    adventures: [
      "classic-mongolia-gobi-kharkhorin",
      "gobi-camel-trek-dune-camping",
      "altai-mountains-trek",
      "photography-expedition",
    ],
    seo: {
      title: "4x4 Overland Journeys in Mongolia | Steppe & Sky",
      description:
        "Cross Mongolia by UAZ furgon or Land Cruiser with experienced drivers, with honest notes on drive times and road conditions.",
    },
  },
  {
    slug: "cooking-with-herders",
    title: "Cooking with Herders",
    summary:
      "Make buuz and khuushuur, taste airag and learn the dairy traditions of the steppe with herding families.",
    story:
      "Flour on the table, mutton on the board and a pot of salty milk tea on the stove. Folding buuz with a herding family is messy, cheerful and *the quickest way to feel at home in a ger*.",
    body: [
      "Mongolian cooking is built around what the herds provide: meat, especially mutton, and an extraordinary range of dairy. Buuz (steamed dumplings) and khuushuur (fried pastries) are staples, while suutei tsai, milky tea often salted, is served in every ger.",
      "Summer is the season of white foods: yoghurt, cream (öröm), dried curds (aaruul) and airag, fermented mare's milk, which is slightly sour, mildly alcoholic and offered generously in summer. A sip is polite; you need not finish the bowl.",
      "Diets are meat-heavy and vegetables can be limited in the countryside. Vegetarian, vegan, gluten-free and allergy needs can be catered for with notice; let us know when booking so our cooks can plan supplies.",
    ],
    regions: ["central-mongolia", "gobi", "north-khovsgol", "east-khentii", "far-west-altai"],
    months: [6, 7, 8, 9],
    etiquette: [
      "Accept food and drink with your right hand, or both hands.",
      "Take at least a small taste of what is offered, even if you do not finish it.",
      "Do not throw rubbish or food into the stove; fire is treated with respect.",
      "Tell your guide about dietary needs early, so hosts are not put in an awkward position.",
    ],
    hero: images.teaWithHerders,
    gallery: [images.gerInterior, images.sheepMountain],
    adventures: ["family-nomad-adventure", "classic-mongolia-gobi-kharkhorin", "winter-mongolia-tsagaan-sar"],
    seo: {
      title: "Cooking with Mongolian Herders | Steppe & Sky",
      description:
        "Make buuz and khuushuur, try airag and suutei tsai, and learn steppe dairy traditions with herding families.",
    },
  },
];
