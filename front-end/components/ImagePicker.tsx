import { useCallback, useState } from 'react'
import { Button, Image, Platform, View } from 'react-native'
import { CameraType, launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'


export function ImagePicker() {
  const [images, setImages] = useState<string[]>([])

  const pickImages = useCallback(async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true
    })
    if (!result.canceled) {
      const imageUris = result.assets.map(asset => asset.uri)
      console.log(imageUris)
      setImages(imageUris)
    }
  }, [setImages])

  const takePictures = useCallback(async () => {
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      cameraType: CameraType.back,
      allowsEditing: true,
    })
    if (!result.canceled) {
      const imageUri = result.assets[0].uri
      setImages([...images, imageUri])
    }
  }, [images, setImages])

  return (
    <View>
      {Platform.OS !== 'web' && (
        <Button title="Use camera" onPress={takePictures} />
      )}
      <Button title="Pick images" onPress={pickImages} />
      {images.map(uri => (
        <Image key={uri} source={{ uri }} style={{ width: 200, height: 200 }} />
      ))}
    </View>
  )
}
