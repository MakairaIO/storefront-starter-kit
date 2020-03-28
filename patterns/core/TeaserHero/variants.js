const headingProps = {
  isVisible: true,
  text: 'The Botanist Islay Dry Gin',
  pre: 'Premium Gin',
  sub: 'ab 32,99 €',
}

const overlayProps = {
  isVisible: true,
  heading: 'Ein besonderes Erlebnis',
  text:
    'Foraging used to be all we knew; we were self-reliant, adaptive creatures in a dynamic natural world. Those instincts have gone to sleep in bland days of convenience and blasé consumption.',
  button: {
    isVisible: true,
    text: 'Discover this',
  },
}

export default [
  {
    name: 'Fully featured',
    props: {
      heading: { ...headingProps },
      overlay: { ...overlayProps },
      image: {
        src: 'assets/images/teaserHero/example.jpg',
        alt: 'Alt Text',
      },
      link: '/',
    },
  },
  {
    name: 'Without Button',
    props: {
      heading: { ...headingProps },
      overlay: { ...overlayProps, button: { isVisible: false } },
      image: {
        src: 'assets/images/teaserHero/example.jpg',
        alt: 'Alt Text',
      },
      link: '#todo',
    },
  },
  {
    name: 'Without Overlay',
    props: {
      heading: { ...headingProps },
      overlay: { ...overlayProps, isVisible: false },
      image: {
        src: 'assets/images/teaserHero/example.jpg',
        alt: 'Alt Text',
      },
      link: '#todo',
    },
  },
  {
    name: 'Without Heading',
    props: {
      heading: { ...headingProps, isVisible: false },
      overlay: { ...overlayProps },
      image: {
        src: 'assets/images/teaserHero/example.jpg',
        alt: 'Alt Text',
      },
      link: '#todo',
    },
  },
  {
    name: 'Image only - no link',
    props: {
      heading: { ...headingProps, isVisible: false },
      overlay: { ...overlayProps, isVisible: false },
      image: {
        src: 'assets/images/teaserHero/example.jpg',
        alt: 'Alt Text',
      },
      link: '',
    },
  },
]
