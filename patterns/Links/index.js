import classnames from 'classnames'

import { ConditionalLink } from '..'
import { useRouter } from 'next/router'

function Link({ href, title, active = false }) {
  return (
    <ConditionalLink
      fallbackElement="button"
      href={href}
      className={classnames('links__link', {
        'links__link--active': active,
      })}
    >
      {title}
    </ConditionalLink>
  )
}

function Links({ links = [], color = 'teal' }) {
  const router = useRouter()

  return (
    <section className={classnames('links', `links--${color}`)}>
      {links.map((link) => (
        <Link {...link} key={link.href} active={link.href === router?.asPath} />
      ))}
    </section>
  )
}

export default Links
export { default as linksVariants } from './variants.js'
