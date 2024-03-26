import { useState, useEffect } from 'react'
import { fetchRecommendationData, useGlobalData } from '../../../utils'
import { ProductList } from '../../'
import Question from './questions/Question'

function ProductFinder(props) {
  const { questions, productId, recommendationId, count } = props
  const { pageData } = useGlobalData()

  const [stepNumber, setStepNumber] = useState(0)
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
      try {
        const res = await fetchRecommendationData({
          productId,
          recommendationId,
          count,
          language: pageData.language,
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
  }, [productId, recommendationId, answers, count, pageData.language])

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
