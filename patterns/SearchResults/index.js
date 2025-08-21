import { Heading, Copytext, Link } from '../../patterns'

function SearchResults({ page, searchPhrase }) {
  const hasPages = page.count > 0

  return (
    <section className="search-results">
      {hasPages && (
        <div className="search-results__pages">
          <Heading level={2}>{`Suchergebnisse für "${searchPhrase}"`}</Heading>
          {page.items.map(({ fields = {} }) => {
            const { metadata = {}, url, id } = fields
            return (
              <div key={id} className="search-results__page">
                <Heading level={4}>
                  <Link href={url}>{metadata.title}</Link>
                </Heading>
                <Copytext>
                  <Link href={url}>{metadata.description}</Link>
                </Copytext>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default SearchResults
export { default as searchResultsVariants } from './variants.js'
