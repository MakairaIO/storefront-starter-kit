import { useState } from 'react'
import Slider from 'rc-slider'
import { useMaxWidth } from '../../../../utils'
import SubmitButtons from './SubmitButtons'
import { roundToNearestLegalValue } from './roundToNearestLegalValue'

export default function QuestionRange(props) {
  const {
    min,
    max,
    steps,
    step,
    answers,
    setAnswers,
    title,
    stepNumber,
    setStepNumber,
    maxQuestion,
    handlePrevious,
    handleNoMoreResults,
  } = props

  const isMobile = useMaxWidth(600)

  const [value, setValue] = useState(
    steps
      ? steps[Math.round((steps.length - 1) / 2)]
      : roundToNearestLegalValue((min + max) / 2, step)
  )

  const handleSubmit = () => {
    if (stepNumber === maxQuestion) {
      handleNoMoreResults()
      return
    }
    setAnswers([...answers, { questionTitle: title, value }])
    setStepNumber(stepNumber + 1)
  }

  return (
    <>
      <div className="product-finder__question-container__stepper">
        {steps ? (
          <Slider
            min={0}
            max={steps.length - 1}
            marks={Object.values(steps)}
            step={1}
            defaultValue={steps.indexOf(value)}
            onChange={(e) => setValue(steps[e])}
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
