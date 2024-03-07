import { Text } from '../../..'
import QuestionRange from './QuestionRange'
import QuestionChoice from './QuestionChoice'

export default function Question(props) {
  const {
    title,
    isActive,
    options,
    maxQuestion,
    stepNumber,
    setStepNumber,
    answers,
    setAnswers,
  } = props

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
        {title}
      </Text>

      {options ? (
        <QuestionChoice
          options={options}
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
