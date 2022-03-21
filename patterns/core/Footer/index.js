function Footer(props) {
  const { footerData = [] } = props
  return (
    <section className="footer">
      {footerData.map((column, i) => {
        const { heading = '', links = [] } = column
        return (
          <div className="footer__column" key={`footer__heading-${i}`}>
            <h4 className="footer__heading">{heading}</h4>
            {links.map((link, y) => (
              <a
                className="footer__link"
                key={`footer__link-${y}`}
                href={link.link}
              >
                {link.text}
              </a>
            ))}
          </div>
        )
      })}
      <a href="https://www.vecteezy.com/free-vector/jump">Jump Vectors by Vecteezy</a>
    </section>
  )
}

export default Footer
export { default as footerVariants } from './variants.js'
