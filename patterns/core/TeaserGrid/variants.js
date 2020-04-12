const tiles = {
  topRight: {
    content: {
      headline: '[1] Magazine Heading for the Teaser',
      text:
        'Teaser Type of Lorem ipsum sit amet, consetetur sadipscing elitr, sed diam nonumy.',
    },
    image: {
      src: 'assets/images/teaserGrid/example1.jpg',
      alt: 'Alt Text',
    },
    link: '#todo',
  },
  left: {
    content: {
      headline: '[2] Magazine Heading for the Teaser',
      text:
        'Teaser Type of Lorem ipsum sit amet, consetetur sadipscing elitr, sed diam nonumy.',
    },
    image: {
      src: 'assets/images/teaserGrid/example2.jpg',
      alt: 'Alt Text',
    },
    link: '',
  },
  middle: {
    content: {
      headline: '[3] Magazine Heading for the Teaser',
      text:
        'Teaser Type of Lorem ipsum sit amet, consetetur sadipscing elitr, sed diam nonumy.',
    },
    image: {
      src: 'assets/images/teaserGrid/example3.jpg',
      alt: 'Alt Text',
    },
    link: '#todo',
  },
  bottomRight: {
    content: {
      headline: '[4] Magazine Heading for the Teaser',
      text:
        'Teaser Type of Lorem ipsum sit amet, consetetur sadipscing elitr, sed diam nonumy.',
    },
    image: {
      src: 'assets/images/teaserGrid/example4.jpg',
      alt: 'Alt Text',
    },
    link: '#todo',
  },
}

export default [
  {
    name: 'Default',
    props: {
      tiles,
    },
  },
  {
    name: 'Inverted',
    props: {
      variant: 'inverted',
      tiles,
    },
  },
  {
    name: 'More visual with less headlines and text',
    props: {
      variant: 'inverted',
      tiles: {
        topRight: {
          ...tiles.topRight,
          content: {
            headline: '',
            text: '',
          },
        },
        left: {
          ...tiles.left,
          content: {
            headline: '',
            text: '',
          },
        },
        middle: {
          ...tiles.middle,
          content: {
            headline: '',
            text: '',
          },
        },
        bottomRight: {
          ...tiles.bottomRight,
          content: {
            headline: '',
            text: '',
          },
        },
      },
    },
  },
]
