// ── Types ────────────────────────────────────────────────────

export interface CaseStudyContent {
  whatIBuilt: string
  why: string
  role: string
  duration: string
  whatSurprisedMe: string[]
  oneThingIWouldChange: string
  whatUsersSaid: string[]
}

export interface Project {
  id: string
  /** Display number: "01", "02", etc. */
  number: string
  name: string
  tagline: string
  tags: string[]
  /** Primary accent color for this project (hex) */
  accent: string
  caseStudy: CaseStudyContent
  githubLink?: string
  liveLink?: string
}

// ── Project data ─────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'susword',
    number: '01',
    name: 'SusWord',
    tagline: 'Real-time multiplayer social deduction game focused on suspense and interaction psychology.',
    tags: ['Game Design', 'React', 'Socket.IO', 'Node.js', 'Interaction Psychology'],
    accent: '#f47c5a', // accent.coral
    githubLink: 'https://github.com/harshikagahlot/SusWord',
    liveLink: 'https://sus-word.vercel.app',
    caseStudy: {
      whatIBuilt:
        'A real-time multiplayer social deduction game. Built with React on the frontend and a Node.js/Socket.IO server on the backend to synchronize game state, timers, voting, and player identities instantly across clients.',
      why:
        'Standard word games are solitary and calm. I wanted to build something high-stress where vocabulary meets active deception — forcing players to think on their feet, defend themselves in a synchronous lobby, and figure out who is lying in real time.',
      role: 'Sole Developer (Frontend + Backend Socket integration)',
      duration: '6 weeks',
      whatSurprisedMe: [
        'Setting up Socket.IO rooms was relatively straightforward, but handling sudden client-side disconnections without ruining the active game state was incredibly challenging. I had to build a simple server-side connection buffer.',
        'During playtests, players didn\'t care about the scoring system I spent hours drafting. They just cared about the ticking clock. Suspense and social interaction drove 100% of the fun.'
      ],
      oneThingIWouldChange:
        'I built a complex reconnection flow that retries for 30 seconds. In hindsight, for a quick-fire social game, a simple \'return to lobby\' button and starting a new round is much faster and matches user behavior better.',
      whatUsersSaid: [
        '"It\'s surprisingly intense when the timer drops below 5 seconds and you still haven\'t found a word that fits."',
        '"We spent more time yelling at each other in the room than playing the actual game. It felt like playing a board game in person."'
      ]
    }
  },
  {
    id: 'habitmetric',
    number: '02',
    name: 'HabitMetric',
    tagline: 'Productivity habit tracker turning rough intentions into structured daily execution.',
    tags: ['Product Design', 'React', 'Behavioral UX', 'Data Viz'],
    accent: '#7c6ff7', // accent.purple
    githubLink: 'https://github.com/harshikagahlot/HabitMetric',
    liveLink: 'https://harshikagahlot.github.io/HabitMetric/',
    caseStudy: {
      whatIBuilt:
        'A clean productivity habit tracking tool designed around trend ratios. Built with React and Tailwind CSS, focusing on long-term consistency metrics instead of standard uninterrupted streaks.',
      why:
        'Most habit apps make you feel like an absolute failure on day 4 when you inevitably miss a checkbox. Enforcing perfect streaks works for machines, not busy students. I wanted to design a tracker that is forgiving, tracking rhythm averages so missing a single Wednesday doesn\'t wipe out your progress.',
      role: 'Solo designer and developer',
      duration: '4 weeks',
      whatSurprisedMe: [
        'Adding gamification elements (badges and points) actually reduced tracking consistency in my early tests. Users felt it was too childish and ignored the core habits.',
        'Removing strict push notifications actually kept retention steady. Trusting users to log when they naturally wanted to was more sustainable than nagging them.'
      ],
      oneThingIWouldChange:
        'I focused heavily on local storage persistent caching. In a real production version, I would integrate a lightweight serverless DB first so users could sync habits across their laptop and phone seamlessly.',
      whatUsersSaid: [
        '"It\'s the first habit app I didn\'t delete after missing a day. The rhythm score actually feels supportive instead of stressful."',
        '"Super simple UI. I just click the button and close the tab. No clutter, no popups."'
      ]
    }
  },
  {
    id: 'accredian-orbit',
    number: '03',
    name: 'Accredian Orbit',
    tagline: 'Unified student ecosystem planning and PM wireframing exploration.',
    tags: ['Product Management', 'Systems Thinking', 'UX Research', 'Ecosystem Planning'],
    accent: '#2dd4a8', // accent.teal
    liveLink: 'https://drive.google.com/file/d/1DxkSeoQFBCydJ-pck48nSOvaIOh40Iev/view?usp=drivesdk', // Google Drive case study link
    caseStudy: {
      whatIBuilt:
        'A structured product exploration and systems planning exercise for "Accredian Orbit" — a unified student ecosystem. This case study deconstructs student friction, mapping out onboarding flows, student segmentation, dashboard wireframes, and feature tradeoffs.',
      why:
        'Online learning platforms are highly fragmented; students constantly switch between separate discussion boards, learning portals, and tracking sheets. I wanted to explore systems design for a unified workspace that bridges these gaps, focusing on social accountability and friction reduction.',
      role: 'Product Management Exploration (Case Study)',
      duration: '3 weeks',
      whatSurprisedMe: [
        'Mapping student segmentation showed that self-paced learners and boot-camp career switchers have completely opposite dashboard needs. One needs strict visual scaffolding, while the other needs high-flexibility shortcuts.',
        'Low-fidelity wireframing proved that reducing onboarding steps by just 15% completely shifts the ecosystem\'s initial retention and interaction levels.'
      ],
      oneThingIWouldChange:
        'I focused heavily on mapping a complex gamified discussion board. In a real product release, I would prioritize a centralized notification dashboard first, as unified updates solve a more immediate, daily pain point for students.',
      whatUsersSaid: [
        '"The ecosystem flow actually feels like it connects all my learning tools together instead of creating another place to check."',
        '"Highly focused onboarding. It asks exactly what you\'re learning and drops you into a custom workspace immediately."'
      ]
    }
  }
]


