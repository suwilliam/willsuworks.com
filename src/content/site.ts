// All of the site's words live here. Replace the [bracketed] placeholders
// with your own content; the pages pick up changes automatically.

export type Link = { label: string; href: string }

export type Org = {
  name: string
  /** Optional website; the name (and logo) link to it. */
  url?: string
  /** Optional logo shown beside the name, e.g. '/images/logos/retool.svg'. */
  logo?: string
}

export type Role = {
  years: string
  title: string
  /** Usually one; list several for a joint program and they share a line. */
  orgs: Org[]
  summary?: string
}

export type Track = {
  title: string
  detail: string
  length?: string
  href: string
}

export type FeaturedTrack = {
  title: string
  artist: string
  /** The track's public SoundCloud link. */
  url: string
}

export type SiteContent = {
  name: string
  location: string
  email: string
  socials: Link[]
  home: {
    greeting?: string
    /** A short line under the big heading, shown with a map pin. */
    based?: string
    /** Paragraphs. Write [words](/page) to link words to a page or a website. */
    intro: string[]
    /**
     * Put the image in /public/images and set src to e.g. '/images/photo.jpg'.
     * Leave src empty for a placeholder. position is the CSS object-position
     * used when cropping the photo to fit (e.g. '50% 30%' keeps the top third),
     * and the point zoom scales toward. zoom 1 shows the full crop; 1.5 is closer.
     */
    photo: { src: string; alt: string; position?: string; zoom?: number }
    /** A SoundCloud track visitors can play from the profile photo. Remove to turn it off. */
    track?: FeaturedTrack
  }
  work: {
    intro: string
    resumeUrl: string
    roles: Role[]
  }
  music: {
    intro: string
    /** Optional line shown under the tracklist. Wrap words in *asterisks* for italics. */
    outro?: string
    /** Shown as the artist when a track plays in the site's player. */
    artist: string
    /** The artist card under the tracklist. */
    profile?: { image: string; tagline?: string; url: string }
    tracks: Track[]
  }
  contact: {
    intro: string
    /** Email addresses listed on the Contact page, each with its own copy button. */
    emails: { label: string; address: string }[]
  }
}

export const site: SiteContent = {
  name: 'William Su',
  location: 'New York, NY',
  email: 'willsuwrites@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/suwilliam' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/suwilliam' },
    { label: 'SoundCloud', href: 'https://soundcloud.com/willinspace' },
  ],

  home: {
    based: '🏠  New York, NY',
    intro: [
      'Building [cool things](/portfolio) and getting [two master degrees](/tech) at Columbia',
    ],
    photo: {
      src: '/images/profile.jpg',
      alt: 'Will smiling on a rooftop in Amsterdam at sunset',
      position: '60% 37%',
      zoom: 1.4,
    },
    track: {
      title: '[dj set] daydreaming by the window at sunset',
      artist: 'will in space',
      url: 'https://soundcloud.com/willinspace/daydreaming-by-the-window-at-sunset',
    },
  },

  work: {
    intro: 'I dive deep in engineering and product.',
    resumeUrl: '/William_Su_Resume.pdf',
    roles: [
      {
        years: '2026 – 2028',
        title: 'MBA and MS in AI & Machine Learning',
        orgs: [
          {
            name: 'Columbia Business School',
            url: 'https://business.columbia.edu',
            logo: '/images/logos/columbia-business-school.svg',
          },
          {
            name: 'Columbia University',
            url: 'https://www.columbia.edu',
            logo: '/images/logos/columbia-university.svg',
          },
        ],
        summary:
          'An MBA focused on tech strategy and entrepreneurship, paired with an MS in AI from Columbia Engineering.',
      },
      {
        years: '2022 – 2026',
        title: 'Product Engineer / Product Manager',
        orgs: [{ name: 'Retool', url: 'https://retool.com', logo: '/images/logos/retool.svg' }],
        summary:
          "I wore both the engineer and PM hats here. I led the redesign of Retool's core editor, which shipped to 40K+ monthly users, and built a record-and-replay testing product from scratch that landed with ~15 enterprise customers.",
      },
      {
        years: '2018 – 2022',
        title: 'Product / Software Engineer',
        orgs: [{ name: 'Amplitude', url: 'https://amplitude.com', logo: '/images/logos/amplitude.svg' }],
        summary:
          "Joined at Series C and stayed through the IPO, going from engineer to tech lead. I led dashboards (up 50% to ~30K monthly users), built Amplitude's first permissions system, and interviewed 50+ engineers as the team tripled.",
      },
      {
        years: '2014 – 2018',
        title: 'BS in Computer Science',
        orgs: [
          {
            name: 'Georgia Institute of Technology',
            url: 'https://www.gatech.edu',
            logo: '/images/logos/georgia-tech.svg',
          },
        ],
        summary: 'Concentrations in Intelligence and Big Data.',
      },
    ],
  },

  music: {
    intro: 'I make music in Ableton and DJ house and jazz sometimes. Here are a couple of tracks I made.',
    outro: 'My first EP under my artist project name *will in space* is in the works.',
    artist: 'will in space',
    profile: {
      image: '/images/will-in-space.jpg',
      url: 'https://soundcloud.com/willinspace',
    },
    tracks: [
      {
        title: 'jump',
        detail: 'House · 2026',
        length: '2:46',
        href: 'https://soundcloud.com/willinspace/jump',
      },
      {
        title: 'thats the way',
        detail: 'Drum & Bass · 2026',
        length: '2:15',
        href: 'https://soundcloud.com/willinspace/thats-the-way',
      },
      {
        title: 'dont worry',
        detail: 'DnB Pop · 2026',
        length: '4:07',
        href: 'https://soundcloud.com/willinspace/dont-worry',
      },
    ],
  },

  contact: {
    intro: "Want to collaborate, talk product, trade music, or hire me? I'd love to hear from you.",
    emails: [
      { label: 'Personal', address: 'willsuwrites@gmail.com' },
      { label: 'Columbia', address: 'wsu28@gsb.columbia.edu' },
    ],
  },
}
