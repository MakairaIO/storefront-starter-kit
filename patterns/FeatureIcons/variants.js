export default [
  {
    name: 'Default',
    props: {
      text: {
        heading: 'Praesent congue erat at massa',
        content:
          'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Aenean viverra rhoncus pede. Etiam ultricies nisi vel augue.',
      },
      rows: [
        {
          uuid: 1,
          columns: [
            {
              uuid: 3,
              text: {
                heading: 'Praesent congue erat at massa',
                content:
                  'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Aenean viverra rhoncus pede. Etiam ultricies nisi vel augue.',
              },
              image: {
                url: 'assets/images/brands/logo-k2.png',
                alt: 'k2',
              },
            },
            {
              uuid: 5,
              text: {
                heading: 'Praesent congue erat at massa',
                content:
                  'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Aenean viverra rhoncus pede. Etiam ultricies nisi vel augue.',
              },
              icon: { symbol: 'cart' },
              link: '/test',
            },
          ],
        },
        {
          uuid: 2,
          columns: [
            {
              uuid: 4,
              text: {
                heading: 'Praesent congue erat at massa',
                content:
                  'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Aenean viverra rhoncus pede. Etiam ultricies nisi vel augue.',
              },
              icon: { symbol: 'user', color: 'teal' },
            },
            {
              uuid: 6,
              text: {
                heading: 'Praesent congue erat at massa',
                content:
                  'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Aenean viverra rhoncus pede. Etiam ultricies nisi vel augue.',
              },
              icon: { symbol: 'heart', color: 'sunny' },
            },
          ],
        },
      ],
    },
  },
]
