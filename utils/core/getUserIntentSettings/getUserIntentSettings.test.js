import getUserIntentSettings from './'
import {
  MultiUserIntentWithDifferentSettings,
  MultiUserIntentWithSameSettingsDifferentCTAType,
  MultiUserIntentWithSameSettingsSameCTAType,
  SingleUserIntentWithAllSettings,
  SingleUserIntentWithFewSettings,
} from './mocks/userIntentSettings'

describe('getUserIntentSettings()', () => {
  beforeEach(() => {
    const url = 'http://dummy.com'
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname: '/',
        search: '',
      },
      writable: true, // possibility to override
    })
  })

  it('Should return right structure single intent', () => {
    const result = getUserIntentSettings(SingleUserIntentWithAllSettings)
    expect(result).toMatchSnapshot()
  })

  it('Should return right structure single intent 2', () => {
    const result = getUserIntentSettings(SingleUserIntentWithFewSettings)
    expect(result).toMatchSnapshot()
  })

  it('Should return right structure multi intent different setting', () => {
    const result = getUserIntentSettings(MultiUserIntentWithDifferentSettings)
    expect(result).toMatchSnapshot()
  })

  it('Should return right structure multi intent same setting same CTAType', () => {
    const result = getUserIntentSettings(
      MultiUserIntentWithSameSettingsSameCTAType
    )
    expect(result).toMatchSnapshot()
  })

  it('Should return right structure multi intent same setting different CTAType', () => {
    const result = getUserIntentSettings(
      MultiUserIntentWithSameSettingsDifferentCTAType
    )
    expect(result).toMatchSnapshot()
  })
})
