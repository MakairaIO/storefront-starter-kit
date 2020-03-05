export default [
  {
    name: 'Default',
    props: {
      children: 'Discover this',
    },
  },
  {
    name: 'Default with icon right',
    props: {
      children: 'Discover this',
      icon: 'chevron-right',
    },
  },
  {
    name: 'Default with icon left',
    props: {
      children: 'Discover this',
      icon: 'chevron-left',
      iconPosition: 'left',
    },
  },
  {
    name: 'Default as Link',
    props: {
      children: 'Discover this',
      href: '#todo',
    },
  },
  {
    name: 'Primary',
    props: {
      children: 'Add to cart',
      type: 'primary',
    },
  },
  {
    name: 'Secondary',
    props: {
      children: 'Abort',
      type: 'secondary',
    },
  },
]
