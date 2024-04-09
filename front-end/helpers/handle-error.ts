import { isAxiosError } from 'axios'

const DEFAULT_ERROR_MESSAGE =
  'An unexpected error has occurred. Please try again later.'

export function handleError({
  error,
  setError
}: {
  error: Error
  setError: (fieldPath: any, error: any) => void
}) {
  if (!isAxiosError(error) || !error.response) {
    setError('root', {
      type: 'unknown',
      message: DEFAULT_ERROR_MESSAGE
    })
    return
  }
  const errorType = error.response.status?.toString() || 'unknown'
  const data = error.response.data
  const errorEntries: [string, string[]][] = Object.entries(data?.errors || {})
  if (!errorEntries) {
    setError('root', {
      type: errorType,
      message: data?.message || DEFAULT_ERROR_MESSAGE
    })
    return
  }
  errorEntries.forEach(([fieldPath, messages]) => {
    setError(fieldPath, {
      type: errorType,
      message: messages.join('\n')
    })
  })
}
