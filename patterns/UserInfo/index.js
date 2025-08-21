import { Copytext } from '..'

function UserInfo({ name, title }) {
  return (
    <div className="user-info">
      <Copytext>
        <strong>{name}</strong>
      </Copytext>
      <Copytext>{title}</Copytext>
    </div>
  )
}

export default UserInfo
export { default as userInfoVariants } from './variants.js'
