export default [
  {
    name: 'Minimal with no label',
    props: {
      id: 'sorting',
      name: 'sorting',
      value: 'priceDesc',
      options: [
        {
          label: 'Relevanz',
          value: 'custom',
        },
        {
          label: 'Niedrigster Preis',
          value: 'priceAsc',
        },
        {
          label: 'Höchster Preis',
          value: 'priceDesc',
        },
        {
          label: 'Titel absteigend',
          value: 'titleDesc',
        },
        {
          label: 'Titel aufsteigen',
          value: 'titleAsc',
        },
      ],
      onChange: (selected) => console.log(selected),
    },
  },
  {
    name: 'With visible Label',
    props: {
      id: 'sorting',
      name: 'sorting',
      value: 'm',
      label: 'Size',
      options: [
        {
          label: 'S',
          value: 's',
        },
        {
          label: 'M',
          value: 'm',
        },
        {
          label: 'L',
          value: 'l',
        },
        {
          label: 'XL',
          value: 'xl',
        },
        {
          label: 'XXL',
          value: 'xxl',
        },
      ],
      onChange: (selected) => console.log(selected),
    },
  },
]
