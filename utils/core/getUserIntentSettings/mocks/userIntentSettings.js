export const SingleUserIntentWithAllSettings = [
  {
    id: '1',
    settings: {
      pageScroll: 40,
      pageExit: true,
      pageElapsed: 10,
      pageInactivity: 20,
    },
    urlRule: {
      or: [
        {
          key: 'url',
          operator: 'matches',
          value: '/*',
        },
      ],
      exclude: [],
    },
    active: true,
    ctaType: 'slidein_top',
    repeat: '60_min',
    updatedAt: '2023-08-03T14:52:20+00:00',
    config: {},
  },
]

export const SingleUserIntentWithFewSettings = [
  {
    id: '1',
    settings: {
      pageScroll: 40,
      pageExit: true,
    },
    urlRule: {
      or: [
        {
          key: 'url',
          operator: 'matches',
          value: '/*',
        },
      ],
      exclude: [],
    },
    active: true,
    ctaType: 'slidein_top',
    repeat: '60_min',
    updatedAt: '2023-08-03T14:52:20+00:00',
    config: {},
  },
]

export const MultiUserIntentWithDifferentSettings = [
  {
    id: '1',
    settings: {
      pageScroll: 40,
      pageExit: true,
    },
    urlRule: {
      or: [
        {
          key: 'url',
          operator: 'matches',
          value: '/*',
        },
      ],
      exclude: [],
    },
    active: true,
    ctaType: 'slidein_top',
    repeat: '60_min',
    updatedAt: '2023-08-03T14:52:20+00:00',
    config: {},
  },
  {
    id: '2',
    settings: {
      pageElapsed: 10,
      pageInactivity: 20,
    },
    urlRule: {
      or: [
        {
          key: 'url',
          operator: 'matches',
          value: '/*',
        },
      ],
      exclude: [],
    },
    active: true,
    ctaType: 'slidein_top',
    repeat: '60_min',
    updatedAt: '2023-07-31T13:41:07+00:00',
    config: {},
  },
]

export const MultiUserIntentWithSameSettingsSameCTAType = [
  {
    id: '1',
    settings: {
      pageScroll: 40,
      pageExit: true,
    },
    urlRule: {
      or: [
        {
          key: 'url',
          operator: 'matches',
          value: '/*',
        },
      ],
      exclude: [],
    },
    active: true,
    ctaType: 'slidein_top',
    repeat: '60_min',
    updatedAt: '2023-08-03T14:52:20+00:00',
    config: {},
  },
  {
    id: '2',
    settings: {
      pageScroll: 40,
      pageExit: true,
    },
    urlRule: {
      or: [
        {
          key: 'url',
          operator: 'matches',
          value: '/*',
        },
      ],
      exclude: [],
    },
    active: true,
    ctaType: 'slidein_top',
    repeat: '60_min',
    updatedAt: '2023-07-31T13:41:07+00:00',
    config: {},
  },
]

export const MultiUserIntentWithSameSettingsDifferentCTAType = [
  {
    id: '1',
    settings: {
      pageScroll: 40,
      pageExit: true,
    },
    urlRule: {
      or: [
        {
          key: 'url',
          operator: 'matches',
          value: '/*',
        },
      ],
      exclude: [],
    },
    active: true,
    ctaType: 'popup',
    repeat: '60_min',
    updatedAt: '2023-08-03T14:52:20+00:00',
    config: {},
  },
  {
    id: '2',
    settings: {
      pageScroll: 40,
      pageExit: true,
    },
    urlRule: {
      or: [
        {
          key: 'url',
          operator: 'matches',
          value: '/*',
        },
      ],
      exclude: [],
    },
    active: true,
    ctaType: 'slidein_top',
    repeat: '60_min',
    updatedAt: '2023-07-31T13:41:07+00:00',
    config: {},
  },
]
