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
  | {
      kind: 'video'
      src: string
      alt: string
      caption?: string
      poster?: string
      /** Plays silently on a loop as soon as it's on screen, like a live demo. */
      autoplay?: boolean
      /** Caps the video's width in px (it's centred); otherwise it fills the column. */
      maxWidth?: number
    }
  /** Several images side by side, like phone screenshots. Each opens full size. */
  | {
      kind: 'gallery'
      images: { src: string; alt: string }[]
      caption?: string
      /** How many across (default: up to 3). 1 stacks them in a narrower column. */
      columns?: number
    }
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
  /** What you did and why it mattered, in one line. Shown on the card and page.
      Write [words](https://…) for a link (on the page; the card shows plain text). */
  oneLiner: string
  year: string
  role: string
  tags: string[]
  /** 16:10 works best. Shown on the desk and at the top of the page. */
  /** maxWidth (in px) shows it smaller and centred at the top of the page. */
  cover: { src: string; alt: string; maxWidth?: number }
  /** Optional: shown at the top of the page instead of the cover, e.g. a demo video. */
  hero?: Media
  /**
   * Its icon on the Portfolio desk. x and y are where it starts, in percent
   * across and down the desk (visitors can drag it from there). icon is an
   * optional square thumbnail; without one it uses the cover, then a letter.
   * Set iconIsLogo for a logo on a white background: it's shown whole in the
   * middle of the cloud, with the white blended away, instead of filling it.
   */
  desk?: { x: number; y: number; icon?: string; iconIsLogo?: boolean }
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

/**
 * Photos and clips behind the Portfolio desk; each visit shows one at random.
 * position is the part kept in view (CSS background-position): the second
 * number lower shows more sky, higher shows more ground. For a clip, set
 * video to a short, silent .mp4 in public/videos; it plays on a loop like a
 * GIF, and src is a still from it shown while it loads (and to visitors who
 * turn off motion).
 */
export const deskBackgrounds: { src: string; position: string; video?: string }[] = [
  { src: '/images/backgrounds/burning-man-sunset.jpg', position: '50% 36%' },
  { src: '/images/backgrounds/montauk-sunset.jpg', position: '50% 38%' },
  { src: '/images/backgrounds/nyc-sunset.jpg', position: '50% 42%' },
  { src: '/images/backgrounds/tempelhof-sunset.jpg', position: '50% 55%' },
  {
    src: '/images/backgrounds/kauai-surfing-poster.jpg',
    video: '/images/backgrounds/kauai-surfing.mp4',
    position: '50% 50%',
  },
]

export const portfolioIntro =
  "From enterprise developer tools to my own projects and startups. I'm still adding things!"

