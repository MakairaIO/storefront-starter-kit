import { Text } from '../../..'
import QuestionRange from './QuestionRange'
import QuestionChoice from './QuestionChoice'
import { useTranslation } from '../../../../utils'

export default function Question(props) {
  const {
    title,
    isActive,
    maxQuestion,
    stepNumber,
    setStepNumber,
    answers,
    setAnswers,
    type,
  } = props

  const { language } = useTranslation()

  const handlePrevious = () => {
    setStepNumber(stepNumber - 1)
    setAnswers(answers.length === 1 ? [] : answers.slice(0, -1))
  }

  const handleNoMoreResults = () => {
    // TODO: add function when there's no more results
  }

  if (!isActive) return null

  return (
    <>
      <Text element="h4" size="cupid" className="product-finder__title">
        {title[language]}
      </Text>

      {!type.startsWith('range') ? (
        <QuestionChoice
          title={title}
          maxQuestion={maxQuestion}
          handlePrevious={handlePrevious}
          handleNoMoreResults={handleNoMoreResults}
          {...props}
        />
      ) : (
        <QuestionRange
          title={title}
          maxQuestion={maxQuestion}
          handlePrevious={handlePrevious}
          handleNoMoreResults={handleNoMoreResults}
          {...props}
        />
      )}
    </>
  )
}
