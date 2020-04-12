const tiles = {
  topRight: {
    content: {
      heading: '[1] Magazine Heading for the Teaser',
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
      heading: '[2] Magazine Heading for the Teaser',
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
      heading: '[3] Magazine Heading for the Teaser',
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
      heading: '[4] Magazine Heading for the Teaser',
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
    name: 'More visual with less headings and text',
    props: {
      variant: 'inverted',
      tiles: {
        topRight: {
          ...tiles.topRight,
          content: {
            heading: '',
            text: '',
          },
        },
        left: {
          ...tiles.left,
          content: {
            heading: '',
            text: '',
          },
        },
        middle: {
          ...tiles.middle,
          content: {
            heading: '',
            text: '',
          },
        },
        bottomRight: {
          ...tiles.bottomRight,
          content: {
            heading: '',
            text: '',
          },
        },
      },
    },
  },
]
