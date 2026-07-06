// Single source of truth for site content — edit here, not in the components.
export const conf = {
  edition: '#0',
  year: '2026',
  city: 'Prague',
  dates: 'October 10-11, 2026',
  datesPlace: 'October 10-11, 2026 · Prague, Czech Republic',
  tagline: ['Open mesh technologies.', 'Real hardware.', 'Human networks.'],
  ticketUrl: '#tickets',
  repoUrl: 'https://github.com/',
  email: 'hello@coreconf.dev'
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'People', href: '#speakers' },
  { label: 'Communities', href: '#communities' },
  { label: 'Supporters', href: '#sponsors' }
];

export const stats = [
  { value: '2', unit: 'days', label: 'talks, workshops & hands-on sessions' },
  { value: '200+', unit: 'people', label: 'builders, operators & hackers' },
  { value: '100%', unit: 'open', label: 'open hardware & open source' },
  { value: '1', unit: 'city', label: 'Prague — builders from across the mesh scene' }
];

export const aboutIntro = [
  { text: 'The ' },
  { text: 'LoRa', href: 'https://lora-alliance.org/' },
  { text: ' mesh space is growing fast — ' },
  { text: 'MeshCore', href: 'https://meshcore.io/' },
  { text: ', ' },
  { text: 'Meshtastic', href: 'https://meshtastic.org/' },
  { text: ', ' },
  { text: 'Reticulum', href: 'https://reticulum.network/' },
  { text: ', and a growing family of forks and experiments, each with its own community and point of view. COREconf is a place to bring those threads together: get the people actually building this stuff into one room, put a pile of hardware on the table, and figure out where the ecosystem is going. Expect a lot of nodes, practical demos, and a good time.' }
];

export const about = [
  {
    icon: "cpu",
    title: "Bring your nodes",
    body: "Boards, antennas, weird prototypes, half-finished builds — bring them. Swap gear, compare setups, and get devices talking in the room."
  },
  {
    icon: "layers",
    title: "Firmware-agnostic",
    body: "MeshCore, Meshtastic, Reticulum, ZephCore — all welcome. No official firmware, no official app. Just people who build things."
  },
  {
    icon: "users",
    title: "No single owner",
    body: "COREconf is independent. Not affiliated with any project, company or working group. Anyone can participate, anyone can speak."
  },
  {
    icon: "flask",
    title: "Edition zero",
    body: "This is the first one. Rough edges expected. More hallway hacking and hands-on than polished slide decks."
  }
];

export const communityGroups = [
  {
    title: 'Projects & protocols',
    description: 'Projects and protocol communities we would like to have actively involved in the programme.',
    items: [
      {
        name: 'MeshCore',
        type: 'Firmware & apps',
        href: 'https://meshcore.io/',
        logo: 'https://avatars.githubusercontent.com/u/210668307?s=200&v=4',
        description: 'Lightweight LoRa mesh firmware, tools and app work for practical off-grid communication.'
      },
      {
        name: 'Meshtastic',
        type: 'Open mesh project',
        href: 'https://meshtastic.org/',
        logo: 'https://avatars.githubusercontent.com/u/61627050?s=200&v=4',
        description: 'A large open-source LoRa mesh community spanning devices, mobile apps, routing and field use.'
      },
      {
        name: 'Reticulum',
        type: 'Network stack',
        href: 'https://reticulum.network/',
        logo: 'https://reticulum.network/gfx/reticulum_logo_512.png',
        description: 'A cryptography-based networking stack for resilient, long-range and infrastructure-light networks.'
      },
      {
        name: 'Core Protocol',
        type: 'Protocol work',
        href: 'https://coreprotocol.org/',
        description: 'Protocol thinking, experiments and coordination around interoperable open mesh communication.'
      }
    ]
  },
  {
    title: 'Local meshes',
    description: 'Local mesh communities we would like to hear from on stage, in workshops and in hallway sessions.',
    items: [
      {
        name: 'MeshCore Czech Republic',
        type: 'Local mesh',
        href: 'https://meshcore.cz/',
        flag: 'CZ',
        description: 'Builders, operators and testers around the Czech MeshCore scene.'
      },
      /*{
        name: 'MeshCore Switzerland',
        type: 'Local mesh',
        href: 'https://www.meshcore.ch/',
        flag: 'CH',
        description: 'Swiss MeshCore builders and field operators.'
      },
      {
        name: 'MeshCore Portugal',
        type: 'Local mesh',
        href: 'https://www.meshcore.pt/',
        flag: 'PT',
        description: 'Portuguese MeshCore builders and field operators.'
      },*/
      {
        name: 'Your local mesh?',
        type: 'Add yours',
        href: 'mailto:hello@coreconf.dev',
        cta: true,
        description: 'Running a local mesh community? Come speak, demo, teach or share field notes.'
      }
    ]
  }
];

