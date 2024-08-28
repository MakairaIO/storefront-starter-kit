import { useState } from 'react'
import { Text, Button } from '../..'
import Answer from './Answer'

function FiltersList(props) {
  const { questions } = props

  const [questionsList, setQuestionsList] = useState(questions)

  const handleDelete = (uuid) =>
    setQuestionsList(questionsList.filter((question) => question.uuid !== uuid))

  return (
    <section className="filters-list">
      {questionsList.map((question) => (
        <div className="filters-list__question" key={question.uuid}>
          <div className="filters-list__question__text-content">
            <Text element="h6" size="aphrodite" weight="semi-bold">
              {question.title}
            </Text>

            <Answer type={question.type} {...question} />
          </div>

          <Button
            onClick={() => handleDelete(question.uuid)}
            icon="times"
            variant="link-icon"
          />
        </div>
      ))}
    </section>
  )
}

export default FiltersList
export { default as filtersListVariants } from './variants.js'
