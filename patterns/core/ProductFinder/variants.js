export default [
  {
    name: 'Default',
    props: {
      streamID: '1234',
      questions: [
        {
          title: 'Single choice question with text',
          type: 'text',
          isOptional: true,
          field: {
            id: 'attributeStr::16fd55d02a23f31097ca58eccfeec97c',
            type: 'nested',
            title: 'AttributeStr :: Farbe  (VarSelect)',
          },
          textOptions: [
            {
              title: 'Text single option 1',
              filter: {
                value: 'textSingle1',
                operator: 'like',
              },
              uuid: '03739705-e527-41f5-bcc8-cbd956c26d7c',
            },
            {
              title: 'Text single option 2',
              filter: {
                value: 'textSingle2',
                operator: 'like',
              },
              uuid: '03739705-e527-41f5-bcc8-cbd956c26d7d',
            },
            {
              title: 'Text single option 3',
              filter: {
                value: 'textSingle3',
                operator: 'like',
              },
              uuid: '03739705-e527-41f5-bcc8-cbd956c26d7e',
            },
            {
              title: 'Text single option 4',
              filter: {
                value: 'textSingle4',
                operator: 'like',
              },
              uuid: '03739705-e527-41f5-bcc8-cbd956c26d7f',
            },
          ],
          handleClick: () => alert('Hello World'),
        },
        {
          title: 'Single choice question with image',
          type: 'image',
          isOptional: true,
          field: {
            id: 'attributeStr::16fd55d02a23f31097ca58eccfeec97c',
            type: 'nested',
            title: 'AttributeStr :: Farbe  (VarSelect)',
          },
          textOptions: [
            {
              image:
                'https://images.unsplash.com/photo-1708806016675-dac47ebc8459?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              title: 'Image single option 1',
              filter: {
                value: 'imgSingle1',
                operator: 'like',
              },
              uuid: '13739705-e527-41f5-bcc8-cbd956c26d7c',
            },
            {
              image:
                'https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              title: 'Image single option 2',
              filter: {
                value: 'imgSingle2',
                operator: 'like',
              },
              uuid: '23739705-e527-41f5-bcc8-cbd956c26d7c',
            },
            {
              image:
                'https://images.unsplash.com/photo-1708806016675-dac47ebc8459?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              title: 'Image single option 3',
              filter: {
                value: 'imgSingle3',
                operator: 'like',
              },
              uuid: '33739705-e527-41f5-bcc8-cbd956c26d7c',
            },
            {
              image:
                'https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              title: 'Image single option 4',
              filter: {
                value: 'imgSingle4',
                operator: 'like',
              },
              uuid: '43739705-e527-41f5-bcc8-cbd956c26d7c',
            },
          ],
        },
        {
          title: 'Multiple choice with text',
          type: 'text',
          field: {
            id: 'attributeStr::16fd55d02a23f31097ca58eccfeec97c',
            type: 'nested',
            title: 'AttributeStr :: Farbe  (VarSelect)',
          },
          isOptional: true,
          multipleChoice: true,
          textOptions: [
            {
              title: 'Text multi option 1',
              filter: {
                value: 'textMulti1',
                operator: 'like',
              },
              uuid: '01739705-e527-41f5-bcc8-cbd956c26d7c',
            },
            {
              title: 'Text multi option 2',
              filter: {
                value: 'textMulti2',
                operator: 'like',
              },
              uuid: '02739705-e527-41f5-bcc8-cbd956c26d7d',
            },
            {
              title: 'Text multi option 3',
              filter: {
                value: 'textMulti3',
                operator: 'like',
              },
              uuid: '03739705-e527-41f5-bcc8-cbd956c26d7e',
            },
            {
              title: 'Text multi option 4',
              filter: {
                value: 'textMulti4',
                operator: 'like',
              },
              uuid: '04739705-e527-41f5-bcc8-cbd956c26d7f',
            },
          ],
        },
        {
          title: 'Multiple choice with image',
          type: 'image',
          field: {
            id: 'attributeStr::16fd55d02a23f31097ca58eccfeec97c',
            type: 'nested',
            title: 'AttributeStr :: Farbe  (VarSelect)',
          },
          isOptional: true,
          multipleChoice: true,
          textOptions: [
            {
              image:
                'https://plus.unsplash.com/premium_photo-1676823570926-238f23020786?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              title: 'Image single option 1',
              filter: {
                value: 'imgSingle1',
                operator: 'like',
              },
              uuid: '03739705-e527-41f5-bcc8-cbd956c26d7c',
            },
            {
              image:
                'https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              title: 'Image single option 2',
              filter: {
                value: 'imgSingle2',
                operator: 'like',
              },
              uuid: '03739705-e527-41f5-bcc8-cbd956c26d7c',
            },
            {
              image:
                'https://plus.unsplash.com/premium_photo-1676823570926-238f23020786?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              title: 'Image single option 3',
              filter: {
                value: 'imgSingle3',
                operator: 'like',
              },
              uuid: '03739705-e527-41f5-bcc8-cbd956c26d7c',
            },
            {
              image:
                'https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D',
              alt: 'Img',
              title: 'Image single option 4',
              filter: {
                value: 'imgSingle4',
                operator: 'like',
              },
              uuid: '03739705-e527-41f5-bcc8-cbd956c26d7c',
            },
          ],
        },
        {
          type: 'rangeNumber',
          uuid: '2def65c9-f96b-4fc7-92f7-382fa6b98626',
          field: { id: 'price', type: 'double', title: 'price' },
          title: 'Komm mit hunderten Yukos',
          isOptional: true,
          multipleChoice: true,
          rangeNumberOptions: {
            max: 100,
            min: 0,
            step: 10,
            uuid: '04f379ed-04a0-4549-8ce8-e261e21ccd6f',
          },
        },
        {
          type: 'rangeText',
          uuid: '22e5480b-b830-47b3-a0c3-fced11281cc8',
          field: { id: 'price', type: 'double', title: 'price' },
          title: 'und verbrenne dein Dorf',
          isOptional: true,
          textOptions: [
            {
              uuid: 'de685797-87a1-4a03-95bb-3e4b3fec6207',
              image: '',
              title: 'Yes',
              filter: { value: '10', operator: 'gte' },
            },
            {
              uuid: '50ca19cc-a60c-42e7-834e-aed3ba1be228',
              image: '',
              title: 'Nog',
              filter: { value: '10', operator: 'lte' },
            },
            {
              uuid: '50c19cc-a60c-42e7-834e-aed3ba1be228',
              image: '',
              title: 'Maybe?',
              filter: { value: '105', operator: 'lte' },
            },
          ],
        },
      ],
    },
  },
]
