export default [
  {
    name: 'With button',
    props: {
      heading: 'Heading ipsum dolor sit amet, consetetur sadipscing',
      text:
        'Copytext Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna accusam et justo duo.',
      image: {
        src: '/assets/images/teaserSingle/example.jpg',
        alt: 'Alt Text',
      },
      button: {
        isVisible: true,
        text: 'Discover this',
      },
    },
  },
  {
    name: 'Without button',
    props: {
      heading: 'Heading ipsum dolor sit amet, consetetur sadipscing',
      text:
        'Copytext Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna accusam et justo duo.',
      image: {
        src: '/assets/images/teaserSingle/example.jpg',
        alt: 'Alt Text',
      },
      button: {
        isVisible: false,
      },
    },
  },
]
