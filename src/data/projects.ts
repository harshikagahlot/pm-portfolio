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
}

// ── Project data ─────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'susword',
    number: '01',
    name: 'SusWord',
    tagline: 'A word game where sustainability is the score.',
    tags: ['Game Design', 'React', 'Multiplayer', 'UX'],
    accent: '#f47c5a', // accent.coral
    caseStudy: {
      problem:
        'Word games are everywhere. But none of them made you think about the world outside the game. I wanted to build something that made sustainability feel like play, not lecture.',
      role: 'Solo designer and developer',
      duration: '6 weeks',
      thinking: [
        'I started by playing every major word game I could find — Wordle, Scrabble Go, NYT Spelling Bee. I wasn\'t looking for inspiration. I was looking for the gap.',
        'The gap I found: all of these games are closed systems. You win, you lose, you come back tomorrow. None of them connected the game to something larger.',
        'The insight: what if your vocabulary was your impact score? Words related to sustainability, ecology, and climate scored higher — not because the game told you to care, but because the mechanics rewarded you for knowing those words.',
      ],
      decisions: [
        {
          title: 'Scoring above streaks',
          body: 'Most word games hook you with streaks. I chose scoring depth instead — longer, rarer sustainability-related words earned exponential points. This rewarded knowledge over habit.',
        },
        {
          title: 'No ads, no premium tier',
          body: 'Monetization that interrupts a word game destroys the flow state. SusWord launched free and stayed free. The goal was learning, not revenue.',
        },
        {
          title: 'Multiplayer as the core loop',
          body: 'Competing against a friend on the same board changed everything. Suddenly it wasn\'t you vs. the game. It was you vs. someone else\'s vocabulary. That tension made people come back.',
        },
      ],
      outcome:
        'Launched to a small beta group. Average session length: 12 minutes — 3x what I expected. Most common feedback: \'I looked up half these words after losing.\'',
      lessonsLearned: [
        'The feature I was most proud of (animated word connections) was the one users noticed least. Ship the mechanic first.',
        'Multiplayer added 3 weeks to the build. It was worth every hour.',
        'Naming matters more than I thought. \'SusWord\' tested better than every other name I considered.',
      ],
    },
  },
  {
    id: 'habitmetric',
    number: '02',
    name: 'HabitMetric',
    tagline: 'Habit tracking that respects how humans actually work.',
    tags: ['Product Design', 'Data Viz', 'React', 'Behavioral UX'],
    accent: '#7c6ff7', // accent.purple
    caseStudy: {
      problem:
        'Habit trackers assume consistency. Humans are not consistent. Every app I tried made me feel like a failure by day 4. I wanted to build one that was honest about how humans actually work.',
      role: 'Solo designer and developer',
      duration: '4 weeks',
      thinking: [
        'I read BJ Fogg\'s Tiny Habits and James Clear\'s Atomic Habits back to back. They agreed on the science. But neither of them had built an app.',
        'The existing apps — Streaks, Habitica, Done — all optimized for the ideal user: someone who never misses a day. They punished the real user: someone who misses Wednesdays.',
        'My thesis: what if the app expected you to miss days? What if missing a day wasn\'t a broken streak — it was just data?',
      ],
      decisions: [
        {
          title: 'Streaks replaced with rhythm scores',
          body: 'Instead of a streak counter (which resets to zero on a miss), I built a \'rhythm score\' — a rolling 14-day average. Missing one day barely moves the needle. That single change made the app feel forgiving.',
        },
        {
          title: 'Data visualization as the reward',
          body: 'Most trackers show you a calendar with checkmarks. I showed a heatmap of your actual rhythm over 90 days. Seeing your patterns — not just your wins — was more motivating than any streak.',
        },
        {
          title: 'No notifications by default',
          body: 'Every habit app I researched used aggressive push notifications. I turned them off by default and made them opt-in after 2 weeks of use. Retention stayed the same. Stress complaints dropped.',
        },
      ],
      outcome:
        'Used personally for 6 months and shared with 12 beta testers. 9 of 12 were still using it at week 8 — compared to an industry average closer to week 2.',
      lessonsLearned: [
        'The forgiving mechanic was the entire product. Everything else was decoration.',
        'Data visualization is a product decision, not a design decision. What you show shapes how people feel about themselves.',
        'I almost added gamification (points, badges). I\'m glad I didn\'t. The restraint was the right call.',
      ],
    },
  },
]
