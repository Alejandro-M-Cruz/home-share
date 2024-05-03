import { isAxiosError } from 'axios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants/errors'

function handleError({
  error,
  setError
}: {
  error: Error
  setError: (fieldPath: any, error: any) => void
}) {
  console.log(error)
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

function getErrorMessages(errors: any): string[] {
  switch (typeof errors) {
    case 'string':
      return [errors]
    case 'object':
      return errors.message ? [errors.message] : Object.values(errors).flatMap(getErrorMessages)
    default:
      return [DEFAULT_ERROR_MESSAGE]
  }
}

export { handleError, getErrorMessages }