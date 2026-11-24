/* ============================================================================
   data.js: all the site's content lives here (projects, bio, skills, photos).
   Plain straight quotes are fine; the page turns them into curly ones.
   ========================================================================== */

window.PORTFOLIO = {

  profile: {
    name: "William Cain",
    initials: "WC",
    // The big line at the top of the page.
    headline: "I write code, build gadgets, and take pictures of planes.",
    // The paragraph under it.
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
      { label: "Ko-fi", href: "https://ko-fi.com/williamcain" },
    ],
  },

  /* Project groups, used for the card colours and the filter buttons. */
  domains: [
    { id: "web",      label: "Web & Apps",       blurb: "Apps and websites." },
    { id: "games",    label: "Games",            blurb: "Engines, Roblox games, and homemade physics." },
    { id: "hardware", label: "Hardware & IoT",   blurb: "Arduino projects, sensors, and a radar." },
    { id: "security", label: "Security & Linux", blurb: "My homelab, OSINT work, and Arch." },
    { id: "ai",       label: "AI & Software",    blurb: "AI experiments and daily Python." },
    { id: "creative", label: "Creative",         blurb: "A manga, math animations, and a sarcastic desk robot." },
    { id: "photo",    label: "Photography",      blurb: "Mostly planes." },
  ],

  /* featured: true puts a project in the big cards at the top. `related` is a list of
     other project ids. `status` sets the stamp colour: Live / Running / Ongoing /
     Daily driver are green, In progress / Concept / Exploring are orange. */
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
      id: "cull", title: "Cull", tagline: "Photo culling assistant",
      domain: "ai", featured: true, status: "In progress", year: "2026",
      blurb:
        "A command-line tool that goes through a photo shoot for you. It ranks every " +
        "frame by sharpness and exposure, groups bursts and duplicates, and suggests " +
        "the best shot in each group with a plain-language reason. Then a keyboard-only " +
        "review screen in the browser lets you make the final call.",
      highlights: [
        "Sharpness from the variance of the Laplacian, exposure from histogram clipping",
        "Groups bursts by capture time and finds duplicates with perceptual hashing",
        "Reads RAW files (CR2, NEF, ARW, DNG...) through their embedded previews",
        "Keyboard-driven review screen with side-by-side compare and 100% zoom",
      ],
      stack: ["Python", "NumPy", "Pillow", "rawpy", "FastAPI", "Rich", "SQLite"],
      related: ["photo", "daily-python"],
      links: [{ label: "GitHub", href: "https://github.com/candycain5432/Cull" }],
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
      id: "exposure", title: "EXPOSURE", tagline: "Roblox horror",
      domain: "games", status: "In progress", year: "2026",
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

  /* ======================================================================
     The personal stuff. All of this is meant to be rewritten in your words.
     ====================================================================== */

  // Stickers stuck around the top of the page (visitors can drag them around).
  stickers: ["Arch btw", "Red Bull powered", "RDU plane spotter", "Part 107 soon"],

  // The scrolling strip under the top section.
  marquee: [
    "Python", "JavaScript", "Lua", "Arduino", "Plane spotting", "Mountain biking",
    "Philosophy", "Red Bull", "Arch Linux", "Photography", "Homelab", "Roblox", "Always learning",
  ],

  // "How I learn": things picked up while building. `via` is the id of the project it
  // came from; `still: true` marks something still in progress.
  learning: {
    intro:
      "I learn by building things. Almost every project here started with something " +
      "I didn't know how to do yet. Here's some of what that's taught me so far.",
    items: [
      { what: "How a service worker keeps an app working offline", via: "anchor" },
      { what: "Deploying a Node and Express backend on Render", via: "anchor" },
      { what: "Server-authoritative game logic in Lua", via: "magic-combat" },
      { what: "What \"provably fair\" means: server seeds, client seeds, nonces", via: "pysino" },
      { what: "Writing gravity and collision from scratch", via: "platformer" },
      { what: "Getting AI agents to argue fairly, and catching bias", via: "debate" },
      { what: "Measuring blur and exposure with plain math on pixels", via: "cull" },
      { what: "Ultrasonic sensing with an HC-SR04 on a servo", via: "wall-r" },
      { what: "Calibrating sensors on a 14-bit ADC and saving it to EEPROM", via: "plant-monitor" },
      { what: "WireGuard split and full tunnels, plus DDNS", via: "seclab" },
      { what: "Reading a network with Wireshark, Nmap and Bettercap", via: "seclab" },
      { what: "Tracing a phishing campaign back to its infrastructure", via: "phishing-osint" },
      { what: "How API keys and bearer tokens get abused", via: "shinyhunters" },
      { what: "LUKS and btrfs on Arch, and moving it between drives", via: "arch" },
      { what: "Self-hosting with no open ports through a Cloudflare Tunnel", via: "cloudflare" },
      { what: "Animating math with Manim", via: "manim", still: true },
      { what: "3D printing parts for a Raspberry Pi robot", via: "ai-buddy", still: true },
    ],
    now: "A small Python build every day (since October 2026), and AI Buddy.",
    next: "FAA Part 107, so I can do more with the drone.",
  },

  // Two sayings: the first runs in the terminal card in "Off the clock", the second is
  // the sign-off at the very bottom of the page.
  sayings: {
    terminal: "The quieter you become, the more you are able to hear.",
    signoff: "Blue skies and tailwinds",
  },

  // "Off the clock".
  life: {
    mtb: {
      label: "Off-road",
      title: "Mountain biking",
      text: "Trail rides, jumps, and the occasional race.",
      // The first photo is the big one; the second sits on top of it like a taped print.
      photos: [
        { src: "assets/img/mtb-jump.webp", caption: "airtime",
          alt: "William mid-air on a mountain bike, jumping a dirt lip in the woods" },
        { src: "assets/img/mtb-race.webp", caption: "race day, #864",
          alt: "William racing a mountain bike down a rocky section of a taped-off course, number 864" },
      ],
    },
    // Same layout as mountain biking, mirrored. `full` is the bigger version opened on click.
    flying: {
      label: "Airborne",
      title: "Flying",
      text: "Got some time at the controls of a Cessna 172. Plane spotting is the cheap version.",
      photos: [
        { src: "assets/img/flying-cockpit.webp", full: "assets/img/flying-cockpit-full.webp", caption: "left seat",
          alt: "William at the controls of a Cessna 172 in flight, wearing a headset, with farmland far below" },
        { src: "assets/img/flying-ramp.webp", full: "assets/img/flying-ramp-full.webp", caption: "me + a Cessna 172",
          alt: "William standing on an airport ramp in front of a white Cessna 172" },
      ],
    },
    // Before / during / after. A step with `drawing: true` and no `src` shows a pencil
    // sketch of the stock radio instead of a photo.
    car: {
      label: "Garage",
      title: "Head unit swap",
      text: "Pulled the stock radio out of my Elantra GT and wired in a Pioneer touchscreen.",
      steps: [
        { label: "before", src: "assets/img/car-before.webp", full: "assets/img/car-before-full.webp", caption: "the stock radio",
          alt: "The stock Hyundai radio with a small screen and rows of buttons, above the climate controls" },
        { label: "during", src: "assets/img/car-during.webp", full: "assets/img/car-during-full.webp", caption: "mid-surgery",
          alt: "The middle of a car dashboard with the radio pulled out, showing the empty mounting frame and wiring plugs" },
        { label: "after", src: "assets/img/car-after.webp", caption: "Pioneer, installed",
          alt: "A Pioneer touchscreen installed in the dashboard above the climate controls" },
      ],
    },
    philosophy: {
      quote: "If you replace every part on a mountain bike, one at a time, is it still the same bike?",
      note: "The ship of Theseus, but make it MTB.",
    },
    fuel: { title: "Fuel", text: "Runs on Red Bull. Currently running low.", cta: "Refuel me on Ko-fi" },
  },

  /* "Scrapbook": photos from life, taped into a sketchbook.
     To add one, run it through tools/scrapbook-photo.py (it makes both files below,
     handles iPhone HEIC photos and strips the GPS location), then paste the line it
     prints into this list. Or put any photo in assets/img/scrapbook/ and add a line
     with just `src`.
     src:   the small version shown on the page
     full:  (optional) the big version that opens when the photo is clicked
     shape: "tall" (3:4), "wide" (4:3) or "square". Photos are cropped to fit.
     A line with an empty `src` shows as an empty "photo goes here" frame. */
  scrapbook: {
    note: "straight from the camera roll",
    photos: [
      { src: "assets/img/scrapbook/friends.webp", full: "assets/img/scrapbook/friends-full.webp",
        caption: "the crew", shape: "wide",
        alt: "Four friends taking a selfie at night in front of tall hedges" },
      { src: "assets/img/scrapbook/tailgate.webp", full: "assets/img/scrapbook/tailgate-full.webp",
        caption: "tailgate crew", shape: "wide",
        alt: "William and three friends taking a selfie at night in front of an open car hatch" },
      { src: "assets/img/scrapbook/pysino.webp", full: "assets/img/scrapbook/pysino-full.webp",
        caption: "Pysino, mid-build", shape: "wide",
        alt: "A monitor in a dark room showing the Pysino code in an editor next to a terminal on an Arch Linux desktop" },
      { src: "assets/img/scrapbook/arches-raw.webp", full: "assets/img/scrapbook/arches-raw-full.webp",
        caption: "Arches National Park, shot in raw", shape: "tall",
        alt: "A tall, thin sandstone arch against a deep blue sky at Arches National Park" },
      { src: "assets/img/scrapbook/winglet.webp", full: "assets/img/scrapbook/winglet-full.webp",
        caption: "winglet view", shape: "square",
        alt: "An airplane winglet over a sea of clouds" },
      { src: "assets/img/scrapbook/send-it.webp", full: "assets/img/scrapbook/send-it-full.webp",
        caption: "send it", shape: "square",
        alt: "William in mid-air on a mountain bike after launching off a wooden ramp in the woods" },
      { src: "assets/img/scrapbook/red-bull.webp", full: "assets/img/scrapbook/red-bull-full.webp",
        caption: "refuel stop", shape: "tall",
        alt: "William and a friend taking a selfie, each holding up a can of Red Bull" },
      { src: "assets/img/scrapbook/essentials.webp", full: "assets/img/scrapbook/essentials-full.webp",
        caption: "the essentials", shape: "wide",
        alt: "A mountain bike leaning against a tree beside a table with a helmet and a can of Red Bull" },
      { src: "assets/img/scrapbook/overlook.webp", full: "assets/img/scrapbook/overlook-full.webp",
        caption: "up top", shape: "wide",
        alt: "Pine trees growing out of a rocky summit above a sea of green forested hills" },
      { src: "assets/img/scrapbook/chick-fil-a.webp", full: "assets/img/scrapbook/chick-fil-a-full.webp",
        caption: "post-ride Chick-fil-A", shape: "wide",
        alt: "Friends at a table covered in Chick-fil-A trays, with a mountain bike parked outside the window" },
      { src: "assets/img/scrapbook/window-seat.webp", full: "assets/img/scrapbook/window-seat-full.webp",
        caption: "window seat", shape: "tall",
        alt: "Mountains and clouds seen from an airplane window" },
      { src: "assets/img/scrapbook/turret-arch.webp", full: "assets/img/scrapbook/turret-arch-full.webp",
        caption: "Turret Arch, Arches National Park", shape: "wide",
        alt: "Turret Arch, a red sandstone arch in Arches National Park, under a deep blue sky" },
      { src: "assets/img/scrapbook/kali-cat.webp", full: "assets/img/scrapbook/kali-cat-full.webp",
        caption: "supervising the Kali install", shape: "square",
        alt: "A calico cat sitting in front of a monitor showing the Kali Linux installer, next to an open laptop" },
      { src: "assets/img/scrapbook/bike-rack.webp", full: "assets/img/scrapbook/bike-rack-full.webp",
        caption: "loaded up", shape: "wide",
        alt: "Three mountain bikes on a rack on the back of a black hatchback" },
      { src: "assets/img/scrapbook/ride-crew.webp", full: "assets/img/scrapbook/ride-crew-full.webp",
        caption: "the ride crew", shape: "wide",
        alt: "Four friends sitting on a curb with their mountain bikes and drinks" },
      { src: "assets/img/scrapbook/red-rock.webp", full: "assets/img/scrapbook/red-rock-full.webp",
        caption: "Arches National Park", shape: "tall",
        alt: "Tall red rock formations in Arches National Park against a bright blue sky" },
      { src: "assets/img/scrapbook/puppy.webp", full: "assets/img/scrapbook/puppy-full.webp",
        caption: "puppy. very important.", shape: "tall",
        alt: "William holding a fluffy black, white and brown puppy" },
      { src: "assets/img/scrapbook/arches-arch.webp", full: "assets/img/scrapbook/arches-arch-full.webp",
        caption: "Arches National Park", shape: "wide",
        alt: "A wide sandstone arch glowing orange in the sun at Arches National Park" },
      { src: "assets/img/scrapbook/coke.webp", full: "assets/img/scrapbook/coke-full.webp",
        caption: "summer + glass-bottle Coke", shape: "tall",
        alt: "William and a friend holding glass bottles of Coke under a blue sky" },
    ],
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
