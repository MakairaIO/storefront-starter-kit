import Header, { headerVariants } from '../../../patterns/Header'

const headerProps = headerVariants[0].props

export default function Home(props) {
  return (
    <>
      <Header {...props} {...headerProps} />
    </>
  )
}
