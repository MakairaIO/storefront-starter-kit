export default [
  {
    name: 'With button',
    props: {
      headline: 'Heading ipsum dolor sit amet, consetetur sadipscing',
      text:
        'Copytext Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna accusam et justo duo.',
      image: {
        src: '/assets/images/singleTeaser/example.jpg',
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
      headline: 'Heading ipsum dolor sit amet, consetetur sadipscing',
      text:
        'Copytext Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna accusam et justo duo.',
      image: {
        src: '/assets/images/singleTeaser/example.jpg',
        alt: 'Alt Text',
      },
      button: {
        isVisible: false,
      },
    },
  },
]
