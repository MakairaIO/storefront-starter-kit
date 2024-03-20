export default [
  {
    name: 'Default',
    props: {
      streamID: '1234',
      questions: [
        {
          uuid: '0',
          title: 'Single choice question with text',
          type: 'text',
          multipleChoice: false,
          isOptional: true,
          textOptions: [
            {
              uuid: '1234',
              title: 'Text single option 1',
              filter: {
                operator: '',
                value: '',
              },
            },
          ],
        },
        {
          uuid: '1',
          title: 'Single choice question with image',
          type: 'image',
          multipleChoice: false,
          isOptional: true,
          textOptions: [
            {
              uuid: '1238',
              title: 'Image single option 1',
              image:
                'https://images.unsplash.com/photo-1708806016675-dac47ebc8459?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              filter: {
                operator: '',
                value: '',
              },
            },
          ],
        },
        {
          uuid: '2',
          title: 'Multiple choice with text',
          type: 'text',
          multipleChoice: true,
          isOptional: true,
          textOptions: [
            {
              uuid: '1235',
              title: 'Text single option 1',
              filter: {
                operator: '',
                value: '',
              },
            },
            {
              uuid: '1236',
              title: 'Text single option 2',
              filter: {
                operator: '',
                value: '',
              },
            },
            {
              uuid: '1237',
              title: 'Text single option 3',
              filter: {
                operator: '',
                value: '',
              },
            },
          ],
        },
        {
          uuid: '3',
          title: 'Multiple choice with image',
          type: 'image',
          multipleChoice: true,
          isOptional: false,
          textOptions: [
            {
              uuid: '1242',
              title: 'Image multi option 1',
              image:
                'https://images.unsplash.com/photo-1708806016675-dac47ebc8459?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              filter: {
                operator: '',
                value: '',
              },
            },
            {
              uuid: '1243',
              title: 'Image multi option 2',
              image:
                'https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              filter: {
                operator: '',
                value: '',
              },
            },
            {
              uuid: '1244',
              title: 'Image multi option 3',
              image:
                'https://images.unsplash.com/photo-1708806016675-dac47ebc8459?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              filter: {
                operator: '',
                value: '',
              },
            },
            {
              uuid: '1245',
              title: 'Image multi option 4',
              image:
                'https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              filter: {
                operator: '',
                value: '',
              },
            },
          ],
        },

        {
          uuid: '4',
          title: 'Range with number',
          type: 'range',
          isOptional: true,
          multipleChoice: false,
          rangeNumberOptions: { uuid: '1246', min: 50, max: 300, step: 10 },
        },
        {
          uuid: '5',
          title: 'Range with steps',
          type: 'range',
          isOptional: true,
          multipleChoice: false,
          rangeNumberOptions: {
            uuid: '1247',
            steps: [
              'hello world',
              'foo',
              'bar',
              'baz',
              'foobar',
              // 'abc'
            ],
            min: 'foo',
            max: 'baz',
          },
        },
      ],
    },
  },
]
