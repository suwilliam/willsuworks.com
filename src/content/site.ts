// All of the site's words live here. Replace the [bracketed] placeholders
// with your own content; the pages pick up changes automatically.

export type Link = { label: string; href: string }

export type Role = {
  years: string
  title: string
  org: string
  summary?: string
}

export type Project = {
  title: string
  /** e.g. '2025', or 'Retool · 2024' */
  detail?: string
  summary?: string
  /** Tech used, shown as small tags. */
  stack?: string[]
  /** e.g. { label: 'Live', href: '…' }, { label: 'Code', href: '…' } */
  links?: Link[]
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

export type Interest = {
  title: string
  text?: string
}

export type SiteContent = {
  name: string
  location: string
  email: string
  socials: Link[]
  home: {
    greeting?: string
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
  portfolio: {
    intro: string
    projects: Project[]
  }
  music: {
    intro: string
    tracks: Track[]
  }
  interests: {
    intro: string
    items: Interest[]
  }
  contact: {
    intro: string
  }
}

export const site: SiteContent = {
  name: 'Will',
  location: 'New York, NY',
  email: 'willsuwrites@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/suwilliam' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/suwilliam' },
  ],

  home: {
    intro: [
      "I'm at Columbia doing an MBA and currently producing my first EP.",
    ],
    photo: {
      src: '/images/profile.jpg',
      alt: 'Will smiling on a rooftop in Amsterdam at sunset',
      position: '60% 37%',
      zoom: 1.4,
    },
    track: {
      title: 'daydreaming by the window at sunset',
      artist: 'wills street',
      url: 'https://soundcloud.com/will-su-360072221/daydreaming-by-the-window-at-sunset',
    },
  },

  work: {
    intro: 'I dive deep in engineering and product.',
    resumeUrl: '/William_Su_Resume.pdf',
    roles: [
      {
        years: '2026 – 2028',
        title: 'MBA and MS in AI & Machine Learning',
        org: 'Columbia University',
        summary:
          'MBA in Technology Strategy & Entrepreneurship at Columbia Business School, alongside an MS at Columbia Engineering.',
      },
      {
        years: '2022 – 2026',
        title: 'Product Engineer / Product Manager',
        org: 'Retool',
        summary:
          "Led the redesign of Retool's core IDE for 40K+ monthly users, and took a record-and-replay testing platform from zero to early adoption across ~15 enterprise accounts.",
      },
      {
        years: '2018 – 2022',
        title: 'Product / Software Engineer',
        org: 'Amplitude',
        summary:
          'Tech lead for the dashboard experience, which grew 50% to ~30K monthly users. Built the first user-group permissions system and a faster chart export service. Promoted twice.',
      },
      {
        years: '2014 – 2018',
        title: 'BS in Computer Science',
        org: 'Georgia Institute of Technology',
      },
    ],
  },

  portfolio: {
    intro: '[A line about the things you build.]',
    projects: [
      {
        title: '[Project name]',
        detail: '2026',
        summary: '[What it is, what you built, and what happened.]',
        stack: ['React', 'TypeScript'],
        links: [
          { label: 'Live', href: '#' },
          { label: 'Code', href: '#' },
        ],
      },
      {
        title: '[Project name]',
        detail: '2025',
        summary: '[What it is, what you built, and what happened.]',
        stack: ['Python'],
        links: [{ label: 'Code', href: '#' }],
      },
      {
        title: '[Project name]',
        detail: '2024',
        summary: '[What it is, what you built, and what happened.]',
      },
    ],
  },

  music: {
    intro: 'I produce in Ableton and DJ jazz and house. My first EP is in the works.',
    tracks: [
      { title: '[Track title]', detail: 'Single · 2026', length: '3:42', href: '#' },
      { title: '[Track title]', detail: 'EP · 2025', length: '4:10', href: '#' },
      { title: '[Track title]', detail: 'Demo · 2024', length: '2:58', href: '#' },
    ],
  },

  interests: {
    intro: '[A line about what you do when you are not working or making music.]',
    items: [
      { title: 'DJing', text: 'Mostly jazz and house.' },
      { title: 'Scuba diving', text: 'Advanced certified.' },
      { title: 'Surfing' },
      {
        title: 'Biking',
        text: 'Rode AIDS/LifeCycle from San Francisco to LA and raised $4K for HIV services.',
      },
      { title: 'Living abroad' },
    ],
  },

  contact: {
    intro: "Want to collaborate, talk product, or trade music? I'd love to hear from you.",
  },
}
