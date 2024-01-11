import { useEffect, useRef, useState } from 'react'
import {
  debounce,
  fetchDocumentData,
  getUserIntentSettings,
  useTranslation,
} from '../../../utils'
import { ContentElements, Drawer, Modal } from '../..'
import { useRouter } from 'next/router'

const LOCALSTORAGE_KEY = 'USER_INTENT'

const REPEAT_TIME = Object.freeze({
  none: 0,
  '30_min': 30 * 60 * 1000,
  '60_min': 60 * 60 * 1000,
  '1_day': 1 * 24 * 60 * 60 * 1000,
  '2_week': 2 * 7 * 24 * 60 * 60 * 1000,
  '3_month': 3 * 30 * 24 * 60 * 60 * 1000,
  '1_year': 365 * 24 * 60 * 60 * 1000,
})

export default function UserIntent() {
  const { language } = useTranslation()
  const [scenarios, setScenarios] = useState([])

  const inactivityTimeout = useRef([])
  const [ctaPopup, setCTAPopup] = useState({ show: false, document: null })
  const [ctaSlideIn, setCTASlideIn] = useState({
    show: false,
    position: null,
    document: null,
  })
  const { asPath } = useRouter()

  const fetchUserIntent = async () => {
    try {
      const documents = await fetchDocumentData({
        language,
        datatype: 'userIntent',
        includeContent: true,
      })
      setScenarios(documents)
    } catch (error) {
      setScenarios([])
    }
  }

  const shouldShowContent = (document, type) => {
    const showHistory = localStorage.getItem(LOCALSTORAGE_KEY)
    const key = `${type}_${document.id}`
    try {
      const showHistoryParsed = showHistory ? JSON.parse(showHistory) : {}
      if (showHistoryParsed[key]) {
        const date = new Date(showHistoryParsed[key])
        if (date instanceof Date && !isNaN(date)) {
          const current = new Date().getTime()
          const dateTime = date.getTime()
          return current - dateTime > REPEAT_TIME[document.repeat]
        }
      }
      return true
    } catch (error) {
      return true
    }
  }

  const storeHistory = (document, type) => {
    const showHistory = localStorage.getItem(LOCALSTORAGE_KEY)
    const key = `${type}_${document.id}`
    try {
      const showHistoryParsed = showHistory ? JSON.parse(showHistory) : {}
      showHistoryParsed[key] = new Date()
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(showHistoryParsed))
    } catch (error) {
      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify({ [key]: new Date() })
      )
    }
  }

  const showContent = (showingDocuments, type) => {
    for (let lightDocument of showingDocuments) {
      const fullDocument = scenarios.find(
        (item) => item.id === lightDocument.id
      )
      if (shouldShowContent(fullDocument, type)) {
        if (lightDocument.ctaType === 'popup' && !ctaPopup.show) {
          if (
            fullDocument.contentElements?.top?.elements.length &&
            fullDocument.contentElements?.top?.elements.length !== 0
          ) {
            setCTAPopup({
              show: true,
              document: fullDocument,
            })
          }
          storeHistory(fullDocument, type)
        } else if (lightDocument.ctaType === 'slidein' && !ctaSlideIn.show) {
          /* eslint-disable-next-line no-unused-vars */
          const [_, position] = fullDocument.ctaType.split('_')
          if (
            fullDocument.contentElements?.top.elements?.length &&
            fullDocument.contentElements?.top.elements?.length !== 0
          ) {
            setCTASlideIn({
              show: true,
              position,
              document: fullDocument,
            })
          }
          storeHistory(fullDocument, type)
        }
      }
    }
  }

  const onPageLoaded = (pageElapsed) => {
    const array = pageElapsed || []
    for (let item of array) {
      setTimeout(() => {
        showContent(item.documents, 'pageElapsed')
      }, item.value * 1000)
    }
  }

  const onUserScroll = (pageScroll) => {
    const totalHeight = document.body.scrollHeight - window.innerHeight
    const scrolledPercentage = (window.scrollY / totalHeight) * 100
    const array = pageScroll || []
    for (let item of array) {
      if (scrolledPercentage >= item.value) {
        showContent(item.documents, 'pageScroll')
      }
    }
  }
  const onUserScrollDebounce = debounce(onUserScroll, 100)

  const onExitIntent = (pageExit) => {
    const array = pageExit || []
    showContent(array, 'pageExit')
  }

  const onMouseMove = (pageInactivity) => {
    for (let ref of inactivityTimeout.current) {
      clearTimeout(ref)
    }
    let refs = []
    const array = pageInactivity || []
    for (let item of array) {
      const ref = setTimeout(() => {
        // Do something when the user is inactive for the specified duration
        showContent(item.documents, 'pageInactivity')
      }, item.value * 1000)

      refs.push(ref)
    }
    inactivityTimeout.current = refs
  }

  const onMouseMoveDebounce = debounce(onMouseMove, 100)

  useEffect(() => {
    fetchUserIntent()
  }, [])

  useEffect(() => {
    const settings = getUserIntentSettings(scenarios) || {}
    const _onUserScroll = () => onUserScrollDebounce(settings.pageScroll)
    const _onExitIntent = () => onExitIntent(settings.pageExit)
    const _onMouseMove = () => onMouseMoveDebounce(settings.pageInactivity)

    if (Object.keys(settings).length > 0) {
      // Trigger after seconds when page loaded
      onPageLoaded(settings.pageElapsed)

      // Trigger on page scroll
      window.addEventListener('scroll', _onUserScroll)

      //Trigger on exit intent (user hover on href bar)
      document.body.addEventListener('mouseleave', _onExitIntent)

      // Trigger on user inactive
      _onMouseMove() // Also triggered incase page load without any touch on
      document.addEventListener('mousemove', _onMouseMove)
    }

    return () => {
      window.removeEventListener('scroll', _onUserScroll)
      document.body.removeEventListener('mouseleave', _onExitIntent)
      document.removeEventListener('mousemove', _onMouseMove)
    }
  }, [scenarios, asPath])

  const onClosePopup = () => setCTAPopup({ document: null, show: false })

  const onCloseSlideIn = () => setCTASlideIn({ document: null, show: false })

  return (
    <>
      {ctaPopup.show && (
        <Modal className="cta-popup" closeModal={onClosePopup}>
          <ContentElements
            elements={ctaPopup.document?.contentElements?.top.elements || []}
          />
        </Modal>
      )}
      <Drawer
        open={ctaSlideIn.show}
        overlay={true}
        onClose={onCloseSlideIn}
        className="cta-slidein"
        placement={ctaSlideIn.position || 'left'}
        width={
          ['left', 'right'].includes(ctaSlideIn.position) ? 300 : undefined
        }
        height={
          ['top', 'bottom'].includes(ctaSlideIn.position) ? 300 : undefined
        }
      >
        <ContentElements
          elements={ctaSlideIn.document?.config?.top.elements || []}
        />
      </Drawer>
    </>
  )
}
