import { useState } from 'react'
import Question from './questions/Question'

function ProductFinder(props) {
  const { questions } = props

  const [stepNumber, setStepNumber] = useState(0)
  const [answers, setAnswers] = useState([])
  // { questionTitle: '', value: '' }
  console.log(answers)

  return (
    <section className="product-finder">
      {questions?.map((question, i) => (
        <Question
          key={question.title}
          isActive={stepNumber === i}
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
          answers={answers}
          setAnswers={setAnswers}
          maxQuestion={questions?.length - 1}
          {...question}
        />
      ))}
    </section>
  )
}

export default ProductFinder
export { default as productFinderVariants } from './variants.js'
