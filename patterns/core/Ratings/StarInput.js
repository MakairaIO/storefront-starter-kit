import { useState } from 'react'
import classNames from 'classnames'

import { Icon } from '../../index'

const StarInput = ({
  value = 1,
  maxStars = 5,
  disabled = false,
  onChange = () => {},
}) => {
  const [hoveredStar, setHoveredStar] = useState(0)
  const [inputHovered, setInputHovered] = useState(false)

  const handleStarLeave = () => {
    if (disabled) return

    setHoveredStar(0)
  }

  const handleStarEnter = (index) => {
    if (disabled) return

    setHoveredStar(index)
  }

  const handleStarSelect = (event, index) => {
    event.stopPropagation()
    onChange(index)
  }

  const handleZeroStarSelect = () => {
    if (disabled) return

    onChange(0)
  }

  const isStarActive = (index) => {
    if (disabled || !inputHovered) {
      return index <= value
    }

    return index <= hoveredStar
  }

  const starComponents = []

  for (let i = 1; i <= maxStars; i++) {
    starComponents.push(
      <div
        key={i}
        onMouseEnter={() => handleStarEnter(i)}
        onMouseLeave={handleStarLeave}
        onClick={(event) => handleStarSelect(event, i)}
      >
        <Icon
          symbol="star"
          className={classNames('star-input__star', {
            'star-input__star--active': isStarActive(i),
          })}
        />
      </div>
    )
  }

  return (
    <div
      className={classNames('star-input', {
        'star-input--disabled': disabled,
      })}
      onMouseEnter={() => setInputHovered(true)}
      onMouseLeave={() => setInputHovered(false)}
      onClick={handleZeroStarSelect}
    >
      {starComponents}
    </div>
  )
}

export default StarInput
