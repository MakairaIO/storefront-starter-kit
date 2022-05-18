import mergeProductsAndBanners from '.'
import mockProducts from './products'
import mockBanners from './banners'

describe('mergeProductsAndBanners()', () => {
  // beforeEach(() => {
  // })

  it('should return products if no banners available', () => {
    const merged = mergeProductsAndBanners({ products: mockProducts })

    expect(merged).toEqual(mockProducts)
  })

  it('should return banners if no products available', () => {
    const merged = mergeProductsAndBanners({ banners: mockBanners })

    expect(merged).toEqual(mockBanners)
  })

  it('should correctly merge banners at configured positions', () => {
    const merged = mergeProductsAndBanners({
      products: mockProducts,
      banners: mockBanners,
    })

    expect(merged).toMatchSnapshot()
  })

  it('should correctly handle negative positions and normalize them to 0', () => {
    const merged = mergeProductsAndBanners({
      products: mockProducts,
      banners: [...mockBanners, { link: '/baz', position: '-1' }],
    })

    expect(merged).toMatchSnapshot()
  })
})
