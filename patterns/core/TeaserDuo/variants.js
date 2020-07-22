const teaserProps = {
  heading: 'Turicum Gin',
  subheading: 'Barrel aged',
  hint: 'ab 32,99 €',
  link: '#todo',
  description: {
    heading: 'Ein besonderes Erlebnis',
    text:
      'Foraging used to be all we knew; we were self-reliant, adaptive creatures in a dynamic natural world. Those instincts have gone to sleep in bland days of convenience and blasé consumption.',
  },
}

const imageLeft = {
  src: 'assets/images/duoTeaser/example.jpg',
  alt: 'Alt Text',
}

const imageRight = {
  src: 'assets/images/duoTeaser/example_2.jpg',
  alt: 'Alt Text',
}

export default [
  {
    name: 'Default',
    props: {
      leftTile: { ...teaserProps, image: { ...imageLeft } },
      rightTile: { ...teaserProps, image: { ...imageRight } },
    },
  },
]
