export default [
  {
    name: '1 column left',
    props: {
      data: [
        {
          heading: 'Donec posuere vulputate arcu 1',
          headingAlignment: 'left',
          text: 'Lorem ipsum dolor sit amet, consetetur elitr, sediam. Lorem ipsum dolor sit amet, con setetur sadipscing elitr, sed diam.',
          textAlignment: 'left',
          button: {
            text: 'Button',
            link: 'www.example.com',
          },
          buttonAlignment: 'left',
        },
      ],
    },
  },
  {
    name: '1 column right',
    props: {
      data: [
        {
          heading: 'Donec posuere vulputate arcu 1',
          headingAlignment: 'right',
          text: 'Lorem ipsum dolor sit amet, consetetur elitr, sediam. Lorem ipsum dolor sit amet, con setetur sadipscing elitr, sed diam.',
          textAlignment: 'right',
          button: {
            text: 'Button',
            link: 'www.example.com',
          },
          buttonAlignment: 'right',
        },
      ],
    },
  },
  {
    name: '1 column center',
    props: {
      data: [
        {
          heading: 'Donec posuere vulputate arcu 1',
          headingAlignment: 'center',
          text: 'Lorem ipsum dolor sit amet, consetetur elitr, sediam. Lorem ipsum dolor sit amet, con setetur sadipscing elitr, sed diam.',
          textAlignment: 'center',
          button: {
            text: 'Button',
            link: 'www.example.com',
          },
          buttonAlignment: 'center',
        },
      ],
    },
  },
  {
    name: '2 columns',
    props: {
      data: [
        {
          heading: 'Donec posuere vulputate arcu 1',
          headingAlignment: 'right',
          text: 'Lorem ipsum dolor sit amet, consetetur elitr, sediam. Lorem ipsum dolor sit amet, con setetur sadipscing elitr, sed diam.',
          textAlignment: 'right',
          button: {
            text: 'Button',
            link: 'www.example.com',
          },
          buttonAlignment: 'right',
        },
        {
          heading: 'Donec posuere vulputate arcu 2',
          headingAlignment: 'left',
          text: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede <a class="external ext" href="#">link</a> mollis pretium. Integer tincidunt. Cras dapibus.  Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.  Aenean imperdiet. Etiam ultricies nisi vel augue.  Curabitur ullamcorper ultricies nisi.</p> ',
          textAlignment: 'left',
          button: {
            text: 'Button',
            link: 'www.example.com',
          },
          buttonAlignment: 'left',
        },
      ],
    },
  },
]
