import { images } from "@/lib/images";
import type { Festival } from "./types";

export const festivals: Festival[] = [
  {
    slug: "naadam",
    name: "Naadam",
    when: "July; national celebrations usually 11-15 July, local naadams throughout the month (dates vary, verify yearly)",
    verifyYearly: true,
    months: [7],
    location: "Ulaanbaatar's National Sports Stadium, plus aimag and soum centres across the country",
    summary:
      "Mongolia's great summer festival of wrestling, horse racing and archery, celebrated in the capital and in every corner of the countryside.",
    story:
      "Naadam opens with horsemen, banners and music in the national stadium, but its spirit lives just as strongly in the countryside, where *a whole soum turns out on the grass* to cheer local wrestlers and the child jockeys racing in from the horizon.",
    body: [
      "Naadam celebrates the three manly games of wrestling, horse racing and archery, and is inscribed by UNESCO as Intangible Cultural Heritage. The national festival marks the 1921 revolution, and the official public holiday commonly runs from 11 to 15 July.",
      "In Ulaanbaatar the opening ceremony is a spectacle of costume, music and cavalry, with wrestling in the stadium, archery next door and horse racing on the steppe at Khui Doloon Khudag outside the city. Tickets for the opening ceremony sell out and are best arranged well ahead.",
      "Through July, aimag and soum centres hold their own naadams, often on different dates. These are smaller, more relaxed and, for many travellers, the more memorable experience: you can stand by the finish line, watch wrestling up close and share khuushuur with local families.",
    ],
    highlights: [
      "The opening ceremony in the national stadium",
      "Wrestlers' eagle dance after each victory",
      "Child jockeys racing across open steppe",
      "Archers singing out each hit",
      "Khuushuur fresh from the festival stalls",
      "Intimate local naadams in the countryside",
    ],
    tips: [
      "Book flights and accommodation early; Ulaanbaatar is at its busiest around Naadam.",
      "Opening ceremony tickets are limited; we arrange them as part of our Naadam journeys.",
      "Bring sun protection and a light rain layer; July weather swings quickly.",
      "Local naadam dates are set each year, sometimes at short notice, so build flexibility into your plans.",
    ],
    hero: images.naadamGrounds,
    adventures: ["naadam-festival-journey", "classic-mongolia-gobi-kharkhorin", "family-nomad-adventure"],
    seo: {
      title: "Naadam Festival in Mongolia | Steppe & Sky",
      description:
        "Wrestling, horse racing and archery at Naadam, usually 11-15 July in Ulaanbaatar, with local naadams across the countryside.",
    },
  },
  {
    slug: "golden-eagle-festival",
    name: "Golden Eagle Festival",
    when: "Early October, typically the first weekend (dates vary, verify yearly); a smaller Sagsai festival is often held in mid to late September",
    verifyYearly: true,
    months: [10],
    location: "Near Ölgii, Bayan-Ölgii province, in the Altai",
    summary:
      "Kazakh eagle hunters gather in their finest furs to show the skill of their golden eagles and their horsemanship.",
    story:
      "Hunters ride in wrapped in fox fur, eagles hooded on their arms. One by one the birds are released from a ridge and *dive to their masters' call across the valley*, while the crowd counts the seconds and the Altai glows behind them.",
    body: [
      "The Golden Eagle Festival celebrates the eagle-hunting traditions of the Kazakh people of Bayan-Ölgii. It is usually held on the first weekend of October on a plain near Ölgii, with dozens of hunters and their birds taking part.",
      "Competitions test the bond between hunter and eagle: speed and accuracy in landing on the hunter's arm, catching a lure dragged behind a horse, and the turnout of hunter, horse and bird. Between events come horseback games such as kokpar (a tug-of-war over a goatskin) and tenge ilu, picking a coin from the ground at a gallop.",
      "A smaller festival near Sagsai is often held in mid to late September, and some travellers combine the two. We pair festival days with time at the home of an eagle-hunting family, which gives far more context than the event alone.",
    ],
    highlights: [
      "Eagles diving from the ridge to their hunters' arms",
      "Hunters in fox-fur hats and embroidered coats",
      "Kokpar and other horseback games",
      "Kazakh music, food and crafts",
      "Autumn light on the Altai",
    ],
    tips: [
      "Book early: flights to Ölgii and local accommodation fill quickly around the festival.",
      "Pack for cold: early October mornings are often well below freezing.",
      "Bring a telephoto lens; the action happens fast and at distance.",
      "Ask before photographing hunters off the competition field.",
    ],
    hero: images.eagleHuntersPortrait,
    adventures: ["golden-eagle-festival-expedition", "photography-expedition"],
    seo: {
      title: "Golden Eagle Festival, Bayan-Ölgii | Steppe & Sky",
      description:
        "Kazakh eagle hunters and their golden eagles gather near Ölgii, typically the first weekend of October. Dates vary; verify yearly.",
    },
  },
  {
    slug: "tsagaan-sar",
    name: "Tsagaan Sar",
    when: "January or February, following the Mongolian lunar calendar (dates vary, verify yearly)",
    verifyYearly: true,
    months: [1, 2],
    location: "Family homes across Mongolia",
    summary:
      "The lunar new year, the 'White Moon', a family-centred celebration of greetings, food and visits.",
    story:
      "Dressed in their best deel, families greet their elders with outstretched arms and a blue khadag scarf. Tables groan with buuz and layered biscuits, and *every visit begins the year with kindness*. Visitors join not as spectators but as guests.",
    body: [
      "Tsagaan Sar marks the start of the lunar year and the end of winter's hardest weeks. Its dates follow the Mongolian lunar calendar and can differ from Chinese New Year, so the holiday may fall in late January or in February.",
      "The eve, bitüün, is for cleaning, settling debts and a family meal. On the first day, family members exchange the zolgokh greeting: the younger person supports the elder's forearms from below, often holding a khadag, and wishes them well. Days of visits follow, with buuz, a sheep's back, ul boov biscuit towers and small gifts.",
      "This is a private, family festival rather than a public event. We arrange for you to join a host family as guests, with a guide to explain customs, so you can take part respectfully.",
    ],
    highlights: [
      "Joining a family for the zolgokh greeting",
      "Steaming plates of buuz",
      "Deel and fur hats in their winter finery",
      "Snow-covered steppe and clear winter skies",
    ],
    tips: [
      "Bring a small gift for your hosts; your guide will advise on what is appropriate.",
      "Expect to eat a lot: refusing buuz entirely is impolite, but small portions are fine.",
      "Pack serious winter clothing; temperatures can drop below -30°C.",
      "Many shops and offices close for several days, so plans need to be flexible.",
    ],
    hero: images.gerSnow,
    adventures: ["winter-mongolia-tsagaan-sar"],
    seo: {
      title: "Tsagaan Sar, Mongolian Lunar New Year | Steppe & Sky",
      description:
        "Join a family for Tsagaan Sar, the Mongolian lunar new year in January or February: greetings, buuz and winter hospitality.",
    },
  },
  {
    slug: "khovsgol-ice-festival",
    name: "Khövsgöl Ice Festival",
    when: "Usually early March (dates vary, verify yearly)",
    verifyYearly: true,
    months: [3],
    location: "Frozen Lake Khövsgöl, near Khatgal",
    summary:
      "A celebration of winter on the frozen surface of Lake Khövsgöl, with ice sculptures, horse-sled races and skating.",
    story:
      "By March the ice on Khövsgöl is thick enough to drive on. Families arrive by sled and horse, sculptors carve glittering figures and *the whole lake becomes a winter fairground*, ringed by snowy larch forest and blue sky.",
    body: [
      "The Khövsgöl Ice Festival usually takes place in early March on the frozen lake near Khatgal. It brings together local herders, Dukha reindeer herders and visitors to celebrate the northern winter.",
      "Events typically include horse-sled races, ice skating, ice sculpture, tug-of-war and traditional games, with shamanic ceremonies and music. Programmes vary from year to year.",
      "Conditions are extreme but often beautiful: crisp, sunny days and very cold nights. We travel with warm clothing guidance, heated accommodation and a flexible plan.",
    ],
    highlights: [
      "Horse-sled races across the ice",
      "Ice sculptures glittering in the sun",
      "Skating on the clear lake surface",
      "Winter landscapes of the northern taiga",
    ],
    tips: [
      "Prepare for temperatures well below -20°C, especially at night.",
      "Wear boots with good grip and bring crampons or ice cleats.",
      "Keep camera batteries warm inside your jacket.",
    ],
    hero: images.frozenRiver,
    adventures: ["winter-mongolia-tsagaan-sar"],
    seo: {
      title: "Khövsgöl Ice Festival | Steppe & Sky",
      description:
        "Horse-sled races, ice sculptures and skating on frozen Lake Khövsgöl near Khatgal, usually in early March.",
    },
  },
  {
    slug: "thousand-camel-festival",
    name: "Thousand Camel Festival",
    when: "Usually early March (dates vary, verify yearly)",
    verifyYearly: true,
    months: [3],
    location: "Bulgan soum area, Ömnögovi province, the Gobi",
    summary:
      "A winter celebration of the Bactrian camel, with races, camel polo and herders in their finest deel.",
    story:
      "Hundreds of shaggy Bactrian camels gather on the frozen Gobi, decked out in coloured saddle cloths. Riders race them across the plain and *camel polo erupts in clouds of dust and laughter*, honouring the animal that makes desert life possible.",
    body: [
      "The Thousand Camel Festival is usually held in early March in the Bulgan soum area of Ömnögovi. It was started to celebrate and help protect the Bactrian camel and the herding culture built around it.",
      "Events typically include camel races, camel polo, the best-dressed camel and rider, and displays of camel-wool crafts, alongside music and dancing. The programme can change from year to year.",
      "March in the Gobi is cold, dry and bright, with long views and few other travellers. We combine the festival with time at herders' camps and visits to the Flaming Cliffs nearby.",
    ],
    highlights: [
      "Camel races across the Gobi plain",
      "Camel polo",
      "Herders and camels in festive dress",
      "Camel-wool crafts and local food",
    ],
    tips: [
      "Prepare for cold mornings and strong winds; layers and a windproof shell are essential.",
      "Bring sunglasses and lip balm; winter sun and dry air are intense.",
      "Book flights to Dalanzadgad early, as seats are limited.",
    ],
    hero: images.camelPortrait,
    adventures: ["gobi-camel-trek-dune-camping", "winter-mongolia-tsagaan-sar"],
    seo: {
      title: "Thousand Camel Festival, Gobi | Steppe & Sky",
      description:
        "Camel races, camel polo and Gobi herding culture at the Thousand Camel Festival, usually held in early March.",
    },
  },
];
