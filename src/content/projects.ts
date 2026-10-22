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
      /** Line the images up at the same height (in px) instead of in equal columns. Good for mixed shapes. */
      rowHeight?: number
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
  desk?: { x: number; y: number; icon?: string; iconIsLogo?: boolean; iconScale?: number }
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
 * turn off motion). caption is the short line in the desk's corner saying
 * where it was taken.
 */
export const deskBackgrounds: {
  src: string
  position: string
  video?: string
  caption?: string
}[] = [
  {
    src: '/images/backgrounds/burning-man-sunset.jpg',
    position: '50% 36%',
    caption: 'Sunset over Black Rock City, Burning Man',
  },
  {
    src: '/images/backgrounds/montauk-sunset.jpg',
    position: '50% 38%',
    caption: 'Pink sky over the dunes in Montauk',
  },
  {
    src: '/images/backgrounds/nyc-sunset.jpg',
    position: '50% 42%',
    caption: 'Sunset behind the Midtown skyline, New York',
  },
  {
    src: '/images/backgrounds/tempelhof-sunset.jpg',
    position: '50% 55%',
    caption: 'Golden hour at Tempelhofer Feld, Berlin',
  },
  {
    caption: 'Surfers at sunset in Kauai',
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
      x: 14,
      y: 28,
      icon: '/images/projects/retool-record-and-replay/retool-logo.svg',
      iconIsLogo: true,
    },
    title: 'Record & Replay App Testing',
    oneLiner:
      "Took [Retool](https://retool.com)'s record-and-replay testing platform from 0 → 1, through to early adoption across ~15 enterprise accounts.",
    year: '2024–2025',
    role: 'Senior Product Engineer & Acting PM',
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
          "Teams using Retool had no built-in way to test their apps, so depending on their risk tolerance they'd rely on web-driver frameworks like Playwright, Cypress and Selenium, or just test by hand.",
          'Support tickets kept asking for testing built right into Retool, because those outside tools were incredibly flaky. And when your tests keep breaking for no reason, you stop trusting them, and every release takes longer.',
          "It came up in enterprise deals too. Sales had been promising native testing for a long time, and competitors were starting to ship their own. It wasn't a big reason people left, but it kept coming up.",
        ],
      },
      {
        heading: 'My role',
        body: [
          'I was the first product engineer on the team, defining and prioritizing the MVP roadmap with the PM. I designed and proposed the initial prototype and the user experience, co-developed the technical architecture, and became the team lead when the team expanded. I also stepped in as acting PM.',
        ],
      },
      {
        heading: 'Approach and key decisions',
        body: [
          "The big one was recording tests instead of writing them. The alternative was making people build tests by hand, filling in every event and trigger themselves, which is so tedious that most people just wouldn't. With recording, you click through your app like normal and Retool turns what you did into a test. There was some pushback, because replaying those actions perfectly in a system as complex as Retool was really hard, but it was the only version people would actually use.",
          'Recording led to the next problem: a test runs at a different time than when it was recorded, so anything based on the time came out different on replay. We mocked the date and time, plus other values that change from run to run, like Math.random, so a replay sees the same thing the recording did.',
          "We also had to clean up what got recorded. Retool would sometimes fire the same event twice, so we deduped them. We also dropped assertions that didn't mean anything to the user, like checking that some flag got set in our backend, so a test only checked things people actually cared about.",
        ],
      },
      {
        heading: 'The solution',
        body: [
          'The demo at the top shows the whole flow: start a recording, click through your app, and you get a test made from the steps you took.',
          "Tests also ran on their own in CI. Whenever someone opened a change for review (Retool's version of a pull request), their tests ran against it, so teams could catch what broke before it went out.",
        ],
      },
      {
        heading: 'The hardest part',
        body: [
          'Getting a test to pass right after it was recorded. Nothing in the app has changed at that point, so it should always pass, but Retool is complex and so many things can happen differently from one run to the next. It took us many, many months to get there.',
        ],
      },
      {
        heading: 'Results',
        body: [
          'We drove early adoption across ~15 enterprise accounts representing $10M+ in ARR. Customers really liked it, even with plenty of bugs left to fix.',
          'After I left, Retool made a hard pivot to AI-generated apps, and the project was shut down for lack of resources, with plans to come back to testing later.',
        ],
      },
    ],
    learned:
      "You can't really measure whether something is valuable to customers until they can use a working prototype, and ours took a long time to get working (even then, it didn't work every time). Looking back, I'd have scoped it down and shipped something sooner, even if people had to write some tests by hand, because a simpler tool they can use today beats a perfect one they're still waiting for.",
  },
  {
    slug: 'amplitude',
    desk: {
      x: 33,
      y: 62,
      icon: '/images/projects/amplitude/amplitude-logo.svg',
      iconIsLogo: true,
      // A solid disc looks heavier than the line logos, so it's drawn smaller.
      iconScale: 0.8,
    },
    title: 'Amplitude',
    oneLiner:
      'Almost four years at [Amplitude](https://amplitude.com), from Series C to IPO: leading dashboards, building its first permissions system and a faster way to export charts, and helping the engineering team grow from ~30 to 100+.',
    year: '2018–2022',
    role: 'Product Engineer & Tech Lead',
    tags: ['Analytics', 'Dashboards', 'Tech lead'],
    cover: {
      src: '/images/projects/amplitude/dummy.jpg',
      alt: 'An Amplitude dashboard with daily, weekly and monthly active user charts',
      maxWidth: 560,
    },
    glance: {
      team: 'Engineering grew from ~30 to 100+ while I was there',
      timeline: 'Aug 2018 – Apr 2022',
      tools: ['JavaScript', 'React', 'AWS Lambda'],
    },
    impact: [
      { value: '+50%', label: 'dashboard monthly users' },
      { value: '~2K', label: 'accounts on permissions' },
      { value: '2x', label: 'faster chart exports' },
    ],
    sections: [
      {
        heading: 'What I worked on',
        body: [
          'Amplitude is a product analytics platform: teams use it to see what people actually do in their apps, like where they sign up, what they click and where they drop off.',
          "I joined at Series C and stayed through the IPO, and got promoted twice along the way, from engineer to tech lead. It's hard to pick one project from almost four years, so this is a few of the bigger things I worked on.",
        ],
        media: [
          {
            kind: 'gallery',
            columns: 1,
            images: [
              {
                src: '/images/projects/amplitude/event-seg.jpg',
                alt: 'A line chart of how many new users completed a purchase each week',
              },
              {
                src: '/images/projects/amplitude/funnel.jpg',
                alt: 'A bar chart of new users who completed a purchase each week, by country',
              },
              {
                src: '/images/projects/amplitude/cohorts.jpg',
                alt: 'A cohort of users who added to cart but did not complete a purchase',
              },
            ],
            caption:
              "The kinds of charts Amplitude is built around: trends over time, breakdowns, and groups of users who did (or didn't) do something.",
          },
        ],
      },
      {
        heading: 'Dashboards',
        body: [
          'Dashboards are where teams pin their most important charts so they can check on them every day. I led engineering for the dashboard experience, which meant helping decide what success looked like and how we rolled things out and launched them, not just building them.',
          'We shipped four high-priority features covering the whole life of a dashboard: getting started, creating one, keeping them organized, and working on them together. Over that time, monthly dashboard users grew 50%, from about 20K to 30K.',
        ],
        media: [
          {
            kind: 'image',
            src: '/images/projects/amplitude/dashboard.jpg',
            alt: 'An eCommerce starter dashboard with charts on customer acquisition and purchases',
            caption: "A dashboard made from one of Amplitude's starter templates.",
          },
        ],
      },
      {
        heading: 'Permissions',
        body: [
          "Amplitude didn't have a way for admins to control access by group, which bigger customers needed. Before deciding how ours should work, I talked to customers and looked closely at how Okta and AWS handle permissions, since a lot of admins already knew those.",
          "Then I architected and launched Amplitude's first user-group permissions system, which admins across ~2K customer accounts use to manage their teams.",
        ],
      },
      {
        heading: 'Chart exports',
        body: [
          'People wanted to share charts outside Amplitude, as images and PDFs or in Slack, but the old system for exporting them was unreliable. I designed and built a new rendering service on AWS Lambda by myself to replace it.',
          "It's about twice as fast, fails a lot less, and handles 300+ exports a day.",
        ],
        media: [
          {
            kind: 'image',
            src: '/images/projects/amplitude/slack-export.jpg',
            alt: 'An Amplitude alert in Slack with a chart image showing an unusual drop',
            caption: 'A chart sent to Slack as an image.',
          },
        ],
      },
      {
        heading: 'Growing the team',
        body: [
          'As a tech lead I mentored junior engineers and ran the technical side of our projects, from designing the architecture to splitting up the work.',
          'Engineering went from about 30 people to over 100 while I was there, so I helped with hiring too. I wrote interview questions and did 50+ interviews, for everyone from junior engineers to staff.',
        ],
      },
    ],
  },
  {
    slug: 'chem',
    desk: { x: 53, y: 18, icon: '/images/projects/chem/symbol.png', iconIsLogo: true },
    title: 'Chem',
    oneLiner:
      "A dating app for gay men in NYC where instead of swiping, we'd put 4 to 6 people we thought would click into a group and send them out for drinks.",
    year: '2025–2026',
    role: 'CTO & co-founder',
    tags: ['Startup', 'AI agents', 'Dating'],
    cover: {
      src: '/images/projects/chem/posters.jpg',
      alt: 'Chem posters reading "Less swipe" and "More spark"',
    },
    glance: {
      team: 'Me and my co-founder Nate, plus relationship scientists helping out',
      timeline: 'Oct 2025 – Mar 2026',
      tools: ['Claude Code', 'AI agents'],
    },
    impact: [
      { value: '50+', label: 'people interviewed' },
      { value: '50+', label: 'people matched into groups' },
      { value: '5', label: 'pairs went on real dates' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'My friend Nate and I were both sick of dating apps, since most of them are made for straight people and gay guys want different things out of dating. Every friend we asked said the same thing: you swipe forever, go on a bunch of first dates in NYC, spend a bunch of money, and then they never text you back.',
          'So we interviewed 50+ people, mostly in NYC. I assumed people wanted more matches, but they had plenty. What they didn\'t have was actual dates, because the chat would go on for days and nobody would ever make a plan. One guy said it best: "You can have the perfect text convo and then a bad date."',
          "People also told us they'd pay a little, but only if it actually got them on dates with people worth meeting. They trusted their friends' read on them way more than any profile, and literally everyone we asked said yes to being set up.",
        ],
      },
      {
        heading: 'My role',
        body: [
          'Nate was the CEO, so he talked to investors, found the relationship scientists and brought on our designer. I did all the technical stuff, including the AI agent that put the groups together, and I sat in on the interviews and the calls with the scientists too.',
        ],
      },
      {
        heading: 'Why groups',
        body: [
          "One-on-one dates eat up your whole night, and you can usually tell in the first few minutes if you're into the person, so then you're just stuck. A group of 4 to 6 is way more chill: it starts out as just hanging out, you get to meet a few people, and worst case you make a friend.",
          "The relationship scientists told us basically the same thing: you can't really predict attraction from prompts and questionnaires, because it mostly happens in person. So our whole goal became getting people in the same room as much as possible, without it feeling like a big commitment.",
        ],
      },
      {
        heading: 'How the matching worked',
        body: [
          "We didn't build anything at first and just did it by hand, picking the groups ourselves (with a little help from AI) and booking them at Donna in the West Village, a bar we partnered with. Good thing, too, because a few of our original ideas would have flopped if we'd built them first.",
          "Then I built the matching agent with Claude Code. People filled out a questionnaire and the agent worked through it in three steps, starting with the hard filters: who you're open to dating, what you're looking for, how fast you want to move, and dealbreakers like kids, religion or politics. People are way better at saying what they don't want than what they do, so we made those strict. After that it looked at softer stuff like social energy, how you talk, humor and values, and then, for each of those, whether you want someone like you or someone different.",
          "The agent narrowed it down and then we picked the final groups ourselves, since it had no way of knowing who'd actually be attracted to each other (that would've needed a whole different kind of data). After each meetup people sent us feedback, and the agent used it the next time it made groups.",
        ],
        media: [
          {
            kind: 'gallery',
            columns: 3,
            images: [
              {
                src: '/images/projects/chem/meetup-1.jpg',
                alt: 'A Chem group mingling at the bar',
              },
              { src: '/images/projects/chem/meetup-2.jpg', alt: 'Chem groups talking over drinks' },
              { src: '/images/projects/chem/meetup-3.jpg', alt: 'Chem groups at their tables' },
            ],
            caption:
              'Chem meetups at Donna in the West Village. Faces and name tags blurred for privacy.',
          },
        ],
      },
      {
        heading: 'The brand',
        body: [
          "Nate brought on a brand designer, and since we really didn't want Chem to look like every other dating app, we went with deep burgundy and dusty pink, a fancy old-school script, and black-and-white photos tinted in our colors. We wanted it to feel like you got invited somewhere.",
          'The logo is two loops that look like a heart and an atom, since the whole thing is about chemistry. My favorite lines were "Less swipe, more spark" and "We match people, not torsos."',
          'We designed a chat screen too, but we never actually built the app. Running the meetups by hand was teaching us so much that it made more sense to keep doing that.',
        ],
        media: [
          {
            kind: 'image',
            src: '/images/projects/chem/wordmark.jpg',
            alt: 'The Chem logo and wordmark',
            caption: 'The logo and wordmark.',
          },
          {
            kind: 'gallery',
            rowHeight: 360,
            images: [
              {
                src: '/images/projects/chem/monogram.jpg',
                alt: 'The Chem monogram, mirrored into a heart',
              },
              { src: '/images/projects/chem/love-formula.jpg', alt: 'A "love formula" poster' },
            ],
            caption: 'The monogram and one of our posters.',
          },
          {
            kind: 'gallery',
            columns: 2,
            images: [
              {
                src: '/images/projects/chem/social-1.jpg',
                alt: "Social posts and a Valentine's save-the-date",
              },
              {
                src: '/images/projects/chem/social-2.jpg',
                alt: 'Social posts: we match people, not torsos; the love formula; the law of attraction',
              },
            ],
            caption: "Social posts, including a save-the-date for a Valentine's night.",
          },
          {
            kind: 'gallery',
            columns: 2,
            images: [
              {
                src: '/images/projects/chem/color-vibe.jpg',
                alt: 'A black-and-white photo tinted in the three brand colors',
              },
              {
                src: '/images/projects/chem/mood.jpg',
                alt: 'A mood board of black-and-white reference photos capturing the feel of Chem',
              },
            ],
            caption:
              "The vibe we were going for: our designer pulled these reference photos for the mood board (they're not Chem members), then tinted them in our colors.",
          },
          {
            kind: 'image',
            src: '/images/projects/chem/chat-concept.jpg',
            alt: 'A chat screen concept in light, medium and dark themes',
            caption: 'Chat screen ideas in three themes. We never ended up building the app.',
          },
        ],
      },
      {
        heading: 'The hardest part',
        body: [
          "Deciding whether to use an agent at all, since people love having a real matchmaker they can talk to. That's expensive and doesn't scale, though, so we let the agent do most of the work and kept ourselves in the parts that really needed a person.",
        ],
      },
      {
        heading: 'Results',
        body: [
          'We matched 50+ people into groups of 4 to 6, and honestly, a lot of the groups flopped romantically. Everyone got along, but nobody was into each other, which is the physical attraction problem again. A lot of people made friends though, and at least 5 pairs went on real dates after.',
          "We ended it in early 2026. Constantly changing things and never knowing what would work was stressful for Nate, and I didn't have time to keep it going by myself. We're still close friends.",
          "I'm not done with the idea though, and over the next few months I want to build something like Chem for Columbia Business School.",
        ],
      },
    ],
    learned:
      'Do it by hand before you build it. We figured out a lot just by running the meetups ourselves, and some of our ideas would have been a total waste to build. Iterating fast was honestly the most fun part, and attraction is really, really hard to get right.',
  },
  {
    slug: 'passionfruit',
    desk: { x: 86, y: 36, icon: '/images/projects/passionfruit/logo-tight.jpg', iconIsLogo: true },
    title: 'Passionfruit',
    oneLiner:
      'During lockdown, a lot of us were learning instruments alone in our rooms, so Passionfruit was a place to share the messy practice clips and get cheered on.',
    year: '2020–2021',
    role: 'Co-founder & CEO',
    tags: ['Startup', 'Music', 'Community'],
    cover: {
      src: '/images/projects/passionfruit/desktop.jpg',
      alt: 'The Passionfruit home page, with progress updates and quick practice snippets',
    },
    glance: {
      team: 'Me and two friends from Georgia Tech',
      timeline: 'Jul 2020 – Mar 2021, nights and weekends',
      tools: ['React', 'Python', 'Django', 'PostgreSQL', 'AWS'],
    },
    impact: [
      { value: '100+', label: 'musicians we talked to' },
      { value: '2 months', label: 'to launch' },
      { value: '200+', label: 'weekly active users' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'In 2020 I was stuck at home like everyone else, teaching myself piano and guitar, and it got lonely pretty fast. Nobody heard me play, and I had no idea if I was getting any better. I asked a few friends and they were in the same spot, and once I started looking, people were saying the same thing all over Reddit and Discord.',
          "Those communities were great for finding other musicians, but almost nobody posted what they were actually working on. You'd see the finished song but never the forty bad takes before it, because people were nervous about being judged, which I totally get.",
        ],
      },
      {
        heading: 'My role',
        body: [
          "I started it with two friends I'd graduated from Georgia Tech with, and since we all had day jobs (I was at Amplitude), this was nights and weekends. I was the CEO, so I talked to a lot of musicians, figured out what we should build next, and kept everyone excited when things got slow. I was also deep in the code the whole time, building a lot of the app myself.",
          'My co-founders and I split the engineering, and they talked to users too.',
        ],
      },
      {
        heading: 'Approach and key decisions',
        body: [
          "We argued about posting more than anything else. Every social app makes you feel like a post has to be perfect, and that pressure was the whole reason people weren't sharing, so we wanted posting a practice clip to feel more like scribbling in a notebook: quick, and totally fine if it's rough.",
          'So the form barely asks for anything: what you\'re playing, your level, and how long you\'ve practiced since last time. We also added a little "want feedback?" checkbox, because some days you just want someone to say nice job, not tell you your timing is off.',
          'A lot of the rest, like how comments, sharing and challenges worked, came straight out of conversations with the people using it.',
        ],
        media: [
          {
            kind: 'gallery',
            columns: 2,
            images: [
              {
                src: '/images/projects/passionfruit/add-to-log.jpg',
                alt: 'Choosing which progress log a new clip belongs to, or starting a new one',
              },
              {
                src: '/images/projects/passionfruit/add-clip.jpg',
                alt: 'The form for adding a practice clip, with a checkbox asking whether you want feedback',
              },
            ],
            caption: 'Posting a clip: pick a log (or start one), fill in a couple of things, done.',
          },
        ],
      },
      {
        heading: 'The solution',
        body: [
          "It's built around goals, so say you're learning a song: you start a progress log for it and drop in short practice videos as you go, so you can look back and actually see yourself improving. People follow each other and leave comments, mostly \"you're getting there!\" and sometimes a helpful tip.",
          'Under the hood it was a web app that worked on phones, built with React, Django and PostgreSQL, with the videos on AWS. We wrote every line ourselves, back in 2020, a few years before vibe coding was a thing.',
        ],
        media: [
          {
            kind: 'gallery',
            columns: 4,
            images: [
              {
                src: '/images/projects/passionfruit/explore.jpg',
                alt: 'The explore feed of practice clips from other musicians',
              },
              {
                src: '/images/projects/passionfruit/progress-log.jpg',
                alt: 'A progress log for learning a piano duet, with clips and comments',
              },
              {
                src: '/images/projects/passionfruit/empty-log.jpg',
                alt: 'A new, empty practice log nudging me to add my first recording',
              },
              {
                src: '/images/projects/passionfruit/profile.jpg',
                alt: 'My profile, with progress logs for songs I was learning',
              },
            ],
            caption:
              "The explore feed, one of my progress logs, a brand-new log, and my profile. (Other people's faces blurred.)",
          },
        ],
      },
      {
        heading: 'Results',
        body: [
          'We launched about two months in, and for our first users we went to the Reddit and Discord groups where people were already talking about practicing alone and invited them over. We got to a little over 200 people using it every week.',
          "That was enough to get us an interview at Y Combinator, but when they asked how we'd make money, honestly, we didn't have a great answer, and we didn't get in. We kept going for a bit, tried a pivot, and eventually decided to shut it down.",
        ],
      },
    ],
    learned:
      "Start with the problem, not the idea, and look at what people are already doing and where it falls short. When you fall in love with a solution first, it's really easy to spend months building it without checking whether anyone actually needs it, and that's a lesson I've carried into everything since.",
  },
  {
    slug: 'exie',
    desk: { x: 70, y: 68, icon: '/images/projects/exie/badge.svg', iconIsLogo: true },
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
          "I wasn't any better: every week I'd click through each of my courses trying to piece together what was due and when, and I'd still miss things.",
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
          'I built it on my own in about a week, after noticing how much of the chat was these questions and figuring a bot could answer most of them.',
          "It's still a work in progress, since classmates keep DMing me ideas and bugs and I keep adding to it.",
        ],
      },
      {
        heading: 'Approach and key decisions',
        body: [
          "I put it in WhatsApp because that's where everyone already was, and there was no point making people download something new when the homework chat already existed. You just start a message with @exie.",
          "I also wanted it to cost next to nothing, since everyone using it is a student, me included. It runs on a free Google Cloud server, and I used Baileys to connect to WhatsApp because it's light on memory. The answers come from Gemini's free tier, and when the free models are busy it falls back to Vertex AI, which is paid, so I capped how much of that it can use in a day.",
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
              "My message introducing Exie, where I asked everyone to keep questions in the group so WhatsApp wouldn't flag her as a bot.",
          },
        ],
      },
      {
        heading: 'The solution',
        body: [
          'Say someone types "@exie what\'s the homework for this week?" Exie goes into CourseWorks, uses Gemini to work out which assignments and pages matter, and replies with everything due that week, grouped by class, and since we all take the same classes, one answer covers everyone.',
          'People also ask it about readings, exam dates, the syllabus and office hours, and it remembers the last few messages too, so you can follow up with something like "when is that due?"',
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
          "Most of what I've added since came from them. A lot of homework only lives in lecture slides, so people asked if Exie could read those, images included, and now it does, re-indexing any new slides every 6 hours so it can find things quickly.",
        ],
      },
    ],
    learned:
      "Simple tools can make a real difference to people's week, and I didn't expect to get this many thank-yous for a homework bot.",
  },
]

export function findProject(slug: string | undefined) {
  return projects.findIndex((project) => project.slug === slug)
}
