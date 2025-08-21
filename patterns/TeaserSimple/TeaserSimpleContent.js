import classNames from 'classnames'
import { BookMeeting, Heading } from '..'
import TeaserSimpleColumn from './TeaserSimpleColumn'
import TeaserSimpleImage from './TeaserSimpleImage'
import TeaserSimpleButton from './TeaserSimpleButton'

export default function TeaserSimpleContent(props) {
  const { description, button, alignment, theme, meeting } = props
  const { heading, content, image = {}, contentDisplay = '' } = description

  const classes = classNames('teaser-simple__text-column-container', {
    ['teaser-simple__text-column-container--two-columns']:
      contentDisplay === 'two-columns',
  })

  return (
    <div className="teaser-simple__text-container">
      <TeaserSimpleImage image={image} alignment={alignment} />
      <div className="teaser-simple__text-column teaser-simple__text-column--content">
        {heading && (
          <div className="teaser-simple__text-full">
            <Heading level={3}>{heading}</Heading>
          </div>
        )}
        <div className={classes}>
          <TeaserSimpleColumn content={content} />
        </div>
        <TeaserSimpleButton {...button} theme={theme} />
        {meeting?.link && (
          <div className="teaser-simple__text-column teaser-simple__text-column--button">
            <BookMeeting
              link={meeting.link}
              title={meeting.text}
              theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  )
}
