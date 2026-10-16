import type { Faq } from "./types";

export const faqs: Faq[] = [
  {
    id: "visas-and-entry",
    topic: "Before you go",
    question: "Do I need a visa for Mongolia?",
    answer: [
      "It depends on your nationality. Mongolia offers visa-free entry to citizens of a number of countries for set periods, but the list and the permitted length of stay change from time to time, and some temporary visa-free schemes have come and gone in recent years.",
      "Before you book flights, check the current rules with the official Mongolian immigration authority or your nearest Mongolian embassy or consulate, and read your own government's travel advice. Your passport should normally have at least six months' validity beyond your planned departure date and blank pages for stamps.",
      "Once you have booked, your trip specialist can send a confirmation letter if your visa application needs one.",
    ],
    verify: "official-sources",
  },
  {
    id: "flights-into-ulaanbaatar",
    topic: "Getting around",
    question: "How do I fly into Mongolia?",
    answer: [
      "International flights land at Chinggis Khaan International Airport (UBN), which opened in 2021 roughly 50 km south of Ulaanbaatar. The transfer into the city usually takes around an hour, longer in rush-hour traffic, and we meet every arrival.",
      "There are a handful of direct routes, but most travellers connect, commonly via Seoul, Beijing, Tokyo, Istanbul or Frankfurt. Schedules are thinner outside summer, so book early for July and August and leave a buffer day if your connection is tight.",
    ],
  },
  {
    id: "roads-and-long-drives",
    topic: "On the road",
    question: "What are the roads like, and how long are the drives?",
    answer: [
      "Paved highways link Ulaanbaatar to many provincial centres, but beyond them you are on dirt tracks, gravel, sand and the occasional river crossing. Some days involve five to eight hours in the vehicle, broken up with stops for tea, lunch, photographs and leg-stretches.",
      "We travel in sturdy 4x4s with experienced drivers who know the routes and carry spares. If you suffer from back problems or motion sickness, tell us when planning; we can adjust the pace, add overnight stops or suggest domestic flights to cut the longest legs.",
    ],
  },
  {
    id: "ger-camp-comfort",
    topic: "Comfort and food",
    question: "How comfortable are the ger camps?",
    answer: [
      "We work with three comfort levels, and you choose the mix when you plan. Traditional means family-run or simple camps: warm gers, a stove, long-drop toilets and basic washing. Comfortable means proper beds, shared hot showers and flush toilets, and a dining ger. Luxury means spacious gers with private bathrooms, better food and more power.",
      "Even at the top end, Mongolia is remote. Hot water may run at set times, power is often solar, and the stove needs feeding on cold nights. That is part of the experience, and our camps are chosen for their setting and hosts as much as their facilities.",
    ],
  },
  {
    id: "food-and-dietary-needs",
    topic: "Comfort and food",
    question: "What is the food like, and can you cater for dietary needs?",
    answer: [
      "Mongolian cooking is built around meat and dairy: mutton, beef, goat, dumplings, noodles, dried curds and salty milk tea. In camps you will also find salads, rice dishes and simple Western food, and guides often cook fresh picnic lunches on the road.",
      "Vegetarian, vegan, gluten-free and other diets are possible with advance notice, though choice is narrower in the countryside. Tell us at booking and we will brief every camp and cook. Strict allergies need a conversation early on so we can plan safely.",
    ],
  },
  {
    id: "horse-riding-experience",
    topic: "Health and safety",
    question: "How much riding experience do I need?",
    answer: [
      "Our riding trips are graded none, some or confident. 'None' means short, guided rides at walking pace. 'Some' means you are happy at walk and trot for several hours a day. 'Confident' means you can handle a canter over uneven ground and long days in the saddle.",
      "Mongolian horses are small, tough and semi-wild; they are not riding-school ponies, and they respond best to calm, light handling. Traditional wooden saddles are hard, so we offer Russian-style or Western-style saddles on most trips. A riding helmet is strongly recommended and required on some routes.",
    ],
  },
  {
    id: "health-and-insurance",
    topic: "Health and safety",
    question: "What health precautions and insurance do I need?",
    answer: [
      "Travel insurance is a condition of booking and must include medical evacuation and repatriation. Much of our travel is many hours, sometimes a day or more, from a hospital, and evacuation from remote areas can be very expensive.",
      "See a travel clinic or your doctor six to eight weeks before you go for advice on vaccinations and any medication you need. Bring enough of your own prescription medicines for the whole trip plus spares. Our guides carry first-aid kits and satellite or radio communication on remote routes.",
    ],
  },
  {
    id: "weather-and-temperatures",
    topic: "Before you go",
    question: "What is the weather like?",
    answer: [
      "Mongolia has a dry, continental climate with big swings. Summer days on the steppe can reach the high 20s °C and the Gobi can top 35 °C, yet nights in the mountains drop close to freezing even in July. Winter is properly cold, often below -20 °C, with clear, bright skies.",
      "Weather changes quickly: wind, dust, a sudden hailstorm, then sunshine again within the hour. Pack in layers whatever the season, and see our month-by-month guide for typical conditions.",
    ],
  },
  {
    id: "connectivity",
    topic: "On the road",
    question: "Will I have phone signal and internet?",
    answer: [
      "Mobile coverage is good in Ulaanbaatar and most provincial and district towns, and many camps near towns have a signal. Out in the countryside it is patchy or non-existent for long stretches, and camp wifi, where it exists, is slow.",
      "A local SIM card is cheap and easy to buy in Ulaanbaatar with your passport, and usually gives better coverage than roaming. Treat the gaps as a feature: few places on earth are this quiet.",
    ],
  },
  {
    id: "money-and-cards",
    topic: "Before you go",
    question: "What currency is used, and can I pay by card?",
    answer: [
      "The currency is the Mongolian tögrög (MNT). Cards are widely accepted in Ulaanbaatar hotels, restaurants and larger shops, and there are plenty of ATMs in the city.",
      "In the countryside, cash is king. Bring enough tögrög for snacks, souvenirs, drinks at camps and tips before you leave Ulaanbaatar; your guide can point you to an ATM or exchange office on the first day. Clean, recent US dollar or euro notes are the easiest to exchange.",
    ],
  },
  {
    id: "tipping",
    topic: "Culture",
    question: "Should I tip my guide and driver?",
    answer: [
      "Tipping is not obligatory, but it is customary and much appreciated by guides, drivers, horsemen and camp staff, for whom tips are a meaningful part of their income.",
      "As guidance only, many travellers give USD 10-15 per day for a guide and USD 7-10 per day for a driver [PLACEHOLDER amounts, to be confirmed], shared between the group, with smaller amounts for horse handlers and camp teams. Tip in tögrög or US dollars at the end of the trip, ideally in an envelope with a note of thanks.",
    ],
  },
  {
    id: "ger-etiquette",
    topic: "Culture",
    question: "How should I behave when visiting a family ger?",
    answer: [
      "Herding families are famously hospitable, and a few habits go a long way. Move clockwise inside the ger, avoid stepping on the threshold, do not lean on the central poles, and do not point your feet at the stove or the family altar at the back.",
      "Accept tea or food with your right hand, or both hands, and at least taste what you are offered. Ask before taking photographs of people. Your guide will brief you before every visit and is always happy to explain anything you are unsure about.",
    ],
  },
  {
    id: "what-to-pack",
    topic: "Before you go",
    question: "What should I pack?",
    answer: [
      "Layers, a warm sleeping layer, sturdy footwear, sun and dust protection and a headtorch cover most trips. Soft bags travel much better than hard suitcases in the back of a 4x4.",
      "Our What to pack guide breaks it down by category and season, including riding kit and power for cameras, so you can pack once and pack right.",
    ],
  },
  {
    id: "cancellations",
    topic: "Booking",
    question: "What happens if I need to cancel?",
    answer: [
      "[PLACEHOLDER] Our full cancellation terms, deposit and payment schedule will be confirmed in our booking conditions, which you will receive before you pay anything.",
      "This is another reason comprehensive travel insurance with cancellation cover is essential from the moment you book.",
    ],
  },
];
