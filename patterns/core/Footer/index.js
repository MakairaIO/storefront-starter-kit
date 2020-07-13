function Footer(props) {
  const { footerColumns = [] } = props
  return (
    <section className="footer">
      {footerColumns.map((column, i) => {
        const { heading = '', links = [] } = column
        return (
          <div className="footer-column" key={`footer-heading-${i}`}>
            <h4 className="footer-heading">{heading}</h4>
            {links.map((link, y) => (
              <a
                className="footer-link"
                key={`footer-link-${y}`}
                href={link.link}
              >
                {link.text}
              </a>
            ))}
          </div>
        )
      })}
    </section>
  )
}

export default Footer
export { default as footerVariants } from './variants.js'
