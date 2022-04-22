export default [
  {
    name: 'Primary',
    props: {
      children: 'Discover this',
      variant: 'primary',
    },
  },
  {
    name: 'Primary Alternative',
    props: {
      children: 'Add to cart',
      variant: 'primary-alt',
    },
  },
  {
    name: 'Secondary',
    props: {
      children: 'Discover this',
      variant: 'secondary',
    },
  },
  {
    name: 'Secondary with icon right',
    props: {
      children: 'Discover this',
      icon: 'chevron-right',
      variant: 'secondary',
    },
  },
  {
    name: 'Secondary with icon left',
    props: {
      children: 'Discover this',
      icon: 'chevron-left',
      iconPosition: 'left',
      variant: 'secondary',
    },
  },
  {
    name: 'Icon Button',
    props: {
      variant: 'icon-only',
      icon: 'bars',
    },
  },
  {
    name: 'Secondary loading',
    props: {
      children: 'Discover this',
      variant: 'secondary',
      loading: true,
    },
  },
  {
    name: 'Primary loading',
    props: {
      children: 'Discover this',
      variant: 'primary',
      loading: true,
    },
  },
  {
    name: 'Icon only loading',
    props: {
      variant: 'icon-only',
      icon: 'bars',
      loading: true,
    },
  },
]
