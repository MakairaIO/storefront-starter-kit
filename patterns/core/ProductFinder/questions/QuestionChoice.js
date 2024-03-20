import { useState } from 'react'
import classNames from 'classnames'
import { Text, Button, Image } from '../../..'
import SubmitButtons from './SubmitButtons'

export default function QuestionChoice(props) {
  const {
    options,
    type: questionType,
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
  } = props

  const [value, setValue] = useState(
    questionType === 'singleChoice' ? undefined : []
  )

  const handleChange = (e, option) => {
    if (e.target.checked)
      setValue(
        questionType === 'singleChoice'
          ? option.value
          : [...value, option.value]
      )
    else
      setValue(
        questionType === 'singleChoice'
          ? undefined
          : value.filter((v) => v !== option.value)
      )
  }

  const handleSubmit = () => {
    // if (handleClick)
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
        {options.map((option) => (
          <label
            htmlFor={option.value}
            className={classNames(
              'product-finder__question-container__choice',
              option.type === 'image' ? 'img-choice' : 'text-choice'
            )}
            key={option.value}
          >
            <input
              type={questionType === 'singleChoice' ? 'radio' : 'checkbox'}
              name={title}
              id={option.value}
              value={option.value}
              onChange={(e) => handleChange(e, option)}
            />

            {option.type === 'image' ? (
              <>
                <Image
                  alt={option.alt}
                  options={{
                    desktop: { source: option.src, width: '100%' },
                    mobile: {},
                  }}
                />
                <Text>{option.label}</Text>
              </>
            ) : (
              option.label
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
