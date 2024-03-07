import { Text } from '../../..'
import QuestionRange from './QuestionRange'
import QuestionChoice from './QuestionChoice'

export default function Question(props) {
  const { title, isActive, options, maxQuestion } = props
  // { questionTitle: '', value: '' }

  if (!isActive) return null

  return (
    <>
      <Text element="h4" size="cupid" className="product-finder__title">
        {title}
      </Text>

      {options ? (
        <QuestionChoice
          options={options}
          title={title}
          maxQuestion={maxQuestion}
          {...props}
        />
      ) : (
        <QuestionRange title={title} maxQuestion={maxQuestion} {...props} />
      )}
    </>
  )
}
