import { isAxiosError } from 'axios'

export function handleError({
  error,
  setErrors,
  defaultMessage
}: {
  error: Error
  setErrors: (errors: any) => void
  defaultMessage: string
}) {
  if (isAxiosError(error)) {
    setErrors(error.response?.data.errors)
    return
  }
  setErrors({ defaultMessage })
}
