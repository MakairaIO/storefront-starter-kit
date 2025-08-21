export default [
  {
    name: 'Default',
    props: {
      heading: 'Donec posuere vulputate arcu',
      headingAlignment: 'right',
      textColumn: {
        text: 'Lorem ipsum dolor sit amet, consetetur elitr, sediam. Lorem ipsum dolor sit amet, con setetur sadipscing elitr, sed diam.',
        textAlignment: 'right',
        button: {
          text: 'Button',
          link: 'www.example.com',
        },
        buttonAlignment: 'right',
      },
      mediaColumn: {
        image: {
          url: 'assets/images/teaserSingle/example.jpg',
          alt: 'example.jpg',
        },
        video: {
          posterImage: 'assets/images/EmbeddedVideo/example.jpg',
          src: 'https://vimeo.com/755193645/30bfc69768',
        },
        mediaType: 'image',
        mediaAlignment: 'left',
      },
      columnAlignment: 'text-media',
    },
  },
  {
    name: 'Media - Text (Video - Vimeo)',
    props: {
      heading: 'Donec posuere vulputate arcu',
      headingAlignment: 'left',
      textColumn: {
        text: 'Lorem ipsum dolor sit amet, consetetur elitr, sediam. Lorem ipsum dolor sit amet, con setetur sadipscing elitr, sed diam.',
        textAlignment: 'left',
        button: {
          text: 'Button',
          link: '/',
        },
        buttonAlignment: 'left',
      },
      mediaColumn: {
        image: {
          url: 'assets/images/teaserSingle/example.jpg',
          alt: 'example.jpg',
        },
        video: {
          posterImage: 'assets/images/EmbeddedVideo/example.jpg',
          src: 'https://vimeo.com/755193645/30bfc69768',
        },
        mediaType: 'video',
      },
      columnAlignment: 'media-text',
    },
  },
  {
    name: 'Media - Text (Video - Youtube)',
    props: {
      heading: 'Donec posuere vulputate arcu',
      headingAlignment: 'center',
      textColumn: {
        text: 'Lorem ipsum dolor sit amet, consetetur elitr, sediam. Lorem ipsum dolor sit amet, con setetur sadipscing elitr, sed diam.',
        textAlignment: 'center',
        button: {
          text: 'Button',
          link: '/',
        },
        buttonAlignment: 'center',
      },
      mediaColumn: {
        image: {
          url: 'assets/images/teaserSingle/example.jpg',
          alt: 'example.jpg',
        },
        video: {
          posterImage: 'assets/images/EmbeddedVideo/example.jpg',
          src: 'https://www.youtube.com/watch?v=a3ICNMQW7Ok',
        },
        mediaType: 'video',
      },
      columnAlignment: 'media-text',
    },
  },
]