// Hardware we expect to have on the table — boards, radios and gadgets people
// can get their hands on. Seeded with popular kit; edit freely.
export const hardware = [
  {
    name: 'Heltec LoRa32 V3',
    category: 'ESP32 dev board',
    chip: 'ESP32-S3 · SX1262',
    description: 'Cheap, ubiquitous ESP32 board with an OLED — the default starting point for a lot of mesh builds.'
  },
  {
    name: 'LILYGO T-Deck',
    category: 'Handheld',
    chip: 'ESP32-S3 · SX1262',
    description: 'Keyboard, trackball and screen in one — a proper handheld node for messaging on the go.'
  },
  {
    name: 'RAK WisBlock (RAK4631)',
    category: 'Modular node',
    chip: 'nRF52840 · SX1262',
    description: 'Low-power nRF52 core with a snap-together sensor and IO ecosystem for field-ready builds.'
  },
  {
    name: 'Seeed XIAO nRF52840',
    category: 'Tiny core',
    chip: 'nRF52840',
    description: 'Thumbnail-sized low-power core, paired with a Wio-SX1262 for compact, coin-cell nodes.'
  },
  {
    name: 'Station G2',
    category: 'Base station',
    chip: 'nRF52840 · SX1262',
    description: 'A solid indoor/outdoor gateway-class node for anchoring a local mesh.'
  },
  {
    name: 'Antennas & RF bits',
    category: 'Accessories',
    chip: '433 / 868 / 915 MHz',
    description: 'A pile of antennas, pigtails, amplifiers and SDR dongles to test range and see the spectrum live.'
  }
];

export const program = [
  { time: '09:00', track: 'Opening', title: 'Why mesh, why now', speaker: 'Organisers' },
  {
    time: '10:00',
    track: 'Talk',
    title: 'MeshCore internals: routing on a shoestring',
    speaker: 'TBA'
  },
  {
    time: '11:30',
    track: 'Workshop',
    title: 'Flash your first node & join the room mesh',
    speaker: 'Hardware crew'
  },
  {
    time: '14:00',
    track: 'Talk',
    title: 'Off-grid comms in the field: lessons from the edge',
    speaker: 'TBA'
  },
  {
    time: '16:00',
    track: 'Workshop',
    title: 'Range, antennas and field notes',
    speaker: 'Everyone'
  },
  { time: '19:00', track: 'Social', title: 'Nodes & pilsner', speaker: 'The bar' }
];

export const speakers = [
  { name: 'To be announced', role: 'Protocol engineer', tag: 'Keynote' },
  { name: 'To be announced', role: 'Hardware hacker', tag: 'Workshop' },
  { name: 'To be announced', role: 'Field operator', tag: 'Talk' },
  { name: 'You?', role: 'CFP is open', tag: 'Submit', cta: true }
];

export const sponsors = {
  items: [
    /*{
      name: 'Seeed Studio',
      href: 'https://www.seeedstudio.com/',
      logo: 'https://avatars.githubusercontent.com/u/688117?s=280&v=4',
      focus: 'Hardware'
    },
    {
      name: 'LILYGO',
      href: 'https://lilygo.cc/',
      logo: 'https://i0.wp.com/makerfaire.com/wp-content/uploads/gravity_forms/278-40aa7c5199fa990dfae42dc2d91a1053/2024/10/LOGO%E5%BD%A9%E8%89%B2.jpg?resize=760%2C760&strip=all&ssl=1',
      focus: 'Boards'
    },
    {
      name: 'Heltec Automation',
      href: 'https://heltec.org/',
      logo: 'https://avatars.githubusercontent.com/u/32860573?s=280&v=4',
      focus: 'Radio hardware'
    },
    {
      name: 'You?',
      href: 'mailto:hello@coreconf.dev',
      focus: 'Become a supporter',
      cta: true
    }*/
  ],
  tiers: [
    { name: 'Core', slots: 2 },
    { name: 'Signal', slots: 3 },
    { name: 'Community', slots: 6 }
  ]
};
