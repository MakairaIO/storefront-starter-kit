export default [
  {
    name: 'With button',
    props: {
      image: {
        src: 'assets/images/teaserSingle/example.jpg',
        alt: 'Alt Text',
      },
      content: {
        heading: 'Heading ipsum dolor sit amet, consetetur sadipscing',
        text:
          'Copytext Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna accusam et justo duo.',
      },
      button: {
        isVisible: true,
        text: 'Discover this',
      },
      link: '#todo',
    },
  },
  {
    name: 'Without button',
    props: {
      image: {
        src: 'assets/images/teaserSingle/example.jpg',
        alt: 'Alt Text',
      },
      content: {
        heading: 'Heading ipsum dolor sit amet, consetetur sadipscing',
        text:
          'Copytext Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna accusam et justo duo.',
      },
      button: {
        isVisible: false,
      },
    },
  },
  {
    name: 'With little content',
    props: {
      image: {
        src: 'assets/images/teaserSingle/example.jpg',
        alt: 'Alt Text',
      },
      content: {
        heading: 'Heading ipsum',
        text: 'Copytext Lorem ipsum.',
      },
      button: {
        isVisible: false,
      },
    },
  },
]
