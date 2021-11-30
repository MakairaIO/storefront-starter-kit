export default [
  {
    name: 'Primary',
    props: {
      children: 'Discover this',
      variant: 'primary',
    },
  },
  {
    name: 'Primary (disabled)',
    props: {
      children: 'Discover this',
      variant: 'primary',
      disabled: true,
    },
  },
  {
    name: 'Primary Alternative - max. 1 per page',
    props: {
      children: 'Add to cart',
      variant: 'primary-alt',
    },
  },
  {
    name: 'Primary Alternative (disabled)',
    props: {
      children: 'Add to cart',
      variant: 'primary-alt',
      disabled: true,
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
    name: 'Secondary (disabled)',
    props: {
      children: 'Discover this',
      variant: 'secondary',
      disabled: true,
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
    name: 'Tertiary',
    props: {
      children: 'Reset filters',
      variant: 'tertiary',
    },
  },
  {
    name: 'Tertiary (disabled)',
    props: {
      children: 'Reset filters',
      variant: 'tertiary',
      disabled: true,
    },
  },
  {
    name: 'Link Button',
    props: {
      variant: 'link',
      children: 'Reset filters',
    },
  },
  {
    name: 'Link Button (disabled)',
    props: {
      variant: 'link',
      children: 'Reset filters',
      disabled: true,
    },
  },
  {
    name: 'Link Button with icon left',
    props: {
      children: 'Reset filters',
      icon: 'ban',
      variant: 'link',
      iconPosition: 'left',
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
    name: 'Icon Button (disabled)',
    props: {
      variant: 'icon-only',
      icon: 'bars',
      disabled: true,
    },
  },
  {
    name: 'Link-Icon Button',
    props: {
      variant: 'link-icon',
      icon: 'times',
    },
  },
  {
    name: 'Link-Icon Button (disabled)',
    props: {
      variant: 'link-icon',
      icon: 'times',
      disabled: true,
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
