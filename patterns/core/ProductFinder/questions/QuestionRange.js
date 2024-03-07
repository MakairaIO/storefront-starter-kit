import { useState, useMemo } from 'react'
// import classNames from 'classnames'
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
  } = props

  const [value, setValue] = useState(
    steps
      ? steps[Math.round((steps.length - 1) / 2)]
      : roundToNearestLegalValue((min + max) / 2, step)
  )

  const handlePrevious = () => setStepNumber(stepNumber - 1)

  const handleSubmit = () => {
    if (stepNumber === maxQuestion) {
      return
    }

    setAnswers([...answers, { questionTitle: title, value }])
    setStepNumber(stepNumber + 1)
  }

  // const containerClassName = classNames(
  //   'product-finder__question-container__stepper',
  //   { steps: !!steps },
  //   { step: !!step }
  // )

  const thumbPosition = useMemo(() => {
    // if (steps) {
    //   const thumbValue = steps.indexOf(value)
    //   const thumbMin = 0
    //   const thumbMax = steps.length - 1

    //   const thumbPosition =
    //     (100 * (thumbValue - thumbMin)) / (thumbMax - thumbMin)

    //   console.log({
    //     thumbPosition,
    //     rounded: roundToNearestLegalValue(thumbPosition),
    //   })

    //   console.log({ thumbMin, thumbMax, thumbValue, thumbPosition, value })

    //   return `${roundToNearestLegalValue(
    //     thumbPosition < 0 ? thumbPosition * -1 : thumbPosition
    //   )}%`
    // }
    const thumbValue =
      steps && typeof value === 'string' ? steps.indexOf(value) : Number(value)
    const thumbMin = steps ? 0 : min
    const thumbMax = steps ? steps.length - 1 : max

    console.log({ thumbMin, thumbMax, thumbValue, value })

    // return `${(100 * (value - min)) / (max - min)}%`
    return `${(100 * (thumbValue - thumbMin)) / (thumbMax - thumbMin)}%`
  }, [min, max, steps, value])

  // const tooltipPosition = useMemo(() => {
  //   const rangeWidth = (100 * (value - min)) / (max - min)
  //   return `calc(${rangeWidth}% + ${-8 - rangeWidth * 0.22}px)`
  // }, [value, min, max])

  // show input or not / show tooltiup or not

  return (
    <>
      <div className="product-finder__question-container__stepper">
        <input
          type="range"
          min={steps ? 0 : min}
          max={steps ? steps?.length - 1 : max}
          step={steps ? 1 : step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="product-finder__question-container__stepper__input"
          style={{
            ['--thumb-position']: thumbPosition,
          }}
        />

        <div className="product-finder__question-container__stepper__values-container">
          {steps ? (
            steps.map((step) => (
              <span
                key={step}
                onClick={() => setValue(steps.indexOf(step))}
                className="product-finder__question-container__stepper__values-container__value"
              >
                {step}
              </span>
            ))
          ) : (
            <>
              <span className="product-finder__question-container__stepper__values-container__value">
                {min}
              </span>
              <span className="product-finder__question-container__stepper__values-container__value">
                {max}
              </span>
            </>
          )}
        </div>

        <span
          className="product-finder__question-container__stepper__tooltip"
          // style={{ ['--tooltip-left']: tooltipPosition }}
        >
          {value}
        </span>

        {/* {steps ? (
          <div className="product-finder__question-container__stepper__values-container">
            {steps.map((step, i) => (
              <span
                key={step}
                onClick={() => setValue(step)}
                className={classNames(
                  'product-finder__question-container__stepper__values-container__value'
                  // { first: i === 0 },
                  // { last: i === steps?.length - 1 }
                )}
              >
                {step}
              </span>
            ))}
          </div>
        ) : (
          <>
            { 

            <div className="product-finder__question-container__stepper__values-container">
              <span className="product-finder__question-container__stepper__values-container__value">
                {min}
              </span>
              <span className="product-finder__question-container__stepper__values-container__value">
                {max}
              </span>
            </div>
          </>
        )} */}
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

// function roundToNearestLegalValue(value, step) {
//   const remainder = value % step
//   if (remainder >= step / 2) {
//     return Math.ceil(value / step) * step
//   } else {
//     return Math.floor(value / step) * step
//   }
// }
