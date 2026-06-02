// ── Types ────────────────────────────────────────────────────

export interface Annotation {
  id: number
  /** Short marker shown on callout circle: "01", "02", etc. */
  marker: string
  title: string
  /** 2–3 sentences describing my actual observation */
  observation: string
  /** Why it matters to the user experience */
  whyItMatters?: string
  /** How I would test this hypothesis practically */
  howIdTestThis?: string
  /** Optional image for the observation */
  image?: string
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
  /** Short category descriptor: e.g. "Quick commerce · Speed UX" */
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
    id: 'duolingo',
    name: 'Duolingo',
    category: 'EdTech · Behavioral Design · Gamification',
    logoColor: '#58cc02',
    teaser:
      "Duolingo doesn't feel like a learning app at all. It feels like a game. Here's how every design decision secretly teaches you consistency instead of just language.",
    observationCount: 7,
    fullTeardown: {
      hook: "When I downloaded Duolingo, I thought it would be just another learning app. But after spending time with it, I realized something: Duolingo is not just teaching people a skill. It is teaching them consistency.",
      context:
        "Everything from the cute bird character, the map-like progression, XP points, gems, streaks, rewards, and animations makes it feel less like studying and more like progressing through levels in a game. Before I even started learning, Duolingo asked me a series of questions — my goal, why I wanted to learn, what level I considered myself, and how much time I wanted to spend each day. This wasn't onboarding. It was personalisation that made me feel like the app was being built for me specifically.",
      annotations: [
        {
          id: 1,
          marker: '01',
          title: 'The Streak Mechanic — Teaching Habit Before Skill',
          observation:
            'Duolingo doesn\'t just track your streak as a number. It makes the streak feel like a living, fragile thing. The owl nudges you. Notifications remind you that "your streak is in danger." Streak shields let you protect it on off-days. Every design decision around the streak is in service of one thing: making you come back tomorrow.',
          whyItMatters:
            'Most learning apps assume users are intrinsically motivated. Duolingo doesn\'t. It designs extrinsic motivation so well that it becomes intrinsic. The streak mechanic makes consistency feel more important than individual session quality — and that\'s actually correct for long-term learning.',
          howIdTestThis:
            'I would A/B test: Group A sees streak count displayed prominently at the top of every session. Group B sees it only on the home screen. Measuring 30-day retention and daily active open rates would reveal whether the streak visibility actively drives return behaviour or just feels like a vanity metric.'
        },
        {
          id: 2,
          marker: '02',
          title: 'Hearts System — Controlled Failure as a Feature',
          observation:
            'The hearts system is brilliant and controversial at the same time. You have a limited number of mistakes you can make per session. When you run out of hearts, the session ends. You either wait for hearts to regenerate naturally, earn them back through practice exercises, or pay for unlimited hearts through Duolingo Plus.',
          whyItMatters:
            'This is classic loss aversion design. Losing a heart feels worse than gaining one feels good. It forces you to be careful, slow down, and actually read questions — which improves retention. It also creates a natural monetisation hook without making the core product feel like a paywall. Users with free accounts still feel the app works, just with more friction.',
          howIdTestThis:
            'I would run a cohort test: remove hearts entirely for a group of new users and compare their 7-day word retention scores and session completion rates against users with the standard hearts system. If retention drops, the hearts system is genuinely teaching through friction — not just manufacturing upgrade pressure.'
        },
        {
          id: 3,
          marker: '03',
          title: 'The Skill Map — Progress as Physical Movement',
          observation:
            'Duolingo\'s course structure uses a winding path on a map. You move through checkpoints, unlock new areas, and can see exactly how far you have come and how far you still need to go. This is not just a cosmetic choice. It is a spatial metaphor for learning.',
          whyItMatters:
            'Abstract progress (like a progress bar that says 34%) is far less motivating than concrete visual progress (you are physically "here" on a journey). The map makes the learning process feel like geography — and that creates a sense of exploration rather than obligation.',
          howIdTestThis:
            'Test a redesigned version that replaces the map with a traditional list-based curriculum view. Measure lesson completion rates, session frequency, and time-per-session across a 21-day window. If the map version shows higher engagement, it validates that spatial progress representation matters.'
        },
        {
          id: 4,
          marker: '04',
          title: 'Micro-Celebration Animations — Dopamine at the Right Moment',
          observation:
            'Every correct answer in Duolingo is met with a small celebration — a sound, a colour flash, a burst animation, or a character reaction. These micro-animations happen in the first 300ms after you tap the correct answer.',
          whyItMatters:
            'The timing is intentional. Dopamine is released most strongly in response to unexpected rewards. Duolingo makes every single correct answer feel like a small unexpected win. This is classical conditioning applied to language learning — you\'re not just learning French. You\'re being trained to associate studying with pleasure.',
          howIdTestThis:
            'Remove all micro-celebration animations for a cohort and replace with a plain "Correct" text confirmation. Compare session length, consecutive lesson completion rates, and self-reported enjoyment scores. If animated feedback drives meaningfully longer sessions, it proves the animations are functional — not just decorative.'
        },
        {
          id: 5,
          marker: '05',
          title: 'The Leaderboard — Social Stakes Without Social Pressure',
          observation:
            'Duolingo places you in a weekly league with other learners at similar levels. You can see their XP, and they can see yours. At the end of the week, top performers move to a higher league. Bottom performers are demoted.',
          whyItMatters:
            'This creates competitive motivation without the toxic shame of public failure. Since leagues reset weekly and most users don\'t know each other, it creates a safe competitive environment — one where you try harder but don\'t feel humiliated if you lose. It\'s the exact right amount of social pressure.',
          howIdTestThis:
            'Test a version without the leaderboard for new users. Track weekly XP earned and days-active-per-week over a month. If the leaderboard group shows significantly higher XP production, it proves competition is driving practice quantity — separate from whether users consciously notice it.'
        },
        {
          id: 6,
          marker: '06',
          title: 'The Mascot as Emotional Anchor',
          observation:
            'Duo the owl is not just a cute logo. He appears in push notifications when you miss a day, celebrates you after long streaks, and occasionally uses darkly humorous messages ("You ignored me. I\'m fine."). The mascot has a personality that evolves based on your behaviour.',
          whyItMatters:
            'Duo creates a parasocial relationship between the user and the app. Users feel mild guilt when they skip sessions — not because they let themselves down, but because they let Duo down. This is one of the most subtle and effective retention mechanisms I have ever seen in a product. It transforms an app into something closer to a social commitment.',
          howIdTestThis:
            'Run an experiment where one group receives push notifications from "Duolingo" (no mascot framing) and another receives the same notifications written in Duo\'s voice with the owl face. Compare 30-day push notification open rates and same-day lesson completion rates after notification.'
        },
        {
          id: 7,
          marker: '07',
          title: 'XP Boosts and Limited-Time Events — Scarcity as Motivation',
          observation:
            'Duolingo runs limited-time XP challenges, special events, and double XP weekends. These create urgency windows that pull even lapsed users back into the app. The event design is specifically timed around weekends and holidays — high-availability windows for their core demographic.',
          whyItMatters:
            'Scarcity is one of the strongest psychological motivators. The "double XP ends in 12 hours" countdown does not need to offer massive value — it just needs to create the feeling that not engaging means losing something. For Duolingo\'s demographic of casual learners, this is the difference between opening the app and deciding to do it tomorrow.',
          howIdTestThis:
            'Compare weekly active user rates during a standard week vs. a double XP weekend event. Also track whether XP earned during event weeks translates into higher retention in the following two weeks (post-event) or shows a return-to-baseline dropoff — which would reveal if the event creates genuine habit reinforcement or is just a temporary spike.'
        }
      ],
      bigIdea:
        "Duolingo's real product is not language learning. It is the feeling of making progress every single day. The language is almost incidental. What Duolingo has actually mastered is designing consistency at scale — making millions of people feel like they are moving forward, even when they are only spending 5 minutes a day. The insight that hit me hardest: Duolingo doesn't trust users to stay motivated on their own. It doesn't moralize or lecture. It just builds a system where coming back tomorrow feels better than stopping. That is a genuinely remarkable product achievement.",
      whatIWouldChange:
        "The hearts system, despite being clever, creates real frustration when a user is learning a genuinely difficult concept and keeps making the same error. Running out of hearts mid-lesson breaks momentum at exactly the wrong moment. I would test a 'Learning Mode' — where hearts are paused when the system detects you are making the same error 3+ times on the same question type. This would separate intentional friction (slowing down careless clicking) from punitive friction (blocking users who are genuinely trying to understand something new). The distinction matters enormously for retention among serious language learners."
    }
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    category: 'Quick commerce · Convenience',
    logoColor: '#F7C948',
    teaser:
      "A product teardown exploring how Blinkit uses speed, convenience, psychology, packaging, and customer experience to become much more than a grocery delivery app.",
    observationCount: 10,
    fullTeardown: {
      hook: "When I started observing Blinkit, I thought it was simply a grocery delivery app. But after using it regularly as a hostel student, I realized something interesting: Blinkit is not really selling groceries. It is selling convenience.",
      context:
        "Almost every feature inside the product seems designed around one question: \"How can we save the user a little more time and effort?\"",
      annotations: [
        {
          id: 1,
          marker: '01',
          title: 'The 10-Minute Promise',
          observation: 'The first thing Blinkit highlights is delivery time.\n\nBefore products, before categories, before offers.\n\nUsers immediately understand what the product stands for:\nSpeed.\n\nEven the name "Blinkit" reinforces this idea.\nThe product identity is built around convenience and urgency.',
        },
        {
          id: 2,
          marker: '02',
          title: 'Convenience Is Everywhere',
          observation: 'Features like "Order Again" seem simple at first.\n\nBut most grocery purchases are repetitive.\nUsers buy the same products again and again.\n\nInstead of making users search repeatedly, Blinkit remembers previous purchases.\n\nThis reduces effort and makes repeat ordering extremely easy.',
          image: 'blinkit-order-again',
        },
        {
          id: 3,
          marker: '03',
          title: 'Live Delivery Tracking Reduces Anxiety',
          observation: 'One of the most useful features is real-time tracking.\n\nUsers can see exactly where their delivery partner is.\n\nEven after closing the app, Blinkit continues showing updates through notifications.\n\nUsers don\'t need to keep reopening the app.\nThis creates transparency and reduces uncertainty while waiting.',
        },
        {
          id: 4,
          marker: '04',
          title: 'The ₹199 Threshold Strategy',
          observation: 'One of the smartest business strategies I noticed was the delivery charge threshold.\n\nWhen the order value is low, delivery charges appear relatively expensive.\n\nAs users get closer to the threshold, they are encouraged to add extra products.\n\nThe interesting part is that users feel like they are saving money while Blinkit increases average order value.\n\nThis benefits both the user and the business.',
          image: 'blinkit-checkout-threshold',
        },
        {
          id: 5,
          marker: '05',
          title: 'Marketing That Feels Like Entertainment',
          observation: 'Blinkit regularly launches creative campaigns.\n\nOne example was the ice cream discount campaign where users could shout into their phones to unlock larger discounts.\n\nThe campaign was fun, shareable, and highly memorable.\nPeople made reels and shared their experiences online.\n\nThe marketing became entertainment.',
        },
        {
          id: 6,
          marker: '06',
          title: 'Product Discovery Through Free Samples',
          observation: 'During larger orders, Blinkit sometimes includes free samples from smaller brands.\n\nExamples:\n* shampoo samples\n* laundry liquid\n* sanitary pad samples\n\nUsers receive free surprises.\nBrands gain exposure.\nBlinkit strengthens partner relationships.\n\nA simple feature creates value for all sides.',
        },
        {
          id: 7,
          marker: '07',
          title: 'Printouts Reveal A Bigger Vision',
          observation: 'Initially, Blinkit appeared to be focused on groceries.\n\nThen I noticed the printout service.\nAs a student, I immediately understood its usefulness.\n\nThis made me realize Blinkit is slowly evolving into a convenience platform rather than just a grocery platform.\n\nThe company is expanding into urgent everyday needs.',
          image: 'blinkit-print-store',
        },
        {
          id: 8,
          marker: '08',
          title: 'Small Details Matter',
          observation: 'Blinkit allows delivery instructions such as:\n* Don\'t call\n* Don\'t ring the bell\n\nThese seem like small features.\nBut they become extremely valuable in real-life situations:\n* hostel environments\n* late-night orders\n* sleeping family members\n* meetings and classes\n\nThis reflects strong attention to user experience.',
          image: 'blinkit-checkout-instructions',
        },
        {
          id: 9,
          marker: '09',
          title: 'Packaging As Part Of The Product',
          observation: 'This was the most unexpected observation.\n\nMost delivery packaging gets thrown away immediately.\nBlinkit\'s packaging often includes:\n* games\n* artwork\n* coloring activities\n* seasonal themes\n* creative designs\n\nI\'ve seen students reuse these bags rather than throw them away.\n\nThe product experience continues even after delivery is completed.\nThis is one of the most unique branding decisions I observed.',
        },
        {
          id: 10,
          marker: '10',
          title: 'Customer Service Builds Trust',
          observation: 'I have personally experienced situations where products were not satisfactory.\n\nIn those cases:\n* replacements were provided\nor\n* refunds were processed smoothly\n\nFast delivery attracts users.\nTrust keeps them coming back.',
        }
      ],
      bigIdea:
        "Before studying Blinkit, I thought it was a grocery delivery app. After observing it closely, I think it is something more interesting. Blinkit is a convenience machine. Groceries are what users buy. Convenience is what Blinkit actually sells.\n\nKey Lessons:\n1. Convenience is not one feature. It is dozens of small decisions working together.\n2. Great products reduce effort repeatedly. Order Again, tracking, delivery instructions, and printouts all reduce friction.\n3. Branding can continue after delivery. The packaging experience proved that product experience does not need to end when the order arrives.",
      whatIWouldChange:
        "Blinkit already knows a lot about user behavior: repeat purchases, favorite categories, and buying patterns. I would explore more intelligent personalization that helps users complete purchases faster rather than simply promoting more products."
    }
  }
]
