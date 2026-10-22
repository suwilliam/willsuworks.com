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
  /** Playback volume from 0 to 100, for a track that's louder than the rest. Default 100. */
  volume?: number
}

export type SiteContent = {
  name: string
  location: string
  email: string
  socials: Link[]
  home: {
    greeting?: string
    /** A short line under the big heading, shown after a small map dot. */
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
    /** A wide photo between the intro and the tracklist. */
    photo?: { src: string; alt: string; caption?: string }
    /** Photos side by side under the tracklist. */
    photos?: { src: string; alt: string; caption?: string }[]
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
    based: 'New York, NY',
    intro: [
      'Building [cool things](/portfolio) and pursuing [dual master degrees](/tech) at Columbia',
    ],
    photo: {
      src: '/images/profile/profile.jpg',
      alt: 'Will smiling on a rooftop in Amsterdam at sunset',
      position: '60% 37%',
      zoom: 1.4,
    },
    track: {
      title: '[dj set] daydreaming',
      artist: 'will in space',
      url: 'https://soundcloud.com/willinspace/daydreaming-by-the-window-at-sunset',
      volume: 45,
    },
  },

  work: {
    intro:
      "I've been building software for about eight years, first as an engineer and later as a PM.",
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
          'An MBA in tech strategy and entrepreneurship, plus an MS in AI at Columbia Engineering at the same time.',
      },
      {
        years: '2022 – 2026',
        title: 'Product Engineer / Product Manager',
        orgs: [{ name: 'Retool', url: 'https://retool.com', logo: '/images/logos/retool.svg' }],
        summary:
          "I started as an engineer and ended up doing a lot of the PM work too. I led engineering on the redesign of Retool's main editor, which went out to 40K+ monthly users, and took a new record-and-replay testing product from nothing to ~15 enterprise customers.",
      },
      {
        years: '2018 – 2022',
        title: 'Product / Software Engineer',
        orgs: [
          { name: 'Amplitude', url: 'https://amplitude.com', logo: '/images/logos/amplitude.svg' },
        ],
        summary:
          "I joined at Series C and stayed through the IPO, going from engineer to tech lead. I led engineering on dashboards, which grew from ~20K to ~30K monthly users, built Amplitude's first permissions system, and did 50+ interviews as the engineering team tripled.",
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
    intro:
      'I make music in Ableton and DJ house and jazz sometimes. Here are a couple of tracks I made.',
    photo: {
      src: '/images/music/music-production-cafe.jpg',
      alt: 'A laptop running Ableton, an Akai MPK mini keyboard and headphones on a sunny café window counter',
      caption: 'Ableton, an MPK mini and a sunny window seat at a cafe.',
    },
    photos: [
      {
        src: '/images/music/dj-set.jpg',
        alt: 'William DJing in headphones behind a glass booth, under coloured stage lights',
        caption: 'Behind the decks.',
      },
      {
        src: '/images/music/bay-window-setup.jpg',
        alt: 'A DJ controller and two speakers on a desk in a curved bay window at sunset',
        caption: 'My setup in my bay windows at sunset when I used to live in San Francisco.',
      },
    ],
    outro: 'My first EP under my artist project name *will in space* is in the works.',
    artist: 'will in space',
    profile: {
      image: '/images/profile/will-in-space.jpg',
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
