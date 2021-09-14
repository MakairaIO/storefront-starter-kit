export default function collectBundleFormData() {
  const bundleForm = document.querySelector('.bundle-form')

  // Defensive Coding
  if (!bundleForm) {
    return new FormData()
  }

  return new FormData(bundleForm)
}
