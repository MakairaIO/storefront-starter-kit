export default [
  {
    name: 'Default',
    props: {
      heading: {
        pre: 'Deal of the Day',
        text: 'Buy 3 and get a 4th for free',
      },
      content: {
        text:
          'We are so happy to bring this popular deal back to our most local customers! The rebate will be applied automatically in the cart upon checkout!',
        button: {
          isVisible: true,
          text: 'Discover this',
          link: '',
        },
      },
    },
  },
  {
    name: 'Inverted',
    props: {
      variant: 'inverted',
      heading: {
        pre: 'Deal of the Day',
        text: 'Buy 3 and get a 4th for free',
      },
      content: {
        text:
          'We are so happy to bring this popular deal back to our most local customers! The rebate will be applied automatically in the cart upon checkout!',
        button: {
          isVisible: true,
          text: 'Discover this',
          link: '#todo',
        },
      },
    },
  },
  {
    name: 'No Button, No Pre-Title',
    props: {
      heading: {
        pre: '',
        text: 'Buy 3 and get a 4th for free',
      },
      content: {
        text:
          'We are so happy to bring this popular deal back to our most local customers! The rebate will be applied automatically in the cart upon checkout!',
        button: {
          isVisible: false,
          text: '',
          link: '',
        },
      },
    },
  },
]
