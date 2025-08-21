import classNames from 'classnames'
import { Text } from '..'

function Tags({ tags }) {
  return (
    <ul className="tags">
      {tags.map((tag) => {
        const classes = classNames('tag', `${tag.type}`)
        return (
          <Text key={tag.text} className={classes} element="li" size="charlie">
            {tag.text}
          </Text>
        )
      })}
    </ul>
  )
}

export default Tags
export { default as tagsVariants } from './variants.js'
