import * as LabelPrimitive from '@/primitives/label'
import * as React from 'react'
import { cn } from '@/helpers/cn'
import { Text } from 'react-native'

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Text>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text> & {
    required?: boolean
  }
>(
  (
    {
      required = false,
      children,
      className,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) => (
    <LabelPrimitive.Root
      className="web:cursor-default"
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <LabelPrimitive.Text
        ref={ref}
        className={cn(
          'text-sm text-foreground native:text-base font-medium leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70',
          className
        )}
        {...props}
      >
        {children}
        {required && <Text className="text-red-500 font-bold"> *</Text>}
      </LabelPrimitive.Text>
    </LabelPrimitive.Root>
  )
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
