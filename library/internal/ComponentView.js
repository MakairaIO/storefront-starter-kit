import VariantPreview from './VariantPreview'

export default function ComponentView({
  name: componentName,
  component,
  variants,
  type,
}) {
  return (
    <div className={`pali__component ${type}`}>
      <h1>{componentName}</h1>

      {variants.map(variant => (
        <VariantPreview
          component={component}
          componentName={componentName}
          variant={variant}
          key={variant.name}
        />
      ))}
    </div>
  )
}