export const projects: Project[] = [
  {
    slug: 'retool-record-and-replay',
    desk: {
      x: 24,
      y: 30,
      icon: '/images/projects/retool-record-and-replay/retool-logo.svg',
      iconIsLogo: true,
    },
    title: 'Record & Replay App Testing',
    oneLiner:
      "Took [Retool](https://retool.com)'s record-and-replay testing platform from 0 → 1, through to early adoption across ~15 enterprise accounts.",
    year: '2025',
    role: 'Senior Product Engineer',
    tags: ['Retool', '0 → 1', 'Developer tools'],
    cover: { src: '', alt: 'Cover: the record-and-replay testing interface' },
    hero: {
      kind: 'video',
      src: '/images/projects/retool-record-and-replay/demo.mp4',
      alt: 'Demo: recording a test in Retool, then replaying it',
      autoplay: true,
      maxWidth: 720,
    },
    glance: {
      team: '10-person cross-functional team (1 PM, 1 designer, 7 engineers, GTM Enablement)',
      timeline: '1 year, 2024 – 2025',
      tools: ['Typescript', 'Node.js', 'Figma', 'Linear', 'FullStory'],
    },
    impact: [
      { value: '~15', label: 'enterprise accounts' },
      { value: '$10M+', label: 'in ARR across those accounts' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Teams using Retool have no way of testing their apps natively. They would rely on a range of approaches depending on their risk tolerance such as Web-driver based frameworks (e.g. Playwright, Cypress, Selenium) or manual testing.',
          'How we knew: support tickets feature requests, customer calls with 5+ customers, churn reasons',
        ],
      },
      {
        heading: 'My role',
        body: [
          'I was the first product engineer on the team, defining and prioritizing the MVP roadmap with the PM. I designed and proposed the initial prototype and the user experience, co-developed the technical architecture, and became the team lead when the team expanded.',
        ],
      },
      {
        heading: 'Approach and key decisions',
        body: [
          'Decision 1: User records actions rather than manually building tests',
          'Decision 2: Mocking time stamps',
          'Decision 2: Simplifying tests and removing complexity',
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
    desk: { x: 62, y: 22 },
    title: 'Chem',
    oneLiner:
      'Briefly co-founded an AI-agent matchmaking app prototype that plans small in-person group events.',
    year: '2025 – 2026',
    role: 'CTO Co-founder',
    tags: ['Startup', 'AI agents', 'Consumer'],
    cover: { src: '', alt: 'Cover: the Chem app' },
    glance: {
      team: '2 co-founders, with relationship-science PhD advisors',
      timeline: 'Oct 2025 – Mar 2026',
      tools: ['Claude', 'React Native', 'Python'],
    },
    impact: [
      { value: '50+', label: 'customer interviews' },
      { value: '50+', label: 'LGBTQ+ users in the prototype' },
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
    desk: { x: 38, y: 68, icon: '/images/projects/passionfruit/logo.jpg', iconIsLogo: true },
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
    desk: { x: 76, y: 62, icon: '/images/projects/exie/badge.svg', iconIsLogo: true },
    title: 'Exie',
    oneLiner:
      "A WhatsApp bot that answers my cohort's homework questions, pulling straight from our CourseWorks classes.",
    year: '2026',
    role: 'Solo builder',
    tags: ['WhatsApp', 'AI agent', 'Side project'],
    cover: {
      src: '/images/projects/exie/cover.jpg',
      alt: 'Exie answering a classmate in the cohort WhatsApp chat',
      maxWidth: 560,
    },
    glance: {
      team: 'Just me',
      timeline: '1 week for the first version, still updating it',
      tools: [
        'JavaScript (Node.js)',
        'Baileys',
        'Gemini',
        'Vertex AI',
        'Canvas API',
        'Google Cloud',
      ],
    },
    links: [{ label: 'GitHub', href: 'https://github.com/suwilliam/courseworks-whatsapp-bot' }],
    impact: [
      { value: '~50', label: 'classmates in the group chat' },
      { value: 'Daily', label: 'someone asks Exie something' },
      { value: '1 week', label: 'to build the first version' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          "Our cohort has a WhatsApp chat just for homework, and it was mostly the same few questions on repeat. Is there reading for Tuesday? Is anything due tomorrow? Where's the stats homework? The answers were spread across all our courses on CourseWorks, and some only showed up in a lecture slide, so even people who went looking sometimes got it wrong.",
          "I wasn't any better. Every week I'd click through each of my courses trying to piece together what was due and when, and I'd still miss things.",
        ],
        media: [
          {
            kind: 'gallery',
            columns: 1,
            images: [
              {
                src: '/images/projects/exie/problem1.jpg',
                alt: 'A classmate asking if there is reading or homework for Tuesday',
              },
              {
                src: '/images/projects/exie/problem2.jpg',
                alt: 'Asking whether any homework is due tomorrow, with an unclear reply',
              },
              {
                src: '/images/projects/exie/problem3.jpg',
                alt: 'Classmates asking where the statistics homework is',
              },
            ],
            caption: 'The homework chat before Exie (names blurred).',
          },
        ],
      },
      {
        heading: 'My role',
        body: [
          "I built it on my own in about a week. I'd noticed how much of the chat was these questions and figured a bot could answer most of them.",
          "It's still a work in progress. Classmates DM me ideas and bugs, and I keep adding to it.",
        ],
      },
      {
        heading: 'Approach and key decisions',
        body: [
          "I put it in WhatsApp because that's where everyone already was. There was no point making people download something new when the homework chat already existed. You just start a message with @exie.",
          "I also wanted it to cost next to nothing, since everyone using it is a student, me included. It runs on a free Google Cloud server, and I used Baileys to connect to WhatsApp because it's light on memory. The answers come from Gemini's free tier. When the free models are busy it falls back to Vertex AI, which is paid, so I capped how much of that it can use in a day.",
          "The hardest part was WhatsApp itself. There's no official way to run a bot in a group chat, so I had to build that piece myself and be careful about how Exie sends messages, or WhatsApp would flag the number as a bot and shut it down.",
        ],
        media: [
          {
            kind: 'gallery',
            columns: 2,
            images: [
              {
                src: '/images/projects/exie/intro.jpg',
                alt: 'Introducing Exie in the cohort homework chat',
              },
            ],
            caption:
              "My message introducing Exie. I asked everyone to keep questions in the group so WhatsApp wouldn't flag her as a bot.",
          },
        ],
      },
      {
        heading: 'The solution',
        body: [
          'Say someone types "@exie what\'s the homework for this week?" Exie goes into CourseWorks, uses Gemini to work out which assignments and pages matter, and replies with everything due that week, grouped by class. We all take the same classes, so one answer covers everyone.',
          'People also ask it about readings, exam dates, the syllabus and office hours. It remembers the last few messages too, so you can follow up with something like "when is that due?"',
        ],
        media: [
          {
            kind: 'video',
            src: '/images/projects/exie/demo.mp4',
            alt: 'Screen recording of asking Exie a question in WhatsApp',
            caption: 'Asking Exie what the UI/UX homework is this week.',
            autoplay: true,
            maxWidth: 360,
          },
          {
            kind: 'gallery',
            columns: 2,
            images: [
              {
                src: '/images/projects/exie/solution1.jpg',
                alt: "Exie listing this week's homework by class",
              },
              {
                src: '/images/projects/exie/solution2.jpg',
                alt: 'Exie estimating how long a design homework will take, from the PDF instructions',
              },
              {
                src: '/images/projects/exie/solution3.jpg',
                alt: "Exie listing next week's readings by class",
              },
              {
                src: '/images/projects/exie/solution4.jpg',
                alt: "Exie finding this week's entrepreneurship readings in the syllabus",
              },
            ],
            caption: 'A few real questions from classmates (names blurred).',
          },
        ],
      },
      {
        heading: 'Results',
        body: [
          'About 50 classmates are in the chat, and someone asks Exie a question every day.',
          "Most of what I've added since came from them. A lot of homework only lives in lecture slides, so people asked if Exie could read those, images included. Now it does, and every 6 hours it re-indexes any new slides so it can find things quickly.",
        ],
      },
    ],
    learned:
      "Simple tools can make a real difference to people's week. I didn't expect to get this many thank-yous for a homework bot.",
  },
]

export function findProject(slug: string | undefined) {
  return projects.findIndex((project) => project.slug === slug)
}
