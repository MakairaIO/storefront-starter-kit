import { Text } from '../../'

export default function Answer(props) {
  const { type } = props

  if (type === 'range') return <AnswerRange {...props} />

  if (type === 'rangeText') return <AnswerRangeText {...props} />

  if (type === 'text' || type === 'image') return <AnswerText {...props} />

  throw new Error('This type does not exist')
}

function AnswerRange(props) {
  const {
    rangeNumberOptions: { min, max },
  } = props

  return (
    <Text element="p">
      {min} - {max}
    </Text>
  )
}

function AnswerRangeText(props) {
  const {
    rangeNumberOptions: { min, max },
  } = props

  return (
    <Text element="p">
      {min} - {max}
    </Text>
  )
}

function AnswerText(props) {
  const { textOptions } = props

  return (
    <div className="filters-list__question__text-content__list-options">
      {textOptions.map((option) => (
        <Text key={option.uuid}>{option.title}</Text>
      ))}
    </div>
  )
}
