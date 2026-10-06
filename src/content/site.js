// Every claim in this file is tracked in docs/CLAIM_LEDGER.md.
// Copy rule: no em dashes. En dashes only inside date ranges.

export const person = {
  name: 'Aryaan Habib',
  role: 'Software Engineer',
  location: 'Vancouver, BC',
  email: 'habibaryaan@gmail.com',
  github: 'https://github.com/AryaanHabib',
  linkedin: 'https://www.linkedin.com/in/aryaan-habib-1040b8226/',
};

export const proof = [
  {
    figure: '525 / 525',
    text: 'per-tick state hashes matched when I re-ran a recorded Arena match from its inputs alone.',
    href: '/work/arena',
  },
  {
    figure: '2 passes',
    text: 'before Sentinel posts a review comment: one to flag a possible bug, one to argue against it.',
    href: '/work/sentinel',
  },
  {
    figure: '1 winner',
    text: 'per lot in NBA Auction. Bids, lot closes, and phase changes only apply if the row is unchanged.',
    href: '/work/nba-auction',
  },
  {
    figure: '10 of 14',
    text: 'campaign levels in Adventure of the Ages were started by me, in the text level format I wrote.',
    href: '/work/adventure-of-the-ages',
  },
];

export const principles = [
  {
    title: 'One place decides',
    body: 'Clients send intent, not outcomes. In NBA Auction the database row is the referee for every bid. In Arena one tick thread owns the world and everything else goes through a queue.',
    links: [
      { label: 'NBA Auction', href: '/work/nba-auction' },
      { label: 'Arena', href: '/work/arena' },
    ],
  },
  {
    title: 'Behavior I can replay',
    body: 'If I can rerun something, I can check it. Arena replays a match tick by tick and compares hashes. Sentinel runs seeded-bug fixtures through the exact production pipeline.',
    links: [
      { label: 'Arena', href: '/work/arena' },
      { label: 'Sentinel', href: '/work/sentinel' },
    ],
  },
  {
    title: 'Small, legible seams',
    body: 'I split systems where the reasons differ. Sentinel keeps the webhook path in a tiny Go service. Our game moved level design into text files so four people could build levels without touching C++.',
    links: [
      { label: 'Sentinel', href: '/work/sentinel' },
      { label: 'Adventure of the Ages', href: '/work/adventure-of-the-ages' },
    ],
  },
];

export const experience = [
  {
    org: 'AeroQube Inc.',
    role: 'Software Developer Intern',
    dates: 'Jun – Sep 2025',
    place: 'Remote · Vancouver, BC',
    points: [
      'Built features for Calio, a cross-platform food discovery and fitness app, in React Native and React.',
      'Worked on its GPT-4 meal-recommendation assistant, which drew on user context such as time, cuisine, and past conversations.',
    ],
  },
  {
    org: 'University of British Columbia',
    role: 'Teaching Assistant, Mathematics',
    dates: 'Sep 2023 – Dec 2024',
    place: 'Vancouver, BC',
    points: [
      'Supported students in MATH 100 and MATH 180 through tutorials and one-on-one help.',
      'Wrote small scripts to take repetitive parts of grading off the TA team.',
    ],
  },
];

export const archive = [
  {
    title: 'Face Value · xPTS+',
    year: '2026',
    line: 'Shot-quality model that grades NBA scorers against the difficulty of their own shots. Python and scikit-learn for the model, Next.js for the app.',
    repo: 'https://github.com/AryaanHabib/face-value',
    demo: 'https://face-value-pi.vercel.app/',
  },
  {
    title: 'QuantumQuest',
    year: '2025',
    line: 'Task-management API in Django REST Framework, packaged with Docker Compose.',
    repo: 'https://github.com/AryaanHabib/QuantumQuest',
  },
  {
    title: 'MellowMate',
    year: '2025',
    line: 'Chat app with a React front end and a Django backend that relays conversations to the OpenAI API.',
    repo: 'https://github.com/AryaanHabib/MellowMate',
  },
  {
    title: 'UBC Course Finder',
    year: '2024',
    line: 'CPSC 310 course project: a TypeScript query engine over UBC course data, a REST server, and a small D3 front end.',
    repo: 'https://github.com/AryaanHabib/UBC-Course-Finder',
  },
  {
    title: 'SwipeMates',
    year: '2024',
    line: 'CPSC 304 course project: roommate matching on an Oracle SQL schema with a Java Swing interface.',
    repo: 'https://github.com/AryaanHabib/SwipeMate',
  },
];
