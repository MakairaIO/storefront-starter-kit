export { colorConfig, fontConfig }

let colorConfig = [
  {
    name: 'Primärfarbe',
    value: '#64B4C7',
    variable: '--primary-color',
  },
  {
    name: 'Sekundärfarbe',
    value: '#E96E67',
    variable: '--secondary-color',
  },
  {
    name: 'Tertiärfarbe',
    value: '#F8CF66',
    variable: '--tertiary-color',
  },
  {
    name: 'Akzentfarbe 1',
    value: '#FADEA6',
    variable: '--accent-color-1',
  },
  {
    name: 'Akzentfarbe 2',
    value: '#FDF7E0',
    variable: '--accent-color-2',
  },
  {
    name: 'Textfarbe',
    value: '#292929',
    variable: '--text-color-dark',
  },
  {
    name: 'Fehlerfarbe',
    value: 'red',
    variable: '--color-error',
  },
  {
    name: 'Akzenttextfarbe',
    value: '#612F4C',
    variable: '--accent-text-color',
  },
  {
    name: 'Black',
    value: '#292929',
    variable: '--color-light-black',
  },
]
let fontConfig = [
  {
    name: 'MyriadPro-Regular',
    value: {
      fontFamily: 'MyriadPro-Regular, sans-serif',
    },
    variable: '--font-family-regular',
    sizes: ['10px', '14px', '16px', '18px', '28px'],
  },
  {
    name: 'MyriadPro-Bold',
    value: {
      fontFamily: 'MyriadPro-Bold, sans-serif',
    },
    variable: '--font-family-bold',
    sizes: ['10px', '14px', '16px', '18px', '28px'],
  },
  {
    name: 'MyriadPro-Black',
    value: {
      fontFamily: 'MyriadPro-Black, sans-serif',
    },
    variable: '--font-family-black',
    sizes: ['10px', '14px', '16px', '18px', '28px'],
  },
]
let breakpointConfig = [
  {
    name: 'XS',
    value: 576,
    variable: '--screen-max-width-xs',
  },
  {
    name: 'SM',
    value: 768,
    variable: '--screen-max-width-sm',
  },
  {
    name: 'MD',
    value: 992,
    variable: '--screen-max-width-md',
  },
  {
    name: 'LG',
    value: 1200,
    variable: '--screen-max-width-lg',
  },
  {
    name: 'XL',
    value: 1436,
    variable: '--screen-max-width-xl',
  },
]
function setCSSVariables() {
  colorConfig.forEach(color => {
    document.querySelectorAll(':root').forEach(element => {
      element.style.setProperty(color.variable, color.value)
    })
  })
  fontConfig.forEach(font => {
    document.querySelectorAll(':root').forEach(element => {
      element.style.setProperty(font.variable, font.value.fontFamily)
    })
  })
  breakpointConfig.forEach(breakpoint => {
    document.querySelectorAll(':root').forEach(element => {
      element.style.setProperty(
        breakpoint.variable + '-min',
        breakpoint.value + 'px'
      )
      element.style.setProperty(
        breakpoint.variable + '-max',
        breakpoint.value - 1 + 'px'
      )
    })
  })
}
// Document is loaded
if (typeof window !== 'undefined') {
  setCSSVariables()
}
