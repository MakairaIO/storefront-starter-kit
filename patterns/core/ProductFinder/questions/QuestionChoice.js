import { useState } from 'react'
import classNames from 'classnames'
import { Text, Button, Image } from '../../..'
import SubmitButtons from './SubmitButtons'
// 'range' | 'rangeText' | 'text' | 'image'
export default function QuestionChoice(props) {
  const {
    textOptions,
    title,
    stepNumber,
    setStepNumber,
    answers,
    setAnswers,
    isOptional,
    maxQuestion,
    handlePrevious,
    handleNoMoreResults,
    handleClick,
    multipleChoice,
    type: questionType,
  } = props

  const [value, setValue] = useState(!multipleChoice ? undefined : [])

  const handleChange = (e, option) => {
    if (e.target.checked)
      setValue(
        !multipleChoice ? option.filter.value : [...value, option.filter.value]
      )
    else
      setValue(
        !multipleChoice
          ? undefined
          : value.filter((v) => v !== option.filter.value)
      )
  }

  const handleSubmit = () => {
    handleClick?.()

    if (stepNumber === maxQuestion) {
      handleNoMoreResults()
      return
    }

    setStepNumber(stepNumber + 1)
    setAnswers([...answers, { questionTitle: title, value }])
  }

  return (
    <>
      <div className="product-finder__question-container">
        {textOptions.map((option) => (
          <label
            htmlFor={option.uuid}
            className={classNames(
              'product-finder__question-container__choice',
              option.type === 'image' ? 'img-choice' : 'text-choice'
            )}
            key={option.uuid}
          >
            <input
              type={multipleChoice ? 'radio' : 'checkbox'}
              name={option.uuid}
              id={option.uuid}
              value={option.filter.value}
              onChange={(e) => handleChange(e, option)}
            />

            {questionType === 'image' ? (
              <>
                <Image
                  alt={option.alt}
                  options={{
                    desktop: { source: option.image, width: '100%' },
                    mobile: {},
                  }}
                />
                <Text>{option.title}</Text>
              </>
            ) : (
              option.title
            )}
          </label>
        ))}
      </div>

      {isOptional && stepNumber !== maxQuestion && (
        <div className="product-finder__skip-container">
          <Button
            onClick={() => {
              if (handleClick) handleClick()

              setStepNumber(stepNumber + 1)
            }}
          >
            Skip
          </Button>
        </div>
      )}

      <SubmitButtons
        stepNumber={stepNumber}
        maxQuestion={maxQuestion}
        handlePrevious={handlePrevious}
        handleSubmit={handleSubmit}
        disabled={!value || !value.length}
      />
    </>
  )
}
