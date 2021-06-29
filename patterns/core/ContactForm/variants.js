export default [
  {
    name: 'Default',
    props: {
      recipient: 'test@gmail.com',
    },
  },
  {
    name: 'No recipient, always return false',
    props: {
      recipient: '',
    },
  },
]
