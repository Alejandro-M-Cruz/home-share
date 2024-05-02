import * as React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/Text'
import { getErrorMessages } from '@/helpers/errors'
import { ViewRef } from '@/primitives/types'
import { cn } from '@/helpers/cn'
import { useMemo } from 'react'

const ErrorList = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & {
    errors: Record<string, any>
  }
>(({ errors, className, ...props }, ref) => {
  const errorMessages = useMemo(() => getErrorMessages(errors), [errors])

  return (
    <View ref={ref} className={cn('flex flex-col space-y-3', className)} {...props}>
      {errorMessages.map((message, i) => (
        <Text key={i} className="text-red-500 font-medium">&bull; {message}</Text>
      ))}
    </View>
  )
})

ErrorList.displayName = 'ErrorList'

export { ErrorList }
