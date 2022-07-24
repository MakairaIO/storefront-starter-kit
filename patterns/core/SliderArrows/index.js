import React from 'react'
import { Icon } from '../..'

export function NextArrow({ className, style, onClick }) {
  return (
    <Icon
      symbol="chevron-right"
      style={style}
      className={className}
      onClick={onClick}
      role="button"
    />
  )
}

export function PrevArrow({ className, style, onClick }) {
  return (
    <Icon
      symbol="chevron-left"
      style={style}
      className={className}
      onClick={onClick}
      role="button"
    />
  )
}
