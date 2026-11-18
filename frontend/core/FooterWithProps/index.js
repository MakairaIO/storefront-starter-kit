import { Footer } from '../../../patterns'

export default function FooterWithProps() {
  // use mock data for now
  const footerData = [
    {
      heading: 'Shop',
      links: [
        {
          text: 'New arrivals',
          link: '#todo',
        },
        {
          text: 'Sale',
          link: '#todo',
        },
        {
          text: 'Brands',
          link: '#todo',
        },
        {
          text: 'Gift cards',
          link: '#todo',
        },
      ],
    },
    {
      heading: 'Service',
      links: [
        {
          text: 'Shipping',
          link: '#todo',
        },
        {
          text: 'Returns',
          link: '#todo',
        },
        {
          text: 'Payment methods',
          link: '#todo',
        },
        {
          text: 'FAQ',
          link: '#todo',
        },
      ],
    },
    {
      heading: 'Company',
      links: [
        {
          text: 'About us',
          link: '#todo',
        },
        {
          text: 'Contact',
          link: '#todo',
        },
        {
          text: 'Careers',
          link: '#todo',
        },
        {
          text: 'Blog',
          link: '#todo',
        },
      ],
    },
    {
      heading: 'Legal',
      links: [
        {
          text: 'Imprint',
          link: '#todo',
        },
        {
          text: 'Privacy policy',
          link: '#todo',
        },
        {
          text: 'Terms & conditions',
          link: '#todo',
        },
      ],
    },
  ]

  const footerProps = {
    footerData,
  }

  return <Footer {...footerProps} />
}
