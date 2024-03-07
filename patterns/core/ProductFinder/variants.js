export default [
  {
    name: 'Default',
    props: {
      streamID: '1234',
      questions: [
        {
          title: 'Single choice question with text',
          type: 'singleChoice',
          isOptional: true,
          options: [
            {
              type: 'text',
              label: 'Text single option 1',
              value: 'textSingle1',
            },
            {
              type: 'text',
              label: 'Text single option 2',
              value: 'textSingle2',
            },
          ],
        },
        {
          title: 'Single choice question with image',
          type: 'singleChoice',
          isOptional: true,
          options: [
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1708806016675-dac47ebc8459?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              label: 'Image single option 1',
              value: 'imgSingle1',
            },
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              label: 'Image single option 2',
              value: 'imgSingle2',
            },
          ],
        },
        {
          title: 'Multiple choice with text',
          type: 'multipleChoice',
          isOptional: true,
          options: [
            { type: 'text', label: 'Text multi option 1', value: 'textMulti1' },
            { type: 'text', label: 'Text multi option 2', value: 'textMulti2' },
          ],
        },
        {
          title: 'Multiple choice with image',
          type: 'multipleChoice',
          isOptional: true,
          options: [
            {
              type: 'image',
              src: 'https://plus.unsplash.com/premium_photo-1676823570926-238f23020786?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              label: 'Image single option 1',
              value: 'imgSingle1',
            },
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              label: 'Image single option 2',
              value: 'imgSingle2',
            },
          ],
        },

        {
          title: 'Range with number',
          type: 'range',
          isOptional: true,
          min: 50,
          max: 300,
          step: 10,
        },
        {
          title: 'Range with steps',
          type: 'range',
          isOptional: true,
          steps: [
            'hello world',
            'foo',
            'bar',
            'baz',
            'foobar',
            // 'abc'
          ],
          min: 'hello',
          max: 'baz',
        },
      ],
    },
  },
]
