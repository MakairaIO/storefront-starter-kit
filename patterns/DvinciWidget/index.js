import { useEffect } from 'react'

function DvinciWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src =
      'https://static.dvinci-easy.com/files/job-widget-v2/dvinci-job-widget-2.0.0.min.js'
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section className="dvinci-widget">
      <>
        <div
          className="dvinci-job-widget"
          data-theme="marmalade"
          data-url="https://team.marmalade.group/portal/Makaira/jobPublication/list.json"
          lang="de"
        />

        <div className="cta-box">
          <span>
            Hast du nichts passendes gefunden? Dann bewirb dich bei uns{' '}
          </span>
          <a
            href="https://team.marmalade.group/jobs/2/apply"
            target="_blank"
            rel="noreferrer"
          >
            initiativ
          </a>
          !
        </div>
      </>
    </section>
  )
}

export default DvinciWidget
export { default as dvinciWidgetVariants } from './variants.js'
