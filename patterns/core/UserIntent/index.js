import { useEffect, useRef, useState } from 'react'
import { debounce, fetchDocumentData, useTranslation } from '../../../utils'
import { ContentElements, Drawer, Modal } from '../..'

import FAKE_DATA from './FAKE_DATE.json'

const LOCALSTORAGE_KEY = 'USER_INTENT'

export default function UserIntent() {
  const { language } = useTranslation()
  /* eslint-disable-next-line no-unused-vars */
  const [documents, setDocuments] = useState([])

  const inactivityTimeout = useRef([])
  /**
   * {
      page_scroll: [
        { value: 40, documentIds: [''] },
        { value: 60, documentIds: [''] }
      ],
      page_exit: [ '', '' ],
      page_inactivity: [
        { value: 5, documentIds: [''] },
        { value: 5, documentIds: [''] }
      ],
      page_elapsed: [
        { value: 5, documentIds: [''] },
        { value: 10, documentIds: [''] }
      ]
    }
   */
  const [settings, setSettings] = useState({})
  const [ctaPopup, setCTAPopup] = useState({ show: false, document: null })
  const [ctaSlideIn, setCTASlideIn] = useState({ show: true, document: null })

  function fetchUserIntent() {
    try {
      /* eslint-disable-next-line no-unused-vars */
      const documents = fetchDocumentData({
        language,
        datatype: 'user-intent',
      })
      setDocuments(FAKE_DATA)
      filterMatchedScenario(FAKE_DATA)
    } catch (error) {
      setDocuments([])
    }
  }

  function isUrlMatchRules(rules) {
    const url = window.location.pathname
    for (let rule of rules) {
      try {
        switch (rule.operator) {
          case 'is':
            if (url === rule.value) return true
            break
          case 'contains':
            if (url.includes(rule.value)) return true
            break
          case 'begins':
            if (url.startsWith(rule.value)) return true
            break
          case 'matches':
            if (url.match(`^${rule.value}`)) return true
            break
          default:
            break
        }
      } catch (error) {
        console.debug(error)
      }
    }
    return false
  }

  function filterMatchedScenario(documents = []) {
    const initData = {
      page_scroll: [],
      page_exit: [],
      page_inactivity: [],
      page_elapsed: [],
    }

    for (let document of documents) {
      const { settings = [], id } = document
      const exclude = document?.urlRule?.exclude || []
      const or = document?.urlRule?.or || []

      const isMatchedExcludeRule = isUrlMatchRules(exclude)
      if (!isMatchedExcludeRule) {
        if (isUrlMatchRules(or)) {
          for (let setting of settings) {
            if (setting.active) {
              const updating = initData[setting.name]
              switch (setting.name) {
                case 'page_exit':
                  updating.push(id)
                  break
                case 'page_scroll':
                case 'page_elapsed':
                case 'page_inactivity':
                  {
                    const index = updating.findIndex(
                      (item) => item.value === setting.value
                    )
                    console.log(
                      'setting.name',
                      setting.name,
                      updating,
                      setting,
                      index
                    )
                    if (index > -1) {
                      updating[index].documentIds.push(id)
                    } else {
                      updating.push({
                        value: setting.value,
                        documentIds: [id],
                      })
                    }
                  }
                  break
                default:
                  break
              }
            }
          }

          setSettings(initData)
        }
      }
    }

    // setSettings({
    //   page_scroll: [
    //     { value: 40, documentIds: [''] },
    //     { value: 60, documentIds: [''] }
    //   ],
    //   page_exit: [
    //     { documentIds: [''] }
    //   ],
    //   page_inactivity: [
    //     { value: 5, documentIds: [''] },
    //     { value: 5, documentIds: [''] }
    //   ],
    //   page_elapsed: [
    //     { value: 5, documentIds: [''] },
    //     { value: 10, documentIds: [''] }
    //   ]
    // })
  }

  const shouldShowContent = (setting, type) => {
    try {
      const showTimes = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
      const key = `${type}_${setting.documentId}`
      if (showTimes[key]) {
        const date = new Date(showTimes[key])
        if (date instanceof Date && !isNaN(date)) {
          const current = new Date().getTime()
          const dateTime = date.getTime()
          const diff = (current - dateTime) / 1000
          console.log(diff)
        }
      }
      return true
    } catch (error) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({}))
      return true
    }
  }

  const showContent = (setting, type) => {
    if (shouldShowContent(setting, type)) {
      console.log('Showing Content for documentId: ', setting, type)
    }
  }

  const onPageLoaded = () => {
    const array = settings.page_elapsed || []
    for (let item of array) {
      setTimeout(() => {
        showContent(item, 'page_elapsed')
      }, item.value * 1000)
    }
  }

  const onUserScroll = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight
    const scrolledPercentage = (window.scrollY / totalHeight) * 100
    const array = settings.page_scroll || []
    for (let item of array) {
      if (scrolledPercentage >= item.value) {
        showContent(item, 'page_scroll')
      }
    }
  }
  const onuserScrollDebounce = debounce(onUserScroll, 100)

  const onExitIntent = () => {
    const array = settings.page_exit || []
    for (let item of array) {
      showContent(item, 'page_exit')
    }
  }

  const onMouseMove = () => {
    for (let ref of inactivityTimeout.current) {
      clearTimeout(ref)
    }
    let refs = []
    const array = settings.page_inactivity || []
    for (let item of array) {
      const ref = setTimeout(() => {
        console.log(`User inactive for ${item.value} seconds`)
        // Do something when the user is inactive for the specified duration
        showContent(item, 'page_inactivity')
      }, item.value * 1000)

      refs.push(ref)
    }
    inactivityTimeout.current = refs
  }

  useEffect(() => {
    fetchUserIntent()
  }, [])

  useEffect(() => {
    if (Object.keys(settings).length > 0) {
      console.log('Start tracking user intent')
      // Trigger after seconds when page loaded
      onPageLoaded()

      // Trigger on page scroll
      window.addEventListener('scroll', onuserScrollDebounce)

      //Trigger on exit intent (user hover on href bar)
      document.body.addEventListener('mouseleave', onExitIntent)

      // Trigger on user inactive
      document.addEventListener('mousemove', onMouseMove)
    }

    return () => {
      window.removeEventListener('scroll', onuserScrollDebounce)
      document.body.removeEventListener('mouseleave', onExitIntent)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [settings])

  const onClosePopup = () => setCTAPopup({ document: null, show: false })

  const onCloseSlideIn = () => setCTASlideIn({ document: null, show: false })

  return (
    <>
      {ctaPopup.show && (
        <Modal className="cta-popup" closeModal={onClosePopup}>
          <ContentElements elements={[]} />
        </Modal>
      )}
      <Drawer
        open={ctaSlideIn.show}
        onClose={onCloseSlideIn}
        className="cta-slidein"
        placement="left"
        width={500}
      >
        <ContentElements elements={[]} />
      </Drawer>
    </>
  )
}

/**
 * import { useEffect, useRef, useState } from "react"
import { debounce, fetchDocumentData, useTranslation } from "../../../utils";

const CONDITION = Object.freeze({
  ALL: 'all',
  IS: 'is',
  CONTAINS: 'contains',
  BEGIN: 'begin',
  MATCHES: 'matches'
})

const LOCALSTORAGE_KEY = 'USER_INTENT'

export default function UserIntent() {
  const { language } = useTranslation()
  const [documents, setDocuments] = useState([]);

  const inactivityTimeout = useRef([]);
  const [settings, setSettings] = useState({}) //store mapped setting for easy to event listener tracking
  const [showContent, setShowContent] = useState({ show: false, documents: [] })

  function fetchUserIntent() {
    try {
      const documents = fetchDocumentData({
        language,
        datatype: 'user-intent',
        includeContent: true
      })
      setDocuments(documents)
      filterMatchedScenario(documents)
    } catch (error) {
      setDocuments([])
    }
  }

  function filterMatchedScenario(documents = []) {
    // const filtered = documents.filter(document => {

    // })
    setSettings({
      page_scroll: [
        { value: 40, documentId: '', showTime: 30 },
        { value: 60, documentId: '', showTime: 30 }
      ],
      page_exit: [
        { documentId: '', showTime: 30 }
      ],
      page_inactivity: [
        { value: 5, documentId: '', showTime: 30 },
        { value: 5, documentId: '', showTime: 30 }
      ],
      page_elapsed: [
        { value: 5, documentId: '', showTime: 30 },
        { value: 10, documentId: '', showTime: 30 }
      ]
    })
  }

  const shouldShowContent = (setting, type) => {
    try {
      const showTimes = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
      const key = `${type}_${setting.documentId}`
      if (showTimes[key]) {
        const date = new Date(showTimes[key])
        if (date instanceof Date && !isNaN(date)) {
          const current = new Date().getTime()
          const dateTime = date.getTime()
          const diff = (current - dateTime) / 1000

        }
      }
      return true
    } catch (error) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({}))
      return true
    }
  }

  const showContent = (setting) => {
    // if (shouldShowContent(setting, type)) {
    console.log("Showing Content for documentId: ", setting)
    // }
  }

  const onPageLoaded = () => {
    const array = settings.page_elapsed || []
    const timeout = array.reduce((prev, curr) => {
      if (!prev[curr.value]) {
        prev[curr.value] = []
      }
      prev[curr.value].push({
        item: curr,
        type: 'page_elapsed'
      })
      return prev
    }, {})

    console.log("onPageLoaded", timeout)

    for (let time in timeout) {
      setTimeout(() => {
        showContent(timeout[time]);
      }, parseInt(time) * 1000);
    }
  }

  const onUserScroll = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrolledPercentage = (window.scrollY / totalHeight) * 100;
    const array = settings.page_scroll || []
    const matched = []
    for (let item of array) {
      if (scrolledPercentage >= item.value) {
        matched.push({
          item,
          type: 'page_scroll'
        })
      }
    }
    if (matched.length > 0) {
      showContent(matched)
    }
  }
  const onuserScrollDebounce = debounce(onUserScroll, 100)

  const onExitIntent = () => {
    const array = settings.page_exit || []
    const matched = []
    for (let item of array) {
      matched.push({
        item,
        type: 'page_exit'
      })
    }
    if (matched.length > 0) {
      showContent(matched)
    }
  }

  const onMouseMove = () => {
    for (let ref of inactivityTimeout.current) {
      clearTimeout(ref);
    }
    let refs = []
    const array = settings.page_inactivity || []
    const timeout = array.reduce((prev, curr) => {
      if (!prev[curr.value]) {
        prev[curr.value] = []
      }
      prev[curr.value].push({
        item: curr,
        type: 'page_inactivity'
      })
      return prev
    }, {})

    for (let time in timeout) {
      const ref = setTimeout(() => {
        console.log(`User inactive for ${time} seconds`);
        showContent(timeout[time]);
      }, parseInt(time) * 1000);
      refs.push(ref)
    }
    inactivityTimeout.current = refs;
  }

  useEffect(() => {
    fetchUserIntent()
  }, [])

  useEffect(() => {
    if (Object.keys(settings).length > 0) {
      console.log('Start tracking user intent');
      // Trigger after seconds when page loaded
      onPageLoaded()

      // Trigger on page scroll
      window.addEventListener('scroll', onuserScrollDebounce)

      //Trigger on exit intent (user hover on href bar)
      document.body.addEventListener('mouseleave', onExitIntent)

      // Trigger on user inactive
      document.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      window.removeEventListener('scroll', onuserScrollDebounce)
      document.body.removeEventListener('mouseleave', onExitIntent)
      document.removeEventListener("mousemove", onMouseMove);
    }

  }, [settings])

  return (
    <>

    </>
  )
}
 */
