import { ImagePickerAsset } from 'expo-image-picker'

function mergeAssets(assets: ImagePickerAsset[], newAssets: ImagePickerAsset[]): ImagePickerAsset[] {
  const newDifferentImages = newAssets
    .filter(newImage => !assets.some(image => image.uri === newImage.uri))
  return [...assets, ...newDifferentImages]
}

async function assetToBlob(asset: ImagePickerAsset): Promise<Blob> {
  const response = await fetch(asset.uri)
  return response.blob()
}

export { mergeAssets, assetToBlob }
