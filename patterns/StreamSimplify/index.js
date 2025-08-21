import { useState } from 'react'
import classNames from 'classnames'
import { Heading, Copytext, Tags } from '..'

const DEFAULT_SHOWED = 5

function StreamSimplify({
  heading,
  text,
  releases = [],
  roadmap = [],
  anchorId = '',
}) {
  const [showed, setShowed] = useState(DEFAULT_SHOWED)
  const releasesLength = releases.length
  const roadmapLength = roadmap.length

  const defaultTab = releasesLength === 0 ? 'roadmap' : 'releases'
  const [selectedTab, setSelectedTab] = useState(defaultTab)

  const releasesClasses = classNames('stream-simplify__releases', {
    ['stream-simplify__releases--selected']: selectedTab === 'releases',
  })
  const roadmapClasses = classNames('stream-simplify__roadmaps', {
    ['stream-simplify__roadmaps--selected']: selectedTab === 'roadmap',
  })
  const moreClasses = classNames(
    'stream-simplify__release',
    'stream-simplify__release__loadmore',
    {
      ['stream-simplify__release__loadmore--less']: showed === releasesLength,
    }
  )
  return (
    <section id={anchorId} className="stream">
      <Heading level={2}>{heading}</Heading>
      <Copytext dangerouslySetInnerHTML={{ __html: text }} />
      <div className="stream-simplify__tabs">
        {releasesLength > 0 && (
          <Copytext
            className={classNames({ ['selected']: selectedTab === 'releases' })}
            onClick={() => setSelectedTab('releases')}
            element="span"
          >
            Releases
          </Copytext>
        )}
        {roadmapLength > 0 && (
          <Copytext
            className={classNames({ ['selected']: selectedTab === 'roadmap' })}
            onClick={() => setSelectedTab('roadmap')}
            element="span"
          >
            Roadmap
          </Copytext>
        )}
      </div>
      <div className={releasesClasses}>
        {releases.slice(0, showed).map((release, releaseIndex) => (
          <div key={releaseIndex} className="stream-simplify__release">
            <Heading level={5}>{release.version}</Heading>
            <Tags tags={release.tags} />
            <Copytext
              dangerouslySetInnerHTML={{ __html: release.logs }}
              className="stream-simplify__release__logs"
            />
            <Copytext>Deployed: {release.deployed}</Copytext>
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
          <div key={roadIndex} className="stream-simplify__roadmap">
            <Heading level={5}>{road.status}</Heading>
            {road.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="stream-simplify__roadmap__feature"
              >
                <Heading level={5}>{feature.heading}</Heading>
                <Tags tags={feature.tags} />
                <Copytext
                  dangerouslySetInnerHTML={{ __html: feature.logs }}
                  className="stream-simplify__roadmap__logs"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default StreamSimplify
export { default as streamSimplifyVariants } from './variants.js'
