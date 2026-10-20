// Portfolio case studies. Each project gets a card on /portfolio and its own
// page at /portfolio/<slug>. Order here is the order on the site and the
// order of the Previous / Next links.
//
// Images and videos: put them in public/images/projects/<slug>/ and set src
// to e.g. '/images/projects/chem/cover.jpg'. Leave src empty ('') and the
// page shows a labelled placeholder, so you can see where each one goes.
// Text in [brackets] is a prompt for you to replace.

import type { Link } from './site'

export type Media =
  /** A screenshot, design or photo. Click to view full size. */
  | { kind: 'image'; src: string; alt: string; caption?: string }
  /** A short screen recording (.mp4). Better than a GIF: smaller and sharper. */
  | { kind: 'video'; src: string; alt: string; caption?: string; poster?: string }
  /** A Figma prototype or file. Use the link from Figma's Share → Copy link. */
  | { kind: 'figma'; url: string; alt: string; caption?: string }

export type CaseSection = {
  heading: string
  /** One string per paragraph. */
  body: string[]
  media?: Media[]
}

export type Project = {
  /** The page address: /portfolio/<slug>. Lowercase words joined by dashes. */
  slug: string
  title: string
  /** What you did and why it mattered, in one line. Shown on the card and page. */
  oneLiner: string
  year: string
  role: string
  tags: string[]
  /** 16:10 works best. Shown on the card and at the top of the page. */
  cover: { src: string; alt: string }
  glance: {
    team?: string
    timeline?: string
    tools?: string[]
  }
  links?: Link[]
  /** Two or three headline numbers, shown big. Keep each label short. */
  impact?: { value: string; label: string }[]
  sections: CaseSection[]
  /** One or two honest sentences: what you learned, what you'd do next. */
  learned?: string
}

export const portfolioIntro =
  'A few things I helped build, from enterprise developer tools to my own startups.'

