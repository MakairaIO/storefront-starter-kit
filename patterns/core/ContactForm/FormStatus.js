import React from 'react'
import classname from 'classnames'
import { useTranslation } from '../../../utils'

function FormStatus(props) {
  const { status } = props
  const { t } = useTranslation()
  const formStatusClass = classname({
    'form-contact__status': true,
    'status--failure': status === 'error',
    'status--success': status === 'success',
  })

  const message =
    status === 'success'
      ? t('CONTACT_FORM_STATUS_SUCCESS')
      : status === 'error'
      ? t('CONTACT_FORM_STATUS_FAILURE')
      : ''

  return <div className={formStatusClass}>{message}</div>
}
export default FormStatus
