const footerSnippet = {
  id: '2678ec1d-745c-4470-8d85-bf0e88547092',
  component: 'footer',
  properties: {
    active: true,
    userGroups: {
      'Alle Benutzer': {
        active: true,
        isTimed: false,
        activeFrom: '2022-07-25T16:08:59.438Z',
        activeTo: '2022-07-25T16:08:59.438Z',
      },
    },
    content: {
      menu_1: {
        title: 'Legal & Service',
        items: [
          {
            title: 'Impressum',
            href: '/de/impressum/',
          },
          {
            title: 'Kontakt',
            href: '/de/kontakt/',
          },
          {
            title: 'Datenschutz',
            href: '/de/datenschutz/',
          },
          {
            title: 'Pricing',
            href: '/de/preis-rechner/',
          },
          {
            title: 'Demo vereinbaren',
            href: 'https://calendly.com/makairatildreyer/demotour',
          },
        ],
      },
      menu_2: {
        title: '',
        items: [],
      },
    },
  },
}

export default [
  {
    name: 'Default',
    props: {
      variant: 'full',
      footerSnippet,
    },
  },
]
