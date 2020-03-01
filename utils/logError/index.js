/**
 * Here you should implement your custom functionality
 * for monitoring and reporting errors.
 */
export default function logError(error) {
  const { code, message, cause, stack } = error

  console.error({ code, message, cause, stack })
}
