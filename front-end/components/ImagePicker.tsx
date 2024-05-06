import * as React from 'react'
import { FlatList, Image, Platform, View } from 'react-native'
import {
  CameraType,
  ImagePickerAsset,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync
} from 'expo-image-picker'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { ViewRef } from '@/primitives/types'
import { DEFAULT_IMAGE_SELECTION_LIMIT } from '@/constants/image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { mergeAssets } from '@/helpers/image-picker'
import { cn } from '@/helpers/cn'

type ImagePickerProps = {
  images: ImagePickerAsset[]
  onImagesChange: (images: ImagePickerAsset[]) => void
  selectionLimit?: number
  onSelectionDialogClose?: () => void
}

const ImagePicker = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & ImagePickerProps
>(
  (
    {
      images,
      onImagesChange,
      selectionLimit = DEFAULT_IMAGE_SELECTION_LIMIT,
      onSelectionDialogClose,
      className,
      ...props
    },
    ref
  ) => {
    const pickImages = React.useCallback(async () => {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit
      })
      onSelectionDialogClose?.()
      if (!result.canceled) {
        onImagesChange?.(mergeAssets(images, result.assets))
      }
    }, [images, onImagesChange])

    const takePictures = React.useCallback(async () => {
      await requestCameraPermissionsAsync()
      const result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 1,
        cameraType: CameraType.back,
        allowsEditing: true,
        selectionLimit
      })
      onSelectionDialogClose?.()
      if (!result.canceled) {
        onImagesChange?.(mergeAssets(images, result.assets))
      }
    }, [images, onImagesChange])

    return (
      <View ref={ref} className={cn('p-3', className, images?.length > 0 && 'bg-background rounded-lg border-4 border-dashed border-input')} {...props}>
        {Platform.OS !== 'web' && (
          <Button onPress={takePictures}>
            <Text>Use camera</Text>
          </Button>
        )}
        <Button
          onPress={pickImages}
          className="mx-auto flex flex-row space-x-2"
        >
          <MaterialCommunityIcons
            name="image-multiple"
            size={20}
            className="text-primary-foreground"
          />
          <Text>Pick images</Text>
        </Button>
        {images?.length > 0 && (
          <>
            <FlatList
              horizontal
              className="flex-1"
              data={images}
              renderItem={({ item: image }) => (
                <View className="border-4 border-background shadow-md rounded-lg relative m-4 p-0">
                  <Image
                    className="h-[140px] w-[160px] object-cover rounded-lg"
                    source={{ uri: image.uri }}
                  />
                  <Button
                    onPress={() =>
                      onImagesChange(images.filter(i => i.uri !== image.uri))
                    }
                    variant="outline"
                    size="icon"
                    className="rounded-full w-6 h-6 absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
                  >
                    <MaterialCommunityIcons name="close" size={16} />
                  </Button>
                </View>
              )}
              keyExtractor={image => image.uri}
            />
            <Button
              onPress={() => onImagesChange([])}
              variant="destructive"
              size="sm"
              className="mx-auto flex flex-row items-center justify-center space-x-2"
            >
              <MaterialCommunityIcons
                name="delete-forever"
                className="text-destructive-foreground"
                size={20}
              />
              <Text>Discard all</Text>
            </Button>
          </>
        )}
      </View>
    )
  }
)

ImagePicker.displayName = 'ImagePicker'

export { ImagePicker }
