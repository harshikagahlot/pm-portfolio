// ── Types ────────────────────────────────────────────────────

export interface Annotation {
  id: number
  /** Short marker shown on callout circle: "01", "02", etc. */
  marker: string
  title: string
  /** 2–3 sentences describing my actual observation */
  observation: string
  /** Why it matters to the user experience */
  whyItMatters: string
  /** How I would test this hypothesis practically */
  howIdTestThis: string
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
    id: 'blinkit',
    name: 'Blinkit',
    category: 'Quick commerce · Speed UX',
    logoColor: '#F7C948',
    teaser:
      "Blinkit's entire product is a promise: delivery under 10 minutes. Here is how their interface builds and reinforces that certainty.",
    observationCount: 2,
    fullTeardown: {
      hook: "Blinkit isn't just about grocery logistics. It's a real-time reassurance system. The entire UX is built around managing user anxiety during a short, intense window of anticipation.",
      context:
        "When users order groceries in under 10 minutes, they expect instant gratification. Any lack of visual feedback leads to doubt. I deconstructed their checkout and order-tracking loops to find the design choices that build certainty.",
      annotations: [
        {
          id: 1,
          marker: '01',
          title: 'The live tracker map',
          observation:
            'The delivery tracker doesn\'t just show a generic loading bar; it renders a live map with a moving driver icon. You see the physical route of the driver instantly upon checkout completion.',
          whyItMatters:
            'Abstract promises like "10 minutes" create stress. Visual proof — seeing a real human moving toward your address — transfers trust from the brand to the visual reality. Doubt dissolves.',
          howIdTestThis:
            'I would run a split test: group A sees the live map, group B sees a standard progress bar ("Arriving in 8 mins"). I would measure post-checkout support queries and the rate of users actively reloading the app to verify if the map reduces session anxiety.'
        },
        {
          id: 2,
          marker: '02',
          title: 'In-line out-of-stock substitutions',
          observation:
            'When an item you selected becomes unavailable during pick-up, Blinkit suggests a direct substitute directly inside your order card instead of throwing a generic error or prompting after payment.',
          whyItMatters:
            'Unexpected friction at the delivery stage causes users to cancel orders. Intercepting a negative error with an immediate, in-place resolution keeps the checkout momentum unbroken.',
          howIdTestThis:
            'I would A/B test this by comparing checkout completion rates for out-of-stock orders between this inline swap UI and a standard modal pop-up to measure drop-off friction.'
        }
      ],
      bigIdea:
        "Blinkit's real product is certainty. In a category full of anxiety (will it arrive? is it fresh? where's my order?), every design decision is in service of making the user feel completely certain. Certainty is the feature.",
      whatIWouldChange:
        "I'd improve their checkout cart cross-selling row. Currently, it triggers generic additions (like chocolate bars or batteries) at the final step. I would test replacing this with contextual accessories (like milk if you ordered coffee) to raise average order values without clutter."
    }
  }
]

