import { ImagePickerAsset } from 'expo-image-picker'

function mergeImages(images: ImagePickerAsset[], newImages: ImagePickerAsset[]): ImagePickerAsset[] {
  const newDifferentImages = newImages
    .filter(newImage => !images.some(image => image.uri === newImage.uri))
  return [...images, ...newDifferentImages]
}

export { mergeImages }
