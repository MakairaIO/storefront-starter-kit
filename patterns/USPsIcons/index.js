import classname from 'classnames'

import { Heading } from '..'
import ColumnItem from './ColumnItem'

function USPsIcons(props) {
  const {
    title,
    styles = {},
    columns = [],
    anchorId = '',
    theme = 'none',
    reduceTopSpace,
    reduceMaxWidth,
    alignment,
  } = props

  const sectionClass = classname('pattern usps-icons', {
    [`usps-icons__theme--${theme}`]: theme,
    'usps-icons__reduce-top-space': reduceTopSpace,
    [`usps-icons__alignment--${alignment}`]: alignment,
  })

  const titleClass = classname('usps-icons__title')
  const contentClass = classname('usps-icons__content', {
    'usps-icons__reduce-max-width': reduceMaxWidth,
  })
  return (
    <section id={anchorId} className={sectionClass}>
      <div className={contentClass}>
        <Heading level={0} className={titleClass}>
          {title}
        </Heading>
        <div
          className={classname({
            'usps-icons__columns': true,
            '--single-column': styles.single_column,
          })}
        >
          {columns.map((column, index) => (
            <ColumnItem rows={column.rows} key={`column-${index}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default USPsIcons
export { default as uSPsIconsVariants } from './variants.js'
