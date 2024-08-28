import { useState, useEffect } from 'react'
import { fetchRecommendationData, useTranslation } from '../../../utils'
import { ProductList } from '../../'
import Question from './questions/Question'
import { shouldSkipQuestion } from './shouldSkipQuestion'

function ProductFinder(props) {
  const { language } = useTranslation()

  const [stepNumber, setStepNumber] = useState(0)
  // if the answer is optional, don't fetch recos based on it but sort the products based on the answer and display it as a field
  const [answers, setAnswers] = useState([]) // { questionTitle: '', value: '', type: '', field, operator, compareWith, skipQuestion }
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (shouldSkipQuestion(products, props.questions, answers, language)) {
      setAnswers([...answers, null])
    }
  }, [answers, props.questions])

  useEffect(() => {
    async function getProducts() {
      const filters = answers.filter(Boolean).map((answer) => ({
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
          mergeFilter: true,
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

      {products.length ? <ProductList products={products} /> : null}
    </section>
  )
}

export default ProductFinder
export { default as productFinderVariants } from './variants.js'
