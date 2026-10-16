import { otoStainlessPhotoSrc } from "./oto-stainless-photo";

export const site = {
  name: "Full Tilt Toys",
  email: "info@fulltilttoys.com",
} as const;

export const products = [
  {
    slug: "doodle-disaster",
    name: "Doodle Disaster",
    card: {
      title: "Doodle Disaster",
      tagline: "A party drawing game of hilarious miscommunication",
      badge: "Available Now",
      specs: ["2–6 players", "Ages 12+", "Under 45 min"],
      cta: {
        label: "Shop",
        href: "https://www.amazon.com/dp/B0FQ69JKDG?lv",
        disabled: false,
      },
    },
    banner: "Available now",
    bannerClass: "bg-[#2a4d32] text-white",
    factsLogo: {
      src: "/logos/bulldozer-games.png",
      alt: "Bulldozer Games",
    },
    facts: [
      { label: "Learn in 3 minutes", icon: "timer" },
      { label: "Play in under 45 minutes", icon: "clock" },
      { label: "2-6 Players", icon: "users" },
      { label: "Age 12+", icon: "user" },
    ],
    description:
      "Doodle Disaster is a party drawing game where miscommunication can lead to hilarious results! During your turn as the Doodle Dictator, give step-by-step instructions to Doodlers on how to draw a picture only you can see. Describe the picture using lines and shapes, along with details about location, size, and orientation. At the end of two minutes, Doodlers guess what they drew. Did the Doodlers create recognizable works-of-art? Or doodle disasters? Everyone will laugh out loud at the curious \"art\" of miscommunication!",
    photo: {
      src: "/products/doodle-disaster.png",
      alt: "Doodle Disaster box",
      sizeClass: "h-[82%] w-[82%]",
    },
    cta: {
      label: "Get It",
      href: "https://www.amazon.com/dp/B0FQ69JKDG?lv",
      icon: "/logos/amazon-on-dark.png",
    },
    more: {
      highlights: [
        {
          title: "LAUGH-OUT-LOUD MISCOMMUNICATION",
          text: "One player becomes the Doodle Dictator and must describe a secret image using only simple language and the Doodlers try to draw it — hilarious disasters guaranteed every round!",
        },
        {
          title: "2-MINUTE ROUNDS",
          text: "Use the included timer and add to the chaos and keep the energy and confusion high and laughs coming non-stop! Perfect for keeping everyone engaged and entertained.",
        },
        {
          title: "240 UNIQUE IMAGE CARDS",
          text: "A huge variety of fun prompts means endless replayability and fresh disasters with every game night.",
        },
        {
          title: "GREAT FOR GROUPS",
          text: "Ideal 2–6 player party game for families, kids, and adults. Perfect for game nights, birthdays, holidays, and gatherings. Or get more whiteboards or paper for large groups - infinitely scalable!",
        },
        {
          title: "NO ART SKILLS REQUIRED",
          text: "Anyone can play! The worse the drawings, the funnier it gets. Just listen carefully and blame the Doodle Dictator when it all goes wrong - you were just following orders.",
        },
      ],
      thanks:
        "We want to thank our friends and family who helped us develop this game and contributed to the disasterous doodles featured on our front cover. We also want to thank our Kickstarter backers who we could not have made this game without.",
      links: [
        {
          label: "Doodle Disaster BGG Listing",
          href: "https://boardgamegeek.com/boardgame/449964/doodle-disaster",
          icon: "bgg",
        },
        {
          label: "Grant Lyon Game Preview (MUST WATCH)",
          href: "https://www.youtube.com/shorts/tzIWf_ogFfo",
          icon: "youtube",
        },
        {
          label: "Brains on Games Preview",
          href: "https://www.youtube.com/shorts/i8JBzg_RCdw",
          icon: "youtube",
        },
        {
          label: "Buy now on Amazon",
          href: "https://www.amazon.com/dp/B0FQ69JKDG?lv",
          icon: "amazon",
        },
      ],
      video: {
        src: "/videos/doodle-disaster.mp4",
        label: "Doodle Disaster",
      },
      image: {
        src: "/products/doodle-disaster-contents.png",
        alt: "Doodle Disaster box, cards, markers, boards, and timer",
      },
    },
  },
  {
    slug: "bulldozer",
    name: "Bulldozer | It's Time To Play Dirty!",
    card: {
      title: "Bulldozer",
      tagline: "A 2-player strategy game of rocks, dice, and dynamite",
      badge: "Coming Soon",
      specs: ["2 players", "Ages 7+", "Under 45 min"],
      cta: {
        label: "Learn More",
        href: null,
        disabled: false,
      },
    },
    banner: "Current Project",
    bannerClass: "bg-[#c48a2a] text-white",
    factsLogo: {
      src: "/logos/bulldozer-games.png",
      alt: "Bulldozer Games",
    },
    facts: [
      { label: "Learn in 15 minutes", icon: "timer" },
      { label: "Play in under 45 minutes", icon: "clock" },
      { label: "2 Players", icon: "users" },
      { label: "Age 7+", icon: "user" },
    ],
    description: [
      "Roll the dice and use your trusty bulldozers to move rocks and launch dynamite. Clear your rocks by pushing them into your pit or 'play dirty' and knock your rocks onto your opponent's side. Things tend to escalate quickly when there's dynamite lying around!",
      "Bulldozer just completed a successful campaign on Kickstarter and will be available for sale before 2027 in both standard and Deluxe editions!",
    ],
    photo: {
      src: "/products/bulldozer-art.png",
      alt: "Bulldozer art: a job site with a dozer, rocks, and dynamite",
      sizeClass: "h-full w-full",
    },
    cta: {
      label: "Coming soon to Amazon",
      href: null,
      icon: "/logos/amazon-on-dark.png",
    },
    more: {
      highlights: [
        {
          title: "LIGHT STRATEGY WITH SURPRISING DEPTH",
          text: "Simple rules and easy to learn, yet offers meaningful decisions and clever tactics. Every match feels tense, balanced, and highly competitive.",
        },
        {
          title: "THE ROLL OF THE DICE",
          text: "Take turns rolling your dice and moving your trusty bulldozer in any direction. The luck adds to the suspense of each turn and gives players the ability to pivot to make the best turns possible! But it all balances out in the end.",
        },
        {
          title: "THE ROCK PARADOX",
          text: "Rocks are both obstacles and valuable assets. Collect them to earn powerful advantages or strategically dump them onto your opponent’s side. Self-balancing gameplay keeps every match close until the final move.",
        },
        {
          title: "FAST-PACED 2-PLAYER DUELS",
          text: "Clear your side of rocks before your opponent does. Use smart positioning, tactical knocking, and explosive dynamite plays in this exciting head-to-head battle.",
        },
        {
          title: "HIGH REPLAYABILITY",
          text: "Not only is each game unique but shake up the starting board with alternative layouts for fresh gameplay experiences. Quick setup, short games, and satisfying strategy make it perfect for repeated plays.",
        },
      ],
      thanks:
        "We want to thank our Kickstarter backers who helped bring this project to life! Also, thank you to our outstanding graphic artist Christi du Toit for his tremendous work on the graphic art for the Bulldozer game.",
      links: [
        {
          label: "Bulldozer BGG Listing",
          href: "https://boardgamegeek.com/boardgame/466340/bulldozer",
          icon: "bgg",
        },
      ],
      video: {
        src: "/videos/bulldozer.mp4",
        label: "Bulldozer",
      },
      image: {
        src: "/products/bulldozer.jpg",
        alt: "Bulldozer game box, board, and pieces",
      },
    },
  },
  {
    slug: "oto",
    name: "OTO | Curiously Controllable",
    card: {
      title: "OTO",
      tagline: "A curiously controllable desktop fidget toy vehicle",
      badge: "Coming Soon",
      specs: ["No batteries", "No electronics", "Desktop play"],
      cta: {
        label: "Learn More",
        href: null,
        disabled: false,
      },
    },
    banner: "Upcoming Project",
    bannerClass: "bg-[#a85a55] text-white",
    factsLogo: {
      src: "/logos/oto.png",
      alt: "OTO",
    },
    facts: [
      { label: "No batteries", icon: "battery" },
      { label: "No electronics", icon: "plug" },
      { label: "Launching soon on Kickstarter", icon: "kickstarter" },
    ],
    description:
      "OTO vehicles are playful desktop companions you can fidget with or drive! OTO vehicles just may be the most maneuverable toy car ever made. No electronics or batteries. Just press play and take control. OTO vehicles are equipped with an instantaneous, automatic turning technology. The vehicles respond to your touch with smooth, rhythmic movement or lightning-fast turns! Stay tuned, OTO vehicles are on the way!",
    photo: {
      src: "/products/oto-art.png",
      alt: "OTO art: a curiously controllable Series 1 vehicle",
      sizeClass: "h-full w-full",
    },
    cta: {
      label: "Follow",
      href: "https://www.kickstarter.com/projects/fulltilttoys/oto-the-fidget-toy-you-drive?ref=em6ni9",
      icon: "/logos/kickstarter.png",
    },
    more: {
      highlights: [
        {
          title: "PLAYFUL DESKTOP COMPANIONS",
          text: "Casually fidget while working at your desk or drive — and take off your desk!",
        },
        {
          title: "THE MOST MANEUVERABLE TOY CAR",
          text: "OTO vehicles just may be the most maneuverable toy car ever made. Steer with a touch and take control.",
        },
        {
          title: "NO ELECTRONICS OR BATTERIES",
          text: "No electronics or batteries. Just press play and take control. You're the power!",
        },
        {
          title: "INSTANTANEOUS AUTOMATIC TURNING",
          text: "OTO vehicles are equipped with an instantaneous, automatic turning technology that responds the moment you do.",
        },
        {
          title: "SMOOTH OR LIGHTNING-FAST",
          text: "The vehicles respond to your touch with smooth, rhythmic movement or lightning-fast turns!",
        },
        {
          title: "FUTURISTIC DESKTOP EXPLORERS",
          text: "Destined for desktop exploration, OTO vehicles show off unique sci-fi Rover designs.",
        },
      ],
      thanks:
        "We want to thank our friends and family who helped us develop OTO. Stay tuned — OTO vehicles are on the way!",
      links: [],
      video: {
        src: "/videos/oto.mp4",
        label: "OTO",
      },
      image: {
        src: "/products/oto.jpg",
        alt: "OTO Series 1 cars and box",
      },
    },
  },
  {
    slug: "oto-stainless",
    name: "OTO Stainless | Executive Desktop Toy",
    card: {
      title: "OTO Stainless",
      tagline: "A stainless steel executive desktop fidget toy",
      badge: "Coming Soon",
      specs: ["Stainless steel", "No batteries", "Desktop play"],
      cta: {
        label: "Launching Soon",
        href: null,
        disabled: true,
      },
    },
    banner: "Upcoming Project",
    bannerClass: "bg-[#a85a55] text-white",
    factsLogo: {
      src: "/logos/oto.png",
      alt: "OTO",
    },
    facts: [
      { label: "Stainless steel", icon: "user" },
      { label: "No batteries", icon: "battery" },
      { label: "No electronics", icon: "plug" },
    ],
    description:
      "OTO Stainless is the executive edition of our curiously controllable desktop fidget toy. Machined in stainless steel, these vehicles are built as premium desktop companions you can fidget with or drive. OTO vehicles just may be the most maneuverable toy car ever made. No electronics or batteries. Just press play and take control. OTO vehicles are equipped with an instantaneous, automatic turning technology. The vehicles respond to your touch with smooth, rhythmic movement or lightning-fast turns. Stay tuned — OTO Stainless is on the way.",
    photo: {
      src: otoStainlessPhotoSrc,
      alt: "OTO Stainless steel executive desktop vehicles",
      sizeClass: "h-full w-full",
    },
    cta: {
      label: "Launching Soon",
      href: null,
      icon: "/logos/kickstarter.png",
    },
    more: {
      highlights: [
        {
          title: "EXECUTIVE DESKTOP COMPANIONS",
          text: "A stainless steel fidget you can keep on the desk — casually fidget while you work, or drive and take off your desk.",
        },
        {
          title: "THE MOST MANEUVERABLE TOY CAR",
          text: "OTO vehicles just may be the most maneuverable toy car ever made. Steer with a touch and take control.",
        },
        {
          title: "STAINLESS STEEL BUILD",
          text: "Premium stainless steel construction for an executive desktop toy with weight, finish, and presence.",
        },
        {
          title: "NO ELECTRONICS OR BATTERIES",
          text: "No electronics or batteries. Just press play and take control. You're the power!",
        },
        {
          title: "INSTANTANEOUS AUTOMATIC TURNING",
          text: "OTO vehicles are equipped with an instantaneous, automatic turning technology that responds the moment you do.",
        },
        {
          title: "SMOOTH OR LIGHTNING-FAST",
          text: "The vehicles respond to your touch with smooth, rhythmic movement or lightning-fast turns.",
        },
      ],
      thanks:
        "We want to thank our friends and family who helped us develop OTO. Stay tuned — OTO Stainless is on the way.",
      links: [],
    },
  },
] as const;

export const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@FullTiltToys",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@fulltilttoys",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fulltilttoys/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61565950703442",
  },
  {
    label: "Amazon",
    href: "https://www.amazon.com/dp/B0FQ69JKDG?lv",
  },
] as const;

export const mailingLists = [
  {
    id: "full-tilt-toys",
    label: "FTT Toys & products",
  },
  {
    id: "bulldozer-games",
    label: "Bulldozer Games",
  },
  {
    id: "all",
    label: "All Full Tilt Toys & Bulldozer Games",
  },
] as const;

/** Flip to true to show the subscribe form on the public page again. */
export const showSubscribeForm = false;
