import { Fragment } from 'react'
import Header, { headerVariants } from '../../../patterns/Header'

const headerProps = headerVariants[0].props

export default function Home(props) {
  return (
    <Fragment>
      <Header {...props} {...headerProps} />
    </Fragment>
  )
}
