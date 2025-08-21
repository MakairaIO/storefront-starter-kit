import React from 'react'

// support elevation level 0, 5, 10, 30
function Elevation({ children, level = 0 }) {
  if (!children) return null

  const ElevationChildren = () =>
    React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        className: `${child.props.className || ''} elevation--${level}`,
      })
    })

  return <ElevationChildren />
}

export default Elevation
export { default as elevationVariants } from './variants.js'
