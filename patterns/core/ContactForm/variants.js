export default [
  {
    name: 'Default',
    props: {
      recipient: 'support@makaira.io',
    },
  },
  {
    name: 'No recipient, always return false',
    props: {
      recipient: '',
    },
  },
]
