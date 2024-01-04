export default function formatDate(dateString) {
  const date = new Date(dateString)

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}
