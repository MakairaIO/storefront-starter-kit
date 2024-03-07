import { Button } from '../../../'

export default function SubmitButtons(props) {
  const { stepNumber, handlePrevious, handleSubmit, maxQuestion, disabled } =
    props

  return (
    <div className="product-finder__buttons">
      {stepNumber !== 0 ? (
        <Button onClick={handlePrevious} variant="secondary">
          Previous
        </Button>
      ) : (
        <span />
      )}

      <Button onClick={handleSubmit} variant="primary-alt" disabled={disabled}>
        {stepNumber === maxQuestion ? 'Submit' : 'Next'}
      </Button>
    </div>
  )
}
