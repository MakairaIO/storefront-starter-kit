import { useState, useEffect } from 'react'
import { fetchRecommendationData, useTranslation } from '../../../utils'
import Question from './questions/Question'

function ProductFinder(props) {
  const { language } = useTranslation()

  const [stepNumber, setStepNumber] = useState(0)
  // if the answer is optional, don't fetch recos based on it but sort the products based on the answer and display it as a field
  const [answers, setAnswers] = useState([]) // { questionTitle: '', value: '', type: '', field, operator, compareWith }
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const filters = answers.map((answer) => ({
        field: answer.field,
        compareWith: answer.staticValue ?? 'staticValue',
        operator: answer.operator ?? 'like',
        type: answer.type ?? 'text',
        uuid: '',
        value: `*${answer.value}*`,
      }))

      if (filters.length === 0) return

      try {
        const res = await fetchRecommendationData({
          count: 100,
          language: language,
          filters,
        })

        const recommentedProducts = res.items
        const formattedProduct = recommentedProducts.map(
          (product) => product.fields
        )
        setProducts(formattedProduct)
      } catch (err) {
        console.log(err)
        throw new Error('An error occured, check console')
      }
    }

    getProducts()
  }, [props, answers, language])

  if (props.questions.length === 0) {
    return null
  }

  return (
    <section className="product-finder">
      {props.questions?.map((question, i) => (
        <Question
          key={question.uuid}
          isActive={stepNumber === i}
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
          answers={answers}
          setAnswers={setAnswers}
          maxQuestion={props.questions?.length - 1}
          products={products}
          {...question}
        />
      ))}
    </section>
  )
}

export default ProductFinder
export { default as productFinderVariants } from './variants.js'
