// ── Types ────────────────────────────────────────────────────

export interface Annotation {
  id: number
  /** Short marker shown on callout circle: "01", "02", etc. */
  marker: string
  title: string
  /** 2–3 sentences of analysis */
  observation: string
  /** 1 sentence: the UX/product principle this illustrates */
  principle: string
}

export interface TeardownContent {
  /** Opening 1–2 sentences that frame the teardown */
  hook: string
  /** Brief background on the product */
  context: string
  /** The annotated observations */
  annotations: Annotation[]
  /** The single most important insight from this teardown */
  bigIdea: string
  /** One honest critique */
  whatIWouldChange: string
}

export interface TeardownData {
  id: string
  name: string
  /** Short category descriptor: e.g. "Music streaming · Engagement design" */
  category: string
  /** Background color for the logo square placeholder */
  logoColor: string
  /** Short preview text shown on the index card */
  teaser: string
  observationCount: number
  fullTeardown: TeardownContent
}

// ── Teardown data ─────────────────────────────────────────────

export const TEARDOWNS: TeardownData[] = [
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'Music streaming · Engagement design',
    logoColor: '#1DB954',
    teaser:
      "Spotify's interface looks simple. But underneath is one of the most psychologically sophisticated engagement systems in consumer software.",
    observationCount: 4,
    fullTeardown: {
      hook: "Spotify doesn't just play music. It makes you feel like it understands you — and that feeling is entirely engineered.",
      context:
        "Spotify has 600M+ users and a churn problem. The product's entire interaction design is built around one goal: making leaving feel like losing something deeply personal.",
      annotations: [
        {
          id: 1,
          marker: '01',
          title: 'Wrapped as identity, not data',
          observation:
            "Spotify Wrapped isn't a data summary. It's a mirror. By showing you who you are through your listening habits, Spotify turns your data into your identity — and your identity into a reason to stay. The shareable format means millions of users become Spotify's marketing team for free.",
          principle:
            'When a product reflects identity back to the user, leaving feels like losing part of yourself.',
        },
        {
          id: 2,
          marker: '02',
          title: "The 'Enhance' button placement",
          observation:
            "The 'Enhance' button that adds AI-recommended songs to your playlist sits below the playlist, not inside it. This reduces accidental activation significantly. But it also sacrifices discoverability — most users I've talked to have never noticed it exists. That's a deliberate tradeoff: Spotify would rather you not use Enhance than accidentally ruin a playlist you love.",
          principle:
            "Feature placement is a trust decision. Hiding a powerful feature protects the user's existing investment.",
        },
        {
          id: 3,
          marker: '03',
          title: "Discover Weekly's reset psychology",
          observation:
            "Discover Weekly refreshes every Monday. This isn't algorithmic necessity — it's behavioral design. The weekly reset creates a ritual: Monday becomes the day you check Spotify. It transforms passive listening into an anticipated event, driving weekly active users without a single notification.",
          principle:
            'Scheduled scarcity creates ritual. Ritual creates habit. Habit creates retention.',
        },
        {
          id: 4,
          marker: '04',
          title: 'The crossfade default',
          observation:
            "Crossfade between tracks is off by default but deeply loved by users who discover it. This is intentional: Spotify uses crossfade as a 'power user reward.' Finding it feels like finding a secret. That discovery moment creates a small emotional high — and emotional highs create positive associations with the product.",
          principle:
            'Hidden delight features create discovery moments that bond users to a product more than any onboarding flow.',
        },
      ],
      bigIdea:
        "Spotify's genius isn't the algorithm. It's that they made the algorithm feel personal. Every feature is designed to make the product feel like it knows you better than you know yourself.",
      whatIWouldChange:
        'The podcast and music experiences are crammed into one interface that serves neither well. I\'d separate them — two modes, one app. The current compromise creates friction for both use cases.',
    },
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    category: 'Quick commerce · Speed UX',
    logoColor: '#F7C948',
    teaser:
      "Blinkit's entire product is a promise: 10 minutes. Every design decision either protects or reinforces that promise.",
    observationCount: 4,
    fullTeardown: {
      hook: "Blinkit isn't a grocery app. It's an anxiety-reduction machine. The entire UX is designed around one emotion: the relief of knowing something is already on its way.",
      context:
        "Quick commerce lives and dies on trust. Blinkit's product challenge isn't inventory or logistics — it's convincing users that the promise of 10 minutes is real, every single time.",
      annotations: [
        {
          id: 1,
          marker: '01',
          title: 'The live timer as trust anchor',
          observation:
            "The delivery timer doesn't just count down — it updates in real time with driver location. This isn't just a feature; it's anxiety management. The moment you see a real person moving toward you on a map, the abstract promise of '10 minutes' becomes concrete. Doubt dissolves.",
          principle:
            'Real-time visibility converts a promise into proof. Proof eliminates the need for trust.',
        },
        {
          id: 2,
          marker: '02',
          title: 'Category tiles over search',
          observation:
            "Blinkit's home screen leads with large category tiles, not a search bar. This seems counterintuitive for a utility app — but it's right. Most Blinkit orders are impulse additions, not planned purchases. The category grid triggers browsing behavior, increasing basket size without feeling pushy.",
          principle:
            'For impulse-driven products, browsing surfaces are more valuable than search surfaces.',
        },
        {
          id: 3,
          marker: '03',
          title: 'The reorder shortcut',
          observation:
            "The 'Order again' row appears immediately after opening the app if you've ordered before. It requires zero decision-making — it just shows your last order, ready to repeat. For a product competing on speed, removing cognitive load from the order flow is as important as removing minutes from the delivery time.",
          principle:
            'Reducing decision time is part of the speed promise. The fastest checkout is the one that requires no thinking.',
        },
        {
          id: 4,
          marker: '04',
          title: 'Out-of-stock handling',
          observation:
            'When an item is out of stock, Blinkit immediately suggests a substitute in the same card — not on a separate screen, not after checkout. This is smart: the frustration of unavailability is immediately followed by a resolution. The negative emotion is intercepted before it can build.',
          principle:
            'Handle friction at the exact moment it occurs. Deferred solutions feel like apologies. Immediate solutions feel like service.',
        },
      ],
      bigIdea:
        "Blinkit's real product is certainty. In a category full of anxiety (will it arrive? is it fresh? where's my order?), every design decision is in service of making the user feel completely certain. Certainty is the feature.",
      whatIWouldChange:
        'The app does almost nothing to build a relationship with the user between orders. No recipes, no usage insights, no moment of delight. It\'s purely transactional — which works, but leaves loyalty entirely dependent on speed. One bad delivery and there\'s nothing holding the user.',
    },
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity · Flexibility design',
    logoColor: '#ffffff',
    teaser:
      'Notion gives users infinite flexibility. That\'s both its superpower and the source of its biggest UX problem.',
    observationCount: 4,
    fullTeardown: {
      hook: 'Notion is a product that trusts its users almost too much. The result is software that can do everything — and occasionally feels like it does nothing well.',
      context:
        "Notion's challenge is unique: they built a horizontal tool in a world of vertical ones. Every design decision has to work for the student, the startup, the solo creator, and the enterprise team simultaneously.",
      annotations: [
        {
          id: 1,
          marker: '01',
          title: 'The blank page problem',
          observation:
            "Every new Notion page starts blank. This is philosophically consistent with Notion's identity as an open canvas — but it's terrible UX for new users. The blank page is the single biggest drop-off point in Notion's onboarding. The template gallery exists, but it's one click away from the anxiety. That one click is a wall.",
          principle:
            'Freedom without scaffolding is paralysis. The most flexible tools need the most opinionated starting points.',
        },
        {
          id: 2,
          marker: '02',
          title: 'The slash command as the universal language',
          observation:
            "The '/' command to insert any block type is Notion's most important UX decision. It's a single interaction pattern that scales from beginner (type / and browse) to power user (type /cal and insert a calendar instantly). One affordance, infinite depth. This is what good universal design looks like.",
          principle:
            'The best interaction patterns have a low floor and a high ceiling. Easy to start, deep to master.',
        },
        {
          id: 3,
          marker: '03',
          title: 'Databases hidden behind complexity',
          observation:
            "Notion's database feature is one of the most powerful tools in any productivity software. But it's called 'Database' — a word that makes most non-technical users feel like it's not for them. Airtable calls the same concept a 'Base.' That naming decision alone changes who feels invited to use the feature.",
          principle:
            'Naming is UX. What you call a feature determines who believes it\'s for them.',
        },
        {
          id: 4,
          marker: '04',
          title: 'The sidebar as a second product',
          observation:
            "Notion's sidebar can become an entire information architecture project in itself. Power users spend hours organizing their sidebar — which means Notion has accidentally created a meta-product: organizing your Notion workspace. This is both a strength (deep engagement) and a risk (the tool becomes about itself, not the work).",
          principle:
            'When users spend time organizing a tool instead of using it, the tool has become the product. That\'s engagement — but not always productivity.',
        },
      ],
      bigIdea:
        "Notion's core tension is that it sold 'infinite flexibility' as a feature, but flexibility is only valuable when users know what they want to build. The product's next chapter is about opinionated defaults — templates, AI setup, guided starts — without sacrificing the openness that made it famous.",
      whatIWouldChange:
        "Onboarding. Specifically: Notion should ask 3 questions on signup (What's your main use? Who are you working with? What do you want to track?) and generate a starter workspace from the answers. Currently, new users are handed a blank room and told to decorate it themselves. Most of them leave.",
    },
  },
]
