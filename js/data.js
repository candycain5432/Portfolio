/* ============================================================================
   data.js: all the site's content lives here (projects, bio, skills, photos).
   ========================================================================== */

window.PORTFOLIO = {

  profile: {
    name: "William Cain",
    initials: "WC",
    headline: "Hi, I'm William.",
    headlineAccent: "I write code, build gadgets, and take pictures of planes.",
    blurb:
      "Some weeks that means a Catholic daily-faith app. Other weeks it's a Python " +
      "game engine, an Arduino radar, or the WireGuard setup on my home network. " +
      "I like finishing things and writing down how they work.",
    bio: [
      "I've never been able to stick to one thing, so my projects are all over the " +
      "place: web apps, games, Arduino hardware, home networking and security, AI " +
      "tools, and some creative stuff on the side.",
      "What ties it together is wanting to know how things work from top to bottom. " +
      "I'm just as happy working on how an app looks as I am tuning the calibration " +
      "on a soil sensor. When I finish something I usually write it up, whether " +
      "that's an engineering PDF, an OSINT report, or a README someone else can follow.",
      "Outside of all that, it's planes. I take my camera out to the airport, and a " +
      "couple of my sites borrow their look from glass cockpits.",
    ],
    facts: [
      { k: "Focus", v: "Web, hardware, security" },
      { k: "Currently", v: "Daily Python challenge and AI Buddy" },
      { k: "Cert", v: "FAA Part 107 (planned)" },
    ],
    email: "contact@williamcain.net",
    socials: [
      { label: "GitHub", href: "https://github.com/candycain5432" },
      { label: "YouTube", href: "https://www.youtube.com/@CandyCain5432" },
      { label: "Discord", href: "https://discord.com/users/948328159475007509" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/william-cain-98458b448/" },
    ],
  },

  /* Colors drive the clusters on the project map. */
  domains: [
    { id: "web",      label: "Web & Apps",       color: "#46d6a4", blurb: "Apps and websites." },
    { id: "games",    label: "Games",            color: "#a78bfa", blurb: "Engines, Roblox games, and homemade physics." },
    { id: "hardware", label: "Hardware & IoT",   color: "#f6a94a", blurb: "Arduino projects, sensors, and a radar." },
    { id: "security", label: "Security & Linux", color: "#ff6b81", blurb: "My homelab, OSINT work, and Arch." },
    { id: "ai",       label: "AI & Software",    color: "#5cc8ff", blurb: "AI experiments and daily Python." },
    { id: "creative", label: "Creative",         color: "#f574b8", blurb: "A manga, math animations, and a sarcastic desk robot." },
    { id: "photo",    label: "Photography",      color: "#e9c45f", blurb: "Mostly planes." },
  ],

  /* `related` draws the links between projects on the map. */
  projects: [
    /* ---------------- FEATURED ---------------- */
    {
      id: "anchor", title: "Anchor", tagline: "Project Lumen",
      domain: "web", featured: true, status: "Live", year: "2026",
      blurb:
        "A Catholic daily-faith web app you can install on your phone. The backend is " +
        "Node and Express on Render, the service worker updates itself in the " +
        "background, and the gold-and-navy interface is modeled on the Garmin G3000 " +
        "glass cockpit.",
      highlights: [
        "Works offline, and the service worker updates itself",
        "Node/Express backend deployed on Render",
        "Gold and navy design inspired by the G3000",
      ],
      stack: ["JavaScript", "Node", "Express", "PWA", "Render"],
      related: ["cockpit-portfolio"], links: [],
    },
    {
      id: "exposure", title: "EXPOSURE", tagline: "Roblox horror",
      domain: "games", featured: true, status: "In progress", year: "2026",
      blurb:
        "A photography-stealth horror game on Roblox that I'm making with a friend. " +
        "The camera prototype checks each shot against a list of photo requirements, " +
        "and it already has a viewfinder HUD, lens switching, and long exposure.",
      highlights: [
        "Checks each shot against the photo requirements",
        "Viewfinder HUD with a live checklist",
        "Lens switching and long exposure",
      ],
      stack: ["Lua", "Roblox Studio"],
      related: ["magic-combat", "photo"], links: [],
    },
    {
      id: "pysino", title: "Pysino", tagline: "Game engine",
      domain: "games", featured: true, status: "Built", year: "2026",
      blurb:
        "A game engine I wrote in Python and Pygame. The RNG is provably fair (server " +
        "seed, client seed, nonce), and it has a scene stack, a Bank, audio, particles, " +
        "and a headless mode for testing.",
      highlights: [
        "Provably fair RNG using a server seed, client seed, and nonce",
        "Scene stack, Bank, audio, and particles",
        "Headless mode for automated runs",
      ],
      stack: ["Python", "Pygame"],
      related: ["blackjack", "platformer", "dungeon"], links: [],
    },
    {
      id: "debate", title: "Multi-Agent AI Debate", tagline: "AI agents with a blinded moderator",
      domain: "ai", featured: true, status: "Built", year: "2026",
      blurb:
        "AI agents debate each other while a blinded moderator judges the exchange. " +
        "I added bias detection, anti-reframe anchoring, double-verdict runs, and " +
        "batch testing.",
      highlights: [
        "Blinded moderator and double-verdict runs",
        "Bias detection and anti-reframe anchoring",
        "Batch testing across many prompts",
      ],
      stack: ["Python", "OpenAI API"],
      related: ["daily-python"], links: [],
    },
    {
      id: "wall-r", title: "WALL·R", tagline: "Ultrasonic radar",
      domain: "hardware", featured: true, status: "Built", year: "2026",
      blurb:
        "An ultrasonic radar on an Arduino. It sweeps an HC-SR04 on a servo, shows " +
        "readings on an OLED, beeps when something gets close, and runs a dashboard " +
        "over WiFi. I also wrote a full engineering reference PDF for it.",
      highlights: [
        "HC-SR04 on a servo with an OLED readout",
        "Proximity buzzer and a live WiFi dashboard",
        "Full engineering reference PDF",
      ],
      stack: ["Arduino", "C++", "HC-SR04", "Servo"],
      related: ["plant-monitor"], links: [],
    },
    {
      id: "plant-monitor", title: "Plant Monitor", tagline: "UNO R4 WiFi",
      domain: "hardware", featured: true, status: "Built", year: "2026",
      blurb:
        "Tracks soil moisture and light on an UNO R4 WiFi, with an OLED readout and a " +
        "WiFi dashboard. Calibration gets saved to EEPROM, and I tuned it around the " +
        "board's 14-bit ADC.",
      highlights: [
        "Soil moisture and light sensors on an UNO R4 WiFi",
        "Calibration saved to EEPROM, 14-bit ADC tuning",
        "OLED readout and WiFi dashboard",
      ],
      stack: ["Arduino", "C++", "UNO R4 WiFi"],
      related: ["wall-r"], links: [],
    },

    /* ---------------- SECURITY & LINUX ---------------- */
    {
      id: "seclab", title: "Home Network Security Lab", tagline: "Audit and tooling",
      domain: "security", status: "Ongoing", year: "2026",
      blurb:
        "My home network setup: WireGuard with split and full tunnel plus DDNS, Kali " +
        "running in Docker, and analysis with Wireshark, Nmap, and Bettercap. When I " +
        "audited the network I found an open SOCKS5 proxy and several exposed IoT devices.",
      highlights: [
        "WireGuard split and full tunnel with DDNS",
        "Kali in Docker for analysis",
        "Found an open SOCKS5 proxy and exposed IoT devices",
      ],
      stack: ["WireGuard", "Kali", "Docker", "Wireshark", "Nmap", "Bettercap"],
      related: ["debian-server", "arch", "cloudflare"], links: [],
    },
    {
      id: "phishing-osint", title: "Phishing OSINT Investigation", tagline: "Threat intel",
      domain: "security", status: "Report", year: "2026",
      blurb:
        "I traced a phishing campaign through its redirector back to the infrastructure " +
        "behind it, then wrote it up as a threat-intelligence report.",
      highlights: [
        "Followed the campaign from redirector to backend",
        "Written up as a threat-intelligence report",
      ],
      stack: ["OSINT", "Threat Intel"],
      related: ["osint-tool", "shinyhunters"], links: [],
    },
    {
      id: "osint-tool", title: "Infra OSINT Recon Tool", tagline: "Attack surface",
      domain: "security", status: "Built", year: "2026",
      blurb:
        "A Python recon tool that maps what a piece of infrastructure has exposed. " +
        "It looks at systems and leaves people out of it.",
      highlights: [
        "Focused on infrastructure instead of people",
        "Attack surface mapping in Python",
      ],
      stack: ["Python", "OSINT"],
      related: ["phishing-osint"], links: [],
    },
    {
      id: "shinyhunters", title: "ShinyHunters Breach Case Study", tagline: "Canvas / Instructure",
      domain: "security", status: "Writeup", year: "2026",
      blurb:
        "A case study of the ShinyHunters breach of Canvas/Instructure, going through " +
        "how API keys and bearer tokens work and each phase of the incident response.",
      highlights: [
        "How API keys and bearer tokens were abused",
        "Walked through the incident response phases",
      ],
      stack: ["Case Study", "Incident Response"],
      related: ["phishing-osint"], links: [],
    },
    {
      id: "debian-server", title: "Headless Debian Homelab", tagline: "on a 2008 MacBook",
      domain: "security", status: "Running", year: "2026",
      blurb:
        "A 2008 MacBook that now runs headless Debian with Pi-hole, WireGuard, Jellyfin, " +
        "and Docker. I documented the whole setup in a GitHub README.",
      highlights: [
        "Runs Pi-hole, WireGuard, Jellyfin, and Docker",
        "A second life for 2008 hardware",
        "Documented in a GitHub README",
      ],
      stack: ["Debian", "Docker", "Pi-hole", "Jellyfin", "WireGuard"],
      related: ["seclab", "arch"], links: [],
    },
    {
      id: "arch", title: "Arch Linux Daily Driver", tagline: "Hyprland rice",
      domain: "security", status: "Daily driver", year: "2026",
      blurb:
        "The computer I use every day: Arch on LUKS-encrypted btrfs with a custom " +
        "Hyprland rice (Waybar, a dock, and a Quickshell shell). I've cloned and " +
        "moved the install between drives.",
      highlights: [
        "LUKS-encrypted btrfs root",
        "Custom Hyprland rice with Waybar, a dock, and Quickshell",
        "Cloned and migrated across drives",
      ],
      stack: ["Arch Linux", "Hyprland", "btrfs", "LUKS"],
      related: ["seclab", "debian-server"], links: [],
    },
    {
      id: "cloudflare", title: "Cloudflare Tunnel + Scramjet", tagline: "Self-hosted proxy",
      domain: "security", status: "Built", year: "2026",
      blurb:
        "A self-hosted Scramjet proxy on my own domain, exposed through a Cloudflare " +
        "Tunnel so I don't have to open any ports.",
      highlights: [
        "Scramjet proxy behind a Cloudflare Tunnel",
        "Runs on a custom domain with no open ports",
      ],
      stack: ["Cloudflare Tunnel", "Scramjet", "Self-host"],
      related: ["seclab"], links: [],
    },

    /* ---------------- GAMES & PYTHON ---------------- */
    {
      id: "blackjack", title: "Blackjack", tagline: "Console to Pygame",
      domain: "games", status: "Built", year: "2026",
      blurb:
        "Started as console blackjack with chips and standard dealer rules, then I " +
        "rebuilt it with a full graphical table in Pygame.",
      highlights: ["Chips and standard dealer rules", "Rebuilt from console into Pygame"],
      stack: ["Python", "Pygame"],
      related: ["pysino"], links: [],
    },
    {
      id: "platformer", title: "2D Platformer", tagline: "Hand-written physics",
      domain: "games", status: "Built", year: "2026",
      blurb: "A 2D platformer in Pygame where I wrote the gravity, collision, and movement myself.",
      highlights: ["Physics and collision written from scratch", "Built in Pygame"],
      stack: ["Python", "Pygame"],
      related: ["pysino"], links: [],
    },
    {
      id: "dungeon", title: "Dungeon Crawler", tagline: "Text adventure",
      domain: "games", status: "Built", year: "2026",
      blurb: "A text-adventure dungeon crawler using nothing but the Python standard library.",
      highlights: ["Standard library only", "Classic text-adventure loop"],
      stack: ["Python"],
      related: ["pysino"], links: [],
    },
    {
      id: "magic-combat", title: "Magic Combat", tagline: "Roblox",
      domain: "games", status: "Built", year: "2026",
      blurb:
        "A magic combat game on Roblox with server-authoritative spells, lock-on " +
        "targeting, a combat HUD, and melee combos.",
      highlights: [
        "Server-authoritative spellcasting",
        "Lock-on targeting and a combat HUD",
        "Melee combo system",
      ],
      stack: ["Lua", "Roblox Studio"],
      related: ["exposure"], links: [],
    },
    {
      id: "daily-python", title: "Daily Python Challenge", tagline: "One build a day",
      domain: "ai", status: "Ongoing", year: "2026",
      blurb:
        "In October 2026 I started building one small Python project a day. Some of " +
        "them might turn into their own repos.",
      highlights: ["Started October 2026", "A new small build every day"],
      stack: ["Python"],
      related: ["debate", "pysino", "manim"], links: [],
    },

    /* ---------------- WEB ---------------- */
    {
      id: "cs-portfolio", title: "CS Portfolio", tagline: "Terminal theme",
      domain: "web", status: "Built", year: "2026",
      blurb:
        "A computer science portfolio with a dark terminal look, interactive project " +
        "cards, and a Big-O reference table.",
      highlights: ["Dark terminal look", "Interactive cards and a Big-O table"],
      stack: ["HTML", "CSS", "JavaScript"],
      related: ["cockpit-portfolio"], links: [],
    },
    {
      id: "cockpit-portfolio", title: "Cockpit Portfolio", tagline: "Glass cockpit theme",
      domain: "web", status: "Built", year: "2026",
      blurb:
        "A portfolio styled like a cockpit, with an animated attitude indicator and " +
        "an annunciator strip that reacts as you scroll.",
      highlights: ["Animated attitude indicator", "Annunciator strip that follows your scroll"],
      stack: ["HTML", "CSS", "JavaScript", "SVG"],
      related: ["cs-portfolio", "anchor"], links: [],
    },
    {
      id: "family-photos", title: "Family Photo Site", tagline: "GitHub Pages",
      domain: "web", status: "Live", year: "2026",
      blurb: "A photo site for my family, hosted on GitHub Pages.",
      highlights: ["Hosted on GitHub Pages"],
      stack: ["HTML", "CSS", "GitHub Pages"],
      related: ["photo"], links: [],
    },
    {
      id: "readykit", title: "ReadyKit", tagline: "Emergency prep",
      domain: "web", status: "Built", year: "2026",
      blurb:
        "An emergency-preparedness app I built in Code.org App Lab, with multiple " +
        "screens and saved data.",
      highlights: ["Multiple screens in App Lab", "Saves data between uses"],
      stack: ["App Lab", "JavaScript"],
      related: [], links: [],
    },

    /* ---------------- CREATIVE ---------------- */
    {
      id: "ai-buddy", title: "AI Buddy", tagline: "Snarky desk companion",
      domain: "creative", status: "In progress", year: "2026",
      blurb:
        "A snarky desk companion on a Raspberry Pi, with an animated face on a screen " +
        "and 3D-printed chassis parts. It runs on a cloud API for now, and I plan to " +
        "swap in a local model later.",
      highlights: [
        "Animated face on a Raspberry Pi",
        "Cloud API now, local model later",
        "3D-printed chassis",
      ],
      stack: ["Raspberry Pi", "Python", "3D Printing"],
      related: ["debate", "wall-r"], links: [],
    },
    {
      id: "two-eternals", title: "Two Eternals", tagline: "Original manga",
      domain: "creative", status: "Concept", year: "2026",
      blurb: "An original manga I'm developing, with my own characters, story, and world.",
      highlights: ["Original characters and world", "Worldbuilding still in progress"],
      stack: ["Worldbuilding", "Illustration"],
      related: ["exposure"], links: [],
    },
    {
      id: "manim", title: "Manim Explainers", tagline: "Animated math",
      domain: "creative", status: "Exploring", year: "2026",
      blurb: "I've been trying out Manim to make animated math explainers.",
      highlights: ["Animated math with Manim"],
      stack: ["Python", "Manim"],
      related: ["daily-python"], links: [],
    },

    /* ---------------- PHOTOGRAPHY ---------------- */
    {
      id: "photo", title: "Photography & Aerial", tagline: "Planes and drones",
      domain: "photo", status: "Ongoing", year: "2026",
      blurb:
        "I spot planes at RDU with a Canon Rebel T3i and a 75–300mm lens. Some favorites " +
        "so far are an Air France 777, a Breeze A220, a NetJets Challenger 350, and an " +
        "American 737-800 in anniversary livery. Drone work is next, and I'm planning " +
        "on getting my FAA Part 107.",
      highlights: [
        "Plane spotting at RDU",
        "Canon T3i and T100, Panasonic FZ1000, DJI Mini 3 Pro",
        "FAA Part 107 planned",
      ],
      stack: ["Canon T3i", "Panasonic FZ1000", "DJI Mini 3 Pro"],
      related: ["exposure", "family-photos"], links: [],
    },
  ],

  photography: {
    intro:
      "Most of what I shoot is airplanes. These are all from one fall afternoon at " +
      "RDU, on the T3i with the 75–300mm.",
    gear: [
      { name: "Canon Rebel T3i", note: "with a 75–300mm, my main camera" },
      { name: "Canon T100", note: "lighter second body" },
      { name: "Panasonic FZ1000", note: "bridge camera" },
      { name: "DJI Mini 3 Pro", note: "drone" },
    ],
    // The first shot gets the big spot in the gallery.
    shots: [
      { src: "assets/img/air-france-777.jpg", caption: "Air France 777" },
      { src: "assets/img/american-737.jpg", caption: "American 737 over the fall colors" },
      { src: "assets/img/breeze-a220.jpg", caption: "Breeze A220" },
      { src: "assets/img/copa-737.jpg", caption: "Copa 737, wheels up" },
      { src: "assets/img/frontier-a321.jpg", caption: "Frontier A321" },
      { src: "assets/img/pilatus-pc12.jpg", caption: "Pilatus PC-12" },
      { src: "assets/img/united-star-alliance.jpg", caption: "United 737 in Star Alliance colors" },
      { src: "assets/img/avelo-737.jpg", caption: "Avelo 737" },
      { src: "assets/img/volaris-a320.jpg", caption: "Volaris A320" },
      { src: "assets/img/united-737.jpg", caption: "United 737" },
      { src: "assets/img/delta-crj.jpg", caption: "Delta CRJ" },
      { src: "assets/img/delta-a319.jpg", caption: "Delta A319" },
    ],
    note: "I'm planning on getting my FAA Part 107 so I can do more with the drone.",
  },

  skills: [
    { group: "Languages",      items: ["Python", "JavaScript", "Lua", "C++", "HTML / CSS"] },
    { group: "Web & Runtime",  items: ["Node", "Express", "PWA / Service Workers", "Pygame"] },
    { group: "Hardware & IoT", items: ["Arduino", "Raspberry Pi", "HC-SR04", "Servos & OLED", "3D Printing"] },
    { group: "Security & Linux", items: ["Arch · Hyprland", "Debian", "Docker", "WireGuard", "Wireshark · Nmap", "Bettercap · Kali", "OSINT"] },
    { group: "Cloud & Infra",  items: ["Render", "Cloudflare Tunnel", "GitHub Pages"] },
    { group: "Creative Tools", items: ["Roblox Studio", "Manim", "Photography"] },
  ],
};
