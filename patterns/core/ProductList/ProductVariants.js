// TODO: Remove hard-coded variants with dynamic data
// TODO: Refactor to links here for entry on variant detail-page?
export default function ProductVariants() {
  const variants = ['#CB0A21', '#BFD56F', '#DB9CD1']

  if (variants.length == 0) return null

  return (
    <div className="product-item__variants">
      {variants.map((variant) => (
        <span
          key={variant}
          className="product-item__variant"
          style={{ background: variant }}
        ></span>
      ))}
    </div>
  )
}
