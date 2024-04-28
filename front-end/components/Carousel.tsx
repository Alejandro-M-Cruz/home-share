import * as React from 'react'
import { ViewRef } from '@/primitives/types'
import { Image, View } from 'react-native'
import { Button } from '@/components/Button'
import { Entypo } from '@expo/vector-icons'
import { cn } from '@/helpers/cn'
import { ClassValue } from 'clsx'

type CarouselProps = {
  imageUrls: string[]
  imageClassName?: ClassValue
}

const Carousel = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & CarouselProps
>(({ imageUrls, imageClassName, ...props }, ref) => {
  const [imageIndex, setImageIndex] = React.useState(0)

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % imageUrls.length)
  }

  return (
    <View ref={ref} {...props}>
      <Image
        source={{ uri: imageUrls[imageIndex] }}
        className={cn('w-full h-full object-cover', imageClassName)}
      />

      {imageIndex > 0 && (
        <Button onPress={prevImage} size="icon" variant="outline" className="invisible native:visible web:group-hover:visible absolute left-3 top-1/2 -translate-y-1/2 rounded-full w-7 h-7">
          <Entypo size={16} name="chevron-left" />
        </Button>
      )}
      {imageIndex < imageUrls.length - 1 && (
        <Button onPress={nextImage} size="icon" variant="outline" className="invisible native:visible web:group-hover:visible absolute right-3 top-1/2 -translate-y-1/2 rounded-full w-7 h-7">
          <Entypo size={16} name="chevron-right" />
        </Button>
      )}
      <View className="invisible native:visible web:group-hover:visible w-full flex flex-row items-center justify-center space-x-2 absolute bottom-3">
        {imageUrls.map((_, i) => (
          <Button
            key={i}
            className={cn('w-2.5 h-2.5', imageIndex === i && 'scale-[1.35]')}
            size="icon"
            variant="outline"
            onPress={() => setImageIndex(i)}
          />
        ))}
      </View>
    </View>
  )
})

Carousel.displayName = 'Carousel'

export { Carousel }
