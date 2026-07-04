// Single source of truth for site content — edit here, not in the components.
export const conf = {
  edition: '#0',
  year: '2026',
  city: 'Prague',
  dates: 'Autumn 2026 · Prague, Czech Republic',
  tagline: ['Open mesh technologies.', 'Real hardware.', 'Human networks.'],
  ticketUrl: '#tickets',
  repoUrl: 'https://github.com/',
  email: 'hello@coreconf.dev'
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Sponsors', href: '#sponsors' }
];

export const stats = [
  { value: '2', unit: 'days', label: 'talks, workshops & field ops' },
  { value: '300+', unit: 'people', label: 'builders, operators & hackers' },
  { value: '100%', unit: 'open', label: 'open hardware & open source' },
  { value: '1', unit: 'city', label: 'Prague — one live mesh over the rooftops' }
];

export const aboutIntro = "The LoRa mesh space is growing fast — MeshCore, Meshtastic, Reticulum, a dozen firmware forks — each with their own community and no shared forum. COREconf is an attempt to fix that. Get the people actually building this stuff into one room, put a pile of hardware on the table, and figure out where the ecosystem is going. Expect a lot of nodes, a live mesh over the city, and a good time.";

export const about = [
  {
    icon: "cpu",
    title: "Bring your nodes",
    body: "Boards, antennas, weird prototypes, half-finished builds — bring them. Swap gear, compare setups, and light up a live mesh across the room and the city."
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
    track: 'Field op',
    title: 'City-wide range test across Prague rooftops',
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
  tiers: [
    { name: 'Core', slots: 2 },
    { name: 'Signal', slots: 3 },
    { name: 'Community', slots: 6 }
  ]
};
