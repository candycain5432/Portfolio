/* ============================================================================
   data.js: single source of truth for the whole site.
   Edit THIS file to add/change projects, links, bio, skills, photography.
   Everything else (constellation + cards + modal) is generated from here.
   ========================================================================== */

window.PORTFOLIO = {

  /* --- Who you are. Placeholders in [brackets]: swap them in. ------------ */
  profile: {
    name: "William Cain",
    initials: "WC",
    // Rotating roles shown under the hero headline:
    roles: [
      "Developer & maker",
      "Security + homelab tinkerer",
      "Game developer",
      "Photographer & drone pilot",
      "Hardware & AI builder",
    ],
    headline: "I build across the whole stack:",
    // The highlighted, animated part of the headline:
    headlineAccent: "PWAs, game engines, Arduino radars, and security labs.",
    blurb:
      "I'm a developer and maker who refuses to pick one lane. One week it's a " +
      "faith PWA with an auto-updating service worker, the next it's a provably-fair " +
      "Python game engine, an ultrasonic radar on an Arduino, or a WireGuard homelab. " +
      "I like shipping things that actually run, and documenting them well.",
    bio: [
      "My work spans six worlds: web apps, game development, hardware & IoT, " +
      "security & Linux, AI tooling, and creative projects. The constellation above " +
      "maps how they connect. Drag a node, hover to light up its links, click to dig in.",
      "I care about craft on both ends: a clean design system and a silent service " +
      "worker on the front, a provably-fair RNG or an EEPROM-backed calibration routine " +
      "underneath. When something's finished, I write it up: engineering PDFs, OSINT " +
      "reports, and GitHub READMEs that someone else could actually follow.",
    ],
    facts: [
      { k: "Based in", v: "[Your city / region]" },
      { k: "Focus", v: "Full-stack · hardware · security" },
      { k: "Currently", v: "Daily Python challenge + AI Buddy build" },
      { k: "Cert", v: "FAA Part 107 (planned)" },
    ],
    email: "williamtylercain441@gmail.com",
    // Fill real URLs in; "#" renders as a muted “add link” placeholder.
    socials: [
      { label: "GitHub",   href: "#", handle: "[your-github]" },
      { label: "LinkedIn", href: "#", handle: "[your-linkedin]" },
      { label: "YouTube",  href: "#", handle: "[optional]" },
      { label: "Discord",  href: "#", handle: "[optional]" },
    ],
  },

  /* --- The six domains. Colors drive the constellation clusters. ---------- */
  domains: [
    { id: "web",      label: "Web & Apps",       color: "#46d6a4", blurb: "PWAs, portfolios, and sites that ship." },
    { id: "games",    label: "Games",            color: "#a78bfa", blurb: "Engines, Roblox, and hand-rolled physics." },
    { id: "hardware", label: "Hardware & IoT",   color: "#f6a94a", blurb: "Arduino, sensors, radars, and robots." },
    { id: "security", label: "Security & Linux", color: "#ff6b81", blurb: "Homelab, OSINT, VPNs, and a daily-driver Arch rice." },
    { id: "ai",       label: "AI & Software",    color: "#5cc8ff", blurb: "Agents, tooling, and a daily Python habit." },
    { id: "creative", label: "Creative",         color: "#f574b8", blurb: "Manga, math animation, and a snarky desk robot." },
    { id: "photo",    label: "Photography",      color: "#e9c45f", blurb: "Aviation, aerial, and long-exposure work." },
  ],

  /* --- Every project. `related` draws cross-links in the constellation. --- */
  projects: [
    /* ---------------- FEATURED ---------------- */
    {
      id: "anchor", title: "Anchor", tagline: "Project Lumen",
      domain: "web", featured: true, status: "Live", year: "2026",
      blurb:
        "A Catholic daily-faith progressive web app. Node/Express backend on Render, " +
        "a silent auto-updating service worker, and a gold-and-navy design system with " +
        "a UI inspired by the Garmin G3000 glass cockpit.",
      highlights: [
        "Offline-first PWA with a silent, auto-updating service worker",
        "Node/Express backend deployed on Render",
        "Gold/navy design system, G3000-inspired interface",
      ],
      stack: ["JavaScript", "Node", "Express", "PWA", "Render"],
      related: ["cockpit-portfolio"], links: [],
    },
    {
      id: "exposure", title: "EXPOSURE", tagline: "Roblox horror",
      domain: "games", featured: true, status: "In progress", year: "2026",
      blurb:
        "A photography-stealth horror game I'm building with a friend. The camera " +
        "prototype already does shot validation, a viewfinder HUD with a live " +
        "requirement checklist, lens switching, and long exposure.",
      highlights: [
        "Shot validation against live photo requirements",
        "Viewfinder HUD + requirement checklist",
        "Lens switching and long-exposure capture",
      ],
      stack: ["Lua", "Roblox Studio"],
      related: ["magic-combat", "photo"], links: [],
    },
    {
      id: "pysino", title: "Pysino", tagline: "Game engine",
      domain: "games", featured: true, status: "Built", year: "2026",
      blurb:
        "A Python/Pygame game engine with a provably-fair RNG (server seed, client " +
        "seed, nonce). It has a scene stack, a Bank, audio, a particle system, and a " +
        "headless mode for testing.",
      highlights: [
        "Provably-fair RNG: server seed · client seed · nonce",
        "Scene stack, Bank, audio, and particle system",
        "Headless mode for automated runs",
      ],
      stack: ["Python", "Pygame"],
      related: ["blackjack", "platformer", "dungeon"], links: [],
    },
    {
      id: "debate", title: "Multi-Agent AI Debate", tagline: "Judged by a blinded moderator",
      domain: "ai", featured: true, status: "Built", year: "2026",
      blurb:
        "AI agents debate while a blinded moderator judges the exchange. Includes bias " +
        "detection, anti-reframe anchoring, double-verdict runs, and batch testing.",
      highlights: [
        "Blinded moderator + double-verdict runs",
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
        "An Arduino ultrasonic radar with an OLED display, a proximity buzzer, and a " +
        "WiFi web dashboard, shipped with a full engineering reference PDF.",
      highlights: [
        "Servo-swept HC-SR04 radar with OLED readout",
        "Proximity buzzer + live WiFi web dashboard",
        "Full engineering reference PDF",
      ],
      stack: ["Arduino", "C++", "HC-SR04", "Servo"],
      related: ["plant-monitor"], links: [],
    },
    {
      id: "plant-monitor", title: "Plant Monitor", tagline: "UNO R4 WiFi",
      domain: "hardware", featured: true, status: "Built", year: "2026",
      blurb:
        "Soil-moisture and light sensors with an OLED readout and a WiFi dashboard on " +
        "an UNO R4 WiFi, with EEPROM-backed calibration and 14-bit ADC tuning.",
      highlights: [
        "Soil-moisture + light sensing on UNO R4 WiFi",
        "EEPROM-backed calibration, 14-bit ADC tuning",
        "OLED readout + WiFi dashboard",
      ],
      stack: ["Arduino", "C++", "UNO R4 WiFi"],
      related: ["wall-r"], links: [],
    },

    /* ---------------- SECURITY & LINUX ---------------- */
    {
      id: "seclab", title: "Home Network Security Lab", tagline: "Audit + tooling",
      domain: "security", status: "Ongoing", year: "2026",
      blurb:
        "A WireGuard VPN (split and full tunnel, DDNS), Kali Linux in Docker, and " +
        "network analysis with Wireshark, Nmap, and Bettercap. The audit turned up an " +
        "open SOCKS5 proxy and several exposed IoT devices.",
      highlights: [
        "WireGuard split/full tunnel with DDNS",
        "Kali-in-Docker analysis rig",
        "Audit found an open SOCKS5 proxy + IoT exposure",
      ],
      stack: ["WireGuard", "Kali", "Docker", "Wireshark", "Nmap", "Bettercap"],
      related: ["debian-server", "arch", "cloudflare"], links: [],
    },
    {
      id: "phishing-osint", title: "Phishing OSINT Investigation", tagline: "Threat intel",
      domain: "security", status: "Report", year: "2026",
      blurb:
        "A formatted threat-intelligence report that traced a phishing campaign through " +
        "a redirector all the way to its backend infrastructure.",
      highlights: [
        "Traced campaign: redirector → backend infra",
        "Formatted threat-intelligence writeup",
      ],
      stack: ["OSINT", "Threat Intel"],
      related: ["osint-tool", "shinyhunters"], links: [],
    },
    {
      id: "osint-tool", title: "Infra OSINT Recon Tool", tagline: "Attack surface",
      domain: "security", status: "Built", year: "2026",
      blurb:
        "A Python attack-surface reconnaissance tool focused on infrastructure rather " +
        "than people, mapping what's exposed, not who's behind it.",
      highlights: [
        "Infrastructure-first recon, not people-OSINT",
        "Attack-surface mapping in Python",
      ],
      stack: ["Python", "OSINT"],
      related: ["phishing-osint"], links: [],
    },
    {
      id: "shinyhunters", title: "ShinyHunters Breach Case Study", tagline: "Canvas / Instructure",
      domain: "security", status: "Writeup", year: "2026",
      blurb:
        "A case study of the Canvas/Instructure ShinyHunters breach, covering API-key " +
        "mechanics, bearer tokens, and the phases of incident response.",
      highlights: [
        "API-key mechanics + bearer-token abuse",
        "Walked the incident-response phases",
      ],
      stack: ["Case Study", "Incident Response"],
      related: ["phishing-osint"], links: [],
    },
    {
      id: "debian-server", title: "Headless Debian Homelab", tagline: "on a 2008 MacBook",
      domain: "security", status: "Running", year: "2026",
      blurb:
        "A headless Debian server running Pi-hole, WireGuard, Jellyfin, and Docker on a " +
        "2008 MacBook, documented end-to-end in a GitHub README.",
      highlights: [
        "Pi-hole · WireGuard · Jellyfin · Docker",
        "Second life for 2008 hardware",
        "Documented in a GitHub README",
      ],
      stack: ["Debian", "Docker", "Pi-hole", "Jellyfin", "WireGuard"],
      related: ["seclab", "arch"], links: [],
    },
    {
      id: "arch", title: "Arch Linux Daily Driver", tagline: "Hyprland rice",
      domain: "security", status: "Daily driver", year: "2026",
      blurb:
        "A LUKS-encrypted btrfs Arch install with a custom Hyprland rice (Waybar, a " +
        "dock, and a Quickshell shell), cloned and migrated between drives.",
      highlights: [
        "LUKS-encrypted btrfs root",
        "Custom Hyprland rice: Waybar · dock · Quickshell",
        "Cloned + migrated install across drives",
      ],
      stack: ["Arch Linux", "Hyprland", "btrfs", "LUKS"],
      related: ["seclab", "debian-server"], links: [],
    },
    {
      id: "cloudflare", title: "Cloudflare Tunnel + Scramjet", tagline: "Self-hosted proxy",
      domain: "security", status: "Built", year: "2026",
      blurb:
        "A self-hosted Scramjet proxy exposed over a Cloudflare Tunnel on my own domain, " +
        "with no open ports, no public IP.",
      highlights: [
        "Scramjet proxy behind a Cloudflare Tunnel",
        "Runs on a custom domain, no open ports",
      ],
      stack: ["Cloudflare Tunnel", "Scramjet", "Self-host"],
      related: ["seclab"], links: [],
    },

    /* ---------------- GAMES & PYTHON ---------------- */
    {
      id: "blackjack", title: "Blackjack", tagline: "Console → Pygame",
      domain: "games", status: "Built", year: "2026",
      blurb:
        "A console blackjack with chips and standard dealer rules, then rebuilt with a " +
        "full graphical table in Pygame.",
      highlights: ["Chips + standard dealer rules", "Rebuilt from console into Pygame"],
      stack: ["Python", "Pygame"],
      related: ["pysino"], links: [],
    },
    {
      id: "platformer", title: "2D Platformer", tagline: "Hand-written physics",
      domain: "games", status: "Built", year: "2026",
      blurb:
        "A 2D platformer in Pygame with physics written from scratch: gravity, " +
        "collision, and movement, no engine shortcuts.",
      highlights: ["From-scratch physics + collision", "Built in Pygame"],
      stack: ["Python", "Pygame"],
      related: ["pysino"], links: [],
    },
    {
      id: "dungeon", title: "Dungeon Crawler", tagline: "Text adventure",
      domain: "games", status: "Built", year: "2026",
      blurb:
        "A text-adventure dungeon crawler built using only the Python standard library, " +
        "with no dependencies at all.",
      highlights: ["Standard library only, zero deps", "Classic text-adventure loop"],
      stack: ["Python"],
      related: ["pysino"], links: [],
    },
    {
      id: "magic-combat", title: "Magic Combat", tagline: "Roblox",
      domain: "games", status: "Built", year: "2026",
      blurb:
        "A Roblox magic-combat game with server-authoritative spells, a lock-on system, " +
        "a combat HUD, and a melee combo system.",
      highlights: [
        "Server-authoritative spellcasting",
        "Lock-on targeting + combat HUD",
        "Melee combo system",
      ],
      stack: ["Lua", "Roblox Studio"],
      related: ["exposure"], links: [],
    },
    {
      id: "daily-python", title: "Daily Python Challenge", tagline: "One build a day",
      domain: "ai", status: "Ongoing", year: "2026",
      blurb:
        "One small Python project every day, started October 2026: a growing streak of " +
        "experiments that may become a repo or a page of its own.",
      highlights: ["Started October 2026", "A new small build every day"],
      stack: ["Python"],
      related: ["debate", "pysino", "manim"], links: [],
    },

    /* ---------------- WEB ---------------- */
    {
      id: "cs-portfolio", title: "CS Portfolio", tagline: "Terminal theme",
      domain: "web", status: "Built", year: "2026",
      blurb:
        "A computer-science portfolio with a dark terminal look, interactive project " +
        "cards, and a built-in Big-O reference table.",
      highlights: ["Dark terminal aesthetic", "Interactive cards + Big-O reference"],
      stack: ["HTML", "CSS", "JavaScript"],
      related: ["cockpit-portfolio"], links: [],
    },
    {
      id: "cockpit-portfolio", title: "Cockpit Portfolio", tagline: "Glass-cockpit theme",
      domain: "web", status: "Built", year: "2026",
      blurb:
        "A cockpit-themed portfolio with an animated attitude indicator and an " +
        "annunciator strip that reacts as you scroll.",
      highlights: ["Animated attitude indicator", "Live annunciator strip"],
      stack: ["HTML", "CSS", "JavaScript", "SVG"],
      related: ["cs-portfolio", "anchor"], links: [],
    },
    {
      id: "family-photos", title: "Family Photo Site", tagline: "GitHub Pages",
      domain: "web", status: "Live", year: "2026",
      blurb: "A family photo site, hosted on GitHub Pages for everyone to browse.",
      highlights: ["Hosted on GitHub Pages"],
      stack: ["HTML", "CSS", "GitHub Pages"],
      related: ["photo"], links: [],
    },
    {
      id: "readykit", title: "ReadyKit", tagline: "Emergency prep",
      domain: "web", status: "Built", year: "2026",
      blurb:
        "An emergency-preparedness app built in Code.org App Lab with data persistence " +
        "and multiple screens.",
      highlights: ["Multi-screen App Lab build", "Persistent local data"],
      stack: ["App Lab", "JavaScript"],
      related: [], links: [],
    },

    /* ---------------- CREATIVE ---------------- */
    {
      id: "ai-buddy", title: "AI Buddy", tagline: "Snarky desk companion",
      domain: "creative", status: "In progress", year: "2026",
      blurb:
        "A snarky desk companion on a Raspberry Pi with an animated face on a screen. " +
        "It has a swappable brain (cloud API now, local model later) and 3D-printed " +
        "chassis parts.",
      highlights: [
        "Animated face on a Raspberry Pi",
        "Swappable brain: cloud API now, local later",
        "3D-printed chassis",
      ],
      stack: ["Raspberry Pi", "Python", "3D Printing"],
      related: ["debate", "wall-r"], links: [],
    },
    {
      id: "two-eternals", title: "Two Eternals", tagline: "Original manga",
      domain: "creative", status: "Concept", year: "2026",
      blurb:
        "An original manga concept with its own cast of characters and worldbuilding: " +
        "story, design, and lore developed from scratch.",
      highlights: ["Original characters + world", "Ongoing worldbuilding"],
      stack: ["Worldbuilding", "Illustration"],
      related: ["exposure"], links: [],
    },
    {
      id: "manim", title: "Manim Explainers", tagline: "Animated math",
      domain: "creative", status: "Exploring", year: "2026",
      blurb:
        "Exploring animated math explainers with Manim, turning concepts into clean, " +
        "narrated motion.",
      highlights: ["Animated math with Manim"],
      stack: ["Python", "Manim"],
      related: ["daily-python"], links: [],
    },

    /* ---------------- PHOTOGRAPHY (also has its own section) ---------------- */
    {
      id: "photo", title: "Photography & Aerial", tagline: "Aviation + drone",
      domain: "photo", status: "Ongoing", year: "2026",
      blurb:
        "Plane spotting at RDU: a Breeze A220, a NetJets Challenger 350, an American " +
        "737-800 in anniversary livery, all shot on a Canon Rebel T3i with a 75–300mm lens. " +
        "Drone work is next, with FAA Part 107 certification planned.",
      highlights: [
        "Aviation spotting at RDU",
        "Gear: Canon T3i & T100, Panasonic FZ1000, DJI Mini 3 Pro",
        "FAA Part 107 planned",
      ],
      stack: ["Canon T3i", "Panasonic FZ1000", "DJI Mini 3 Pro"],
      related: ["exposure", "family-photos"], links: [],
    },
  ],

  /* --- Photography section detail -------------------------------------- */
  photography: {
    intro:
      "Aviation pulls most of my shooting: long lenses at the fence line, and " +
      "increasingly the view from above. Here's the kit and a few recent captures.",
    gear: [
      { name: "Canon Rebel T3i", note: "+ 75–300mm, main spotting body" },
      { name: "Canon T100", note: "lightweight second body" },
      { name: "Panasonic FZ1000", note: "bridge / reach" },
      { name: "DJI Mini 3 Pro", note: "aerial & drone work" },
    ],
    // Add real photos to assets/img and list them here (src + caption).
    shots: [
      { caption: "Breeze A220 · RDU" },
      { caption: "NetJets Challenger 350 · RDU" },
      { caption: "American 737-800 · anniversary livery" },
      { caption: "Aerial · DJI Mini 3 Pro" },
      { caption: "[ Add your shot ]" },
      { caption: "[ Add your shot ]" },
    ],
    note: "FAA Part 107 certification planned, with more aerial work to come.",
  },

  /* --- Skills, grouped. Edit freely. ----------------------------------- */
  skills: [
    { group: "Languages",      items: ["Python", "JavaScript", "Lua", "C++", "HTML / CSS"] },
    { group: "Web & Runtime",  items: ["Node", "Express", "PWA / Service Workers", "Pygame"] },
    { group: "Hardware & IoT", items: ["Arduino", "Raspberry Pi", "HC-SR04", "Servos & OLED", "3D Printing"] },
    { group: "Security & Linux", items: ["Arch · Hyprland", "Debian", "Docker", "WireGuard", "Wireshark · Nmap", "Bettercap · Kali", "OSINT"] },
    { group: "Cloud & Infra",  items: ["Render", "Cloudflare Tunnel", "GitHub Pages"] },
    { group: "Creative Tools", items: ["Roblox Studio", "Manim", "Photography"] },
  ],
};
