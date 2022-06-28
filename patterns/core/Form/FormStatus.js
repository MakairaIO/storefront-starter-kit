import React from 'react'
import classname from 'classnames'

function FormStatus(props) {
  const { status, successMessage = '', errorMessage = '' } = props

  const formStatusClass = classname({
    'form-field__status': true,
    'form-field__status--failure': status === 'error',
    'form-field__status--success': status === 'success',
  })

  const getMessage = () => {
    switch (status) {
      case 'success':
        return successMessage
      case 'error':
        return errorMessage
      default:
        return ''
    }
  }

  return <div className={formStatusClass}>{getMessage()}</div>
}
export default FormStatus