export const projects: Project[] = [
  {
    slug: 'retool-record-and-replay',
    title: 'Record & Replay Testing',
    oneLiner:
      "Took Retool's record-and-replay testing platform from zero to one, through to early adoption across ~15 enterprise accounts.",
    year: '[2024]',
    role: 'Senior Product Engineer / Acting PM',
    tags: ['Retool', '0 → 1', 'Developer tools'],
    cover: { src: '', alt: 'Cover: the record-and-replay testing interface' },
    glance: {
      team: '10-person cross-functional team ([e.g. 1 designer, 6 engineers, QA, GTM])',
      timeline: '[e.g. 9 months, 2024–2025]',
      tools: ['[React]', '[TypeScript]', '[Node.js]', 'Figma'],
    },
    links: [{ label: 'Retool', href: 'https://retool.com' }],
    impact: [
      { value: '0 → 1', label: 'MVP to early adoption' },
      { value: '~15', label: 'enterprise accounts' },
      { value: '$10M+', label: 'in ARR across those accounts' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          "[Who struggled and with what. For example: teams building critical internal tools on Retool had no easy way to check that a change didn't break their apps, so they tested by hand or not at all.]",
          '[How you knew: support tickets, customer calls, churn reasons or usage data. One concrete example or number helps.]',
        ],
      },
      {
        heading: 'My role',
        body: [
          'I defined and prioritized the MVP roadmap, designed the prototype and the user experience, set the technical architecture, and led development across a 10-person cross-functional team.',
          '[What you owned yourself versus what the team did. Recruiters look for this.]',
        ],
      },
      {
        heading: 'Approach and key decisions',
        body: [
          '[Decision 1: the options you weighed, what you chose and why. For example: recording real user sessions versus asking builders to write tests.]',
          '[Decision 2: a trade-off you made to ship the MVP sooner.]',
        ],
        media: [
          {
            kind: 'image',
            src: '',
            alt: 'Early prototype or sketch',
            caption: '[Early prototype: what it shows and what you learned from testing it.]',
          },
        ],
      },
      {
        heading: 'The solution',
        body: [
          '[A short walkthrough: how someone records a flow, replays it and sees what broke.]',
        ],
        media: [
          {
            kind: 'video',
            src: '',
            alt: 'Screen recording of recording and replaying a test',
            caption: '[A 20–40 second recording of the core flow.]',
          },
          {
            kind: 'image',
            src: '',
            alt: 'Final design of the test results view',
            caption: '[Final design: what to notice.]',
          },
        ],
      },
      {
        heading: 'Results',
        body: [
          'We drove early adoption across ~15 enterprise accounts representing $10M+ in ARR.',
          '[Anything else: usage, a customer quote, what it led to next.]',
        ],
      },
    ],
    learned: '[One or two sentences on what you learned taking something from zero to one.]',
  },
  {
    slug: 'chem',
    title: 'Chem',
    oneLiner:
      'Co-founded an AI matchmaking app that plans small in-person group events, and built the AI-agent prototype as CTO.',
    year: '2025–2026',
    role: 'CTO Co-founder',
    tags: ['Startup', 'AI agents', 'Consumer'],
    cover: { src: '', alt: 'Cover: the Chem app' },
    glance: {
      team: '[e.g. 2 co-founders, with relationship-science PhD advisors]',
      timeline: 'Oct 2025 – Mar 2026',
      tools: ['[e.g. Claude]', '[React Native]', '[Python]'],
    },
    impact: [
      { value: '50+', label: 'customer interviews' },
      { value: '50+', label: 'LGBTQ+ users in the prototype' },
      { value: '6', label: 'people per personalized group event' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Through 50+ customer interviews, we found demand for meeting people in person rather than swiping through app-based matches.',
          '[What people told you about dating apps, and one quote that stuck with you.]',
        ],
      },
      {
        heading: 'My role',
        body: [
          'As CTO co-founder I led product and engineering: [what you built, decided and owned].',
          'We partnered with relationship-science PhDs to shape the matching criteria.',
        ],
      },
      {
        heading: 'Approach and key decisions',
        body: [
          "We started with human matchmaking, which worked but couldn't scale. That led us to pivot to an AI-agent approach.",
          '[How the agent works at a high level, and how user feedback shapes each new group.]',
        ],
        media: [
          {
            kind: 'image',
            src: '',
            alt: 'Diagram of how the AI agent plans a group event',
            caption: "[A simple diagram of the agent's flow, from sign-up to event.]",
          },
        ],
      },
      {
        heading: 'The solution',
        body: [
          'The prototype uses an AI agent that takes in user feedback to put together personalized 6-person group events.',
        ],
        media: [
          {
            kind: 'image',
            src: '',
            alt: 'App screens: sign-up, matching and event invite',
            caption: '[Key app screens.]',
          },
        ],
      },
      {
        heading: 'Results',
        body: [
          'We ran the prototype with 50+ LGBTQ+ users. [What you saw: attendance, repeat events, feedback.]',
        ],
      },
    ],
    learned: "[What you learned from the pivot, or what you'd do differently.]",
  },
  {
    slug: 'passionfruit',
    title: 'Passionfruit',
    oneLiner:
      'Co-founded a platform for musicians to share work in progress, launched in 2 months and grew to 200+ weekly users.',
    year: '2020–2021',
    role: 'Co-founder',
    tags: ['Startup', 'Music', 'Community'],
    cover: { src: '', alt: 'Cover: the Passionfruit app' },
    glance: {
      team: 'Team of 3 engineers',
      timeline: 'Jul 2020 – Mar 2021',
      tools: ['[React]', '[Firebase]', 'Figma'],
    },
    impact: [
      { value: '100+', label: 'musician interviews' },
      { value: '2 mo', label: 'from start to launch' },
      { value: '200+', label: 'weekly active users' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'In 100+ interviews, musicians told us they wanted to share unfinished work with peers, not just polished releases.',
          "[Why existing platforms didn't work for that.]",
        ],
      },
      {
        heading: 'My role',
        body: ['I co-led a team of 3 engineers and [what you designed, built and decided].'],
      },
      {
        heading: 'Approach and key decisions',
        body: ['[One or two decisions, like what you left out to launch in 2 months.]'],
      },
      {
        heading: 'The solution',
        body: [
          'A platform for musicians to track their progress and share works in progress with each other.',
        ],
        media: [
          {
            kind: 'image',
            src: '',
            alt: 'Passionfruit feed of works in progress',
            caption: '[The main feed: what to notice.]',
          },
        ],
      },
      {
        heading: 'Results',
        body: [
          'We launched in 2 months and grew to 200+ weekly active users, which earned us an interview with Y Combinator.',
        ],
      },
    ],
    learned: '[What you took away from your first startup.]',
  },
  {
    slug: 'exie',
    title: 'Exie',
    oneLiner:
      '[What Exie is and why it matters, in one line. For example: a WhatsApp assistant that …]',
    year: '[2026]',
    role: '[Your role]',
    tags: ['WhatsApp', '[AI]', '[Side project]'],
    cover: { src: '', alt: 'Cover: Exie in a WhatsApp chat' },
    glance: {
      team: '[Solo, or who you worked with]',
      timeline: '[e.g. 3 weeks]',
      tools: ['WhatsApp', '[e.g. Claude]', '[e.g. Node.js]'],
    },
    links: [{ label: '[Try it]', href: '#' }],
    impact: [
      { value: '[#]', label: '[users or messages]' },
      { value: '[#]', label: '[a second result]' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: ["[Who it's for and what it solves.]"],
      },
      {
        heading: 'My role',
        body: ['[What you did.]'],
      },
      {
        heading: 'Approach and key decisions',
        body: ['[Why WhatsApp, and one or two other decisions.]'],
      },
      {
        heading: 'The solution',
        body: ["[How it works, from the user's side.]"],
        media: [
          {
            kind: 'video',
            src: '',
            alt: 'Screen recording of a conversation with Exie',
            caption: '[A short recording of a real conversation.]',
          },
        ],
      },
      {
        heading: 'Results',
        body: ['[What happened.]'],
      },
    ],
    learned: '[What you learned.]',
  },
]

export function findProject(slug: string | undefined) {
  return projects.findIndex((project) => project.slug === slug)
}
