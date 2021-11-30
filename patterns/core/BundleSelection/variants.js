export default [
  {
    name: 'Default',
    props: {
      params: {},
      config: {
        slots: [
          {
            id: 's1',
            content: {
              button_text: 'Edit slot',
              title: 'Bundle title',
            },
            required: true,
            product: null,
          },
          {
            id: 's2',
            content: {
              button_text: 'Edit slot',
              title: 'Bundle title',
            },
            required: true,
            product: null,
          },
          {
            id: 's3',
            content: {
              button_text: 'Edit slot',
              title: 'Bundle title',
            },
            required: true,
            product: null,
          },
        ],
        currentSlot: 's1',
        isComplete: false,
      },
    },
  },
]
