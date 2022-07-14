export default [
  {
    name: 'Only Categories',
    props: {
      breadcrumb: [
        { text: 'Demo1', link: '/' },
        { text: 'Demo2', link: '/' },
        { text: 'Demo3', link: '/' },
      ],
    },
  },
  {
    name: 'Categories with Product',
    props: {
      breadcrumb: [
        { text: 'Demo1', link: '/' },
        { text: 'Demo2', link: '/' },
        { text: 'Demo3', link: '/' },
      ],
      product: { title: 'Product', url: '/' },
    },
  },
  {
    name: 'Only Product',
    props: {
      product: { title: 'Product', url: '/' },
    },
  },
]
