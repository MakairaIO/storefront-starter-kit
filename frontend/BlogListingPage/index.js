import { BlogList, Metadata } from '../../patterns'
import { useGlobalData } from '../../utils'
import { useEffect, useState } from 'react'

function BlogListingPage() {
  const { blogData } = useGlobalData()
  const [list, setList] = useState([])
  const count = 9
  const showLoadMore = list.length < blogData.length

  useEffect(() => {
    if (blogData && blogData.length) {
      setList(blogData.slice(list.length, list.length + count))
    }
  }, [blogData])

  const handleLoadMore = () => {
    setList([...list, ...blogData.slice(list.length, list.length + count)])
  }

  return (
    <main>
      <Metadata
        title="Blog Listing Page"
        robotFollow={false}
        robotIndex={false}
      />

      <BlogList
        blogData={list}
        onClickLoadMore={handleLoadMore}
        showLoadMore={showLoadMore}
      />
    </main>
  )
}

export default BlogListingPage
