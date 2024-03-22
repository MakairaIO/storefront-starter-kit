import { useEffect, useState } from 'react'
import ProductFinder from '.'

const EMPTY_CONFIG = Object.freeze({
  title: '',
  streamId: 0,
  questions: [],
})

export default function ProductFinderWithProps(props) {
  const id = props['finder-id']
  const [config, setConfig] = useState(EMPTY_CONFIG)

  useEffect(() => {
    async function fetchConfig() {
      const config = await fetch(`${process.env.PRODUCT_FINDER_API_URL}/${id}`)
        .then((res) => res.json())
        .catch(() => EMPTY_CONFIG)
      setConfig(config)
    }
    fetchConfig()
  }, [id])

  return <ProductFinder config={config} />
}
