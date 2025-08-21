import { useState } from 'react'
import classNames from 'classnames'
import { Heading, Copytext, Tags } from '..'

const DEFAULT_SHOWED = 2

function Stream({
  heading,
  text,
  releases = [],
  roadmap = [],
  anchorId = '',
  theme,
  reduceTopSpace,
  reduceMaxWidth,
  alignment,
}) {
  const [showed, setShowed] = useState(DEFAULT_SHOWED)
  const releasesLength = releases.length
  const roadmapLength = roadmap.length

  const defaultTab = releasesLength === 0 ? 'roadmap' : 'releases'
  const [selectedTab, setSelectedTab] = useState(defaultTab)

  const classes = classNames('pattern stream', {
    [`stream__theme--${theme}`]: theme,
    'stream__reduce-top-space': reduceTopSpace,
    [`stream__alignment--${alignment}`]: alignment,
  })

  const classesWrapper = classNames('stream__wrapper', {
    'stream__reduce-max-width': reduceMaxWidth,
  })

  const releasesClasses = classNames('stream__releases', {
    ['stream__releases--selected']: selectedTab === 'releases',
  })
  const roadmapClasses = classNames('stream__roadmaps', {
    ['stream__roadmaps--selected']: selectedTab === 'roadmap',
  })
  const moreClasses = classNames(
    'stream__release',
    'stream__release__loadmore',
    {
      ['stream__release__loadmore--less']: showed === releasesLength,
    }
  )

  return (
    <section id={anchorId} className={classes}>
      <div className={classesWrapper}>
        <Heading level={0}>{heading}</Heading>
        <Copytext dangerouslySetInnerHTML={{ __html: text }} />
        <div className="stream__tabs">
          {releasesLength > 0 && (
            <Copytext
              className={classNames({
                ['selected']: selectedTab === 'releases',
              })}
              onClick={() => setSelectedTab('releases')}
              element="span"
            >
              Releases
            </Copytext>
          )}
          {roadmapLength > 0 && (
            <Copytext
              className={classNames({
                ['selected']: selectedTab === 'roadmap',
              })}
              onClick={() => setSelectedTab('roadmap')}
              element="span"
            >
              Roadmap
            </Copytext>
          )}
        </div>
        <div className={releasesClasses}>
          {releases.slice(0, showed).map((release, releaseIndex) => (
            <div key={releaseIndex} className="stream__release">
              <Heading level={5}>{release.version}</Heading>
              <Tags tags={release.tags} />
              <ul className="stream__release__logs">
                {release.logs.map((log, logIndex) => (
                  <li key={logIndex}>
                    <Copytext dangerouslySetInnerHTML={{ __html: log.text }} />
                  </li>
                ))}
              </ul>
              <Copytext>{release.deployed}</Copytext>
            </div>
          ))}
          {DEFAULT_SHOWED < releasesLength && (
            <div className={moreClasses}>
              <Heading
                level={5}
                onClick={() =>
                  setShowed(
                    showed === releasesLength ? DEFAULT_SHOWED : releasesLength
                  )
                }
              >
                {showed === releasesLength ? 'show less' : 'load more'}
              </Heading>
            </div>
          )}
        </div>
        <div className={roadmapClasses}>
          {roadmap.map((road, roadIndex) => (
            <div key={roadIndex} className="stream__roadmap">
              <Heading level={3}>{road.status}</Heading>
              {road.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="stream__roadmap__feature">
                  <Heading level={5}>{feature.heading}</Heading>
                  <Tags tags={feature.tags} />
                  <ul className="stream__roadmap__logs">
                    {feature.logs.map((log, logIndex) => (
                      <li key={logIndex}>
                        <Copytext
                          dangerouslySetInnerHTML={{ __html: log.text }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stream
export { default as streamVariants } from './variants.js'
