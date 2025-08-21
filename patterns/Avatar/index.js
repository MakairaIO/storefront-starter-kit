import { useConfiguration } from '../../utils'
import Elevation from '../Elevation'

function Avatar({ src }) {
  const { getImageLink } = useConfiguration()

  return (
    <Elevation level={10}>
      <div className="avatar">
        <img
          src={getImageLink({
            source: src,
            width: 80,
            crop: 'fill',
            pixelRatio: 2,
            transformationString: 'g_faces',
          })}
        />
      </div>
    </Elevation>
  )
}

export default Avatar
export { default as avatarVariants } from './variants.js'
