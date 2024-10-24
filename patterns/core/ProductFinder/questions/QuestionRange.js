import { useState } from 'react'
import Slider from 'rc-slider'
import { useMaxWidth, useTranslation } from '../../../../utils'
import SubmitButtons from './SubmitButtons'
import { roundToNearestLegalValue } from './roundToNearestLegalValue'

export default function QuestionRange(props) {
  const {
    answers,
    setAnswers,
    title,
    stepNumber,
    setStepNumber,
    maxQuestion,
    handlePrevious,
    handleNoMoreResults,
    handleClick,
    type: questionType,
    rangeNumberOptions = {},
    textOptions = {},
  } = props
  const { language } = useTranslation()
  const { min, max, step } = rangeNumberOptions

  const isMobile = useMaxWidth(600)

  const [value, setValue] = useState(
    questionType === 'rangeText'
      ? textOptions[language][
          Math.round((textOptions[language].length - 1) / 2)
        ]
      : roundToNearestLegalValue((min + max) / 2, step)
  )

  const handleSubmit = () => {
    handleClick?.()

    if (stepNumber === maxQuestion) {
      handleNoMoreResults()
      return
    }
    setAnswers([...answers, { questionTitle: title[language], value }])
    setStepNumber(stepNumber + 1)
  }

  return (
    <>
      <div className="product-finder__question-container__stepper">
        {questionType === 'rangeText' ? (
          <Slider
            min={0}
            max={textOptions[language].length - 1}
            marks={textOptions[language].map((option) => option.title)}
            step={1}
            value={textOptions[language].findIndex(
              (option) => option.uuid === value.uuid
            )}
            onChange={(e) => setValue(textOptions[language][e])}
            vertical={isMobile} // TODO: fix mobile version
          />
        ) : (
          <Slider
            min={min}
            max={max}
            marks={{ [Number(min)]: min, [Number(max)]: max }}
            step={step}
            defaultValue={value}
            onChange={(e) => setValue(e)}
          />
        )}
      </div>

      <SubmitButtons
        stepNumber={stepNumber}
        maxQuestion={maxQuestion}
        handlePrevious={handlePrevious}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
