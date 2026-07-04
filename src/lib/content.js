// Single source of truth for site content — edit here, not in the components.
export const conf = {
  edition: '#0',
  year: '2026',
  city: 'Prague',
  dates: 'Spring 2026 · Prague, CZ',
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
  { value: '1', unit: 'city', label: 'a mesh over Prague rooftops' }
];

export const aboutIntro = "The LoRa mesh space is growing fast — MeshCore, Meshtastic, Reticulum, a dozen firmware forks — each with their own community and no shared forum. COREconf is an attempt to fix that. Get the people actually building this stuff into one room, compare notes, and figure out where the ecosystem is going.";

export const about = [
  {
    title: "Firmware-agnostic",
    body: "MeshCore, Meshtastic, openHop, ZephCore — all welcome. No official firmware, no official app. Just people who build things."
  },
  {
    title: "No single owner",
    body: "COREconf is independent. Not affiliated with any project, company or working group. Anyone can participate, anyone can speak."
  },
  {
    title: "Edition zero",
    body: "This is the first one. Rough edges expected. Real conversations over polished presentations."
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
