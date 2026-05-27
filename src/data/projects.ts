// ── Types ────────────────────────────────────────────────────

export interface Decision {
  title: string
  body: string
}

export interface CaseStudyContent {
  problem: string
  role: string
  duration: string
  /** Array of paragraphs describing the thinking process */
  thinking: string[]
  /** Key product/design decisions made during the project */
  decisions: Decision[]
  outcome: string
  /** Lessons learned — each entry is one lesson */
  lessonsLearned: string[]
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
    liveLink: 'https://susword.vercel.app/',
    caseStudy: {
      problem:
        'Online social deduction games often lack immediate emotional stakes and suspense in asynchronous or poorly timed loops. I wanted to build a real-time multiplayer system where vocabularies are weaponized, utilizing interaction psychology to keep players on the edge of their seats.',
      role: 'Sole Creator (Frontend + Backend real-time architect)',
      duration: '6 weeks',
      thinking: [
        "I analyzed classics like Among Us, Codenames, and standard word-association games. The core gap: word games are usually individual, while social deduction relies on synchronous debate.",
        "The insight: multiplayer synchronization must be absolute. Using Socket.IO, I designed a state machine where game events, timer pulses, voting states, and player reveals coordinate in under 50ms across all clients.",
        "Interaction Psychology: The visual states reflect the emotional state of the players. Shorter voting times, sudden reveal flashes, and sound-like visual feedback amplify the suspense loop."
      ],
      decisions: [
        {
          title: 'Socket.IO State Machine over HTTP polling',
          body: 'To capture real-time voting suspense, polling was out of the question. I built a server-driven state machine that pushes updates instantly to all connected sockets, ensuring every player experiences reveals at the exact same millisecond.'
        },
        {
          title: 'Focus on psychological tension',
          body: "Instead of complex rules, I kept the mechanics dead simple but loaded them with suspense: hidden identities, immediate voting rounds, and a dynamic reveal board. The UX design amplifies the 'who is lying' aspect."
        },
        {
          title: 'Split backend/frontend architecture',
          body: 'Decoupled backend state from the React UI client. This allowed me to test multiplayer state machines in isolation, guaranteeing game lobby integrity and reconnection persistence.'
        }
      ],
      outcome:
        'Successfully launched to a group of university students. The tension loop was so engaging that session lengths averaged 15+ minutes with zero churn within active lobbies. Players actively debated in real-time, proving the social suspense thesis.',
      lessonsLearned: [
        'Real-time state synchronization is complex; edge-case disconnections must be handled gracefully through server-cached player tickets.',
        'Simplifying mechanics while doubling down on emotional/psychological feedback creates far stronger engagement than complex rules.',
        'Decoupled backend testing saved hundreds of hours during multi-player simulation debugging.'
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
      problem:
        'Most productivity trackers enforce rigid streaks. When a user misses one day, they experience the \'what-the-hell effect\' and abandon the app. I wanted to build a habit system that mirrors real human behavior: flexible, structured, and execution-focused rather than streak-obsessed.',
      role: 'Solo designer and developer',
      duration: '4 weeks',
      thinking: [
        'I researched atomic habit frameworks and behavioral UX pattern designs. Traditional checkmarks build stress instead of motivation.',
        'The gap: a tracker shouldn\'t punish you for taking a break; it should help you recover. I designed a system that prioritizes long-term consistency trends over uninterrupted streaks.',
        'Visualizing progress: Built custom visual representation metrics that highlight monthly consistency ratios rather than consecutive day counts, changing the user\'s focus from perfection to progress.'
      ],
      decisions: [
        {
          title: 'Trend-based metrics over rigid streak counters',
          body: 'Replaced standard consecutive-day streaks with a rolling consistency index. Missing a day shifts your index slightly rather than resetting it to absolute zero, successfully reducing user failure fatigue.'
        },
        {
          title: 'Intentions-to-execution mapping workflow',
          body: 'Implemented a daily planning block where users can adjust habit goals dynamically. This accommodates the natural variability of real life while maintaining commitment.'
        },
        {
          title: 'Clean, low-friction micro-interactions',
          body: 'Reduced logging friction down to a single click, using smooth spring animations to make tracking feel rewarding rather than tedious.'
        }
      ],
      outcome:
        'Tested personally and across beta testers for 6+ weeks. The consistency-based metric dramatically improved user retention at week 4 compared to traditional trackers, keeping people motivated even after they missed a logging day.',
      lessonsLearned: [
        'Behavioral psychology is the most powerful feature. If an app makes a user feel bad, they will uninstall it.',
        'Data visualization should motivate, not just record. Showing the rhythm of progress is far more inspiring than simple streaks.',
        'Design restraint is highly valuable; keeping tracking simple and removing noise was key to consistency.'
      ]
    }
  }
]

