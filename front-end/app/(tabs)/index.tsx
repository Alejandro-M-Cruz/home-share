import { ScrollView, StyleSheet, View } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import { Input } from '@/components/Input'
import { ImagePicker } from '@/components/ImagePicker'
import { useState } from 'react'
import { ImagePickerAsset } from 'expo-image-picker'

export default function TabOneScreen() {
  const { user, userError, userStatus } = useAuth()
  const [images, setImages] = useState<ImagePickerAsset[]>([])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      {user && (
        <>
          <Text>User data:</Text>
          <Text>{JSON.stringify(user, null, 2)}</Text>
        </>
      )}
      <Text>Button:</Text>
      <View className="grid grid-cols-2 gap-3 justify-items-center mt-3 bg-white rounded-lg p-3">
        <Button variant="default">
          <Text>Default</Text>
        </Button>
        <Button variant="destructive">
          <Text className="text-white">Destructive</Text>
        </Button>
        <Button variant="outline">
          <Text>Outline</Text>
        </Button>
        <Button variant="secondary">
          <Text>Secondary</Text>
        </Button>
        <Button variant="ghost">
          <Text>Ghost</Text>
        </Button>
        <Button variant="link">
          <Text>Link</Text>
        </Button>
      </View>
      <View className="flex-1 flex-col items-center justify-items-center mt-3 space-y-2">
        <Text>Input:</Text>
        <Input placeholder="Example input" />
        <Text>Avatar:</Text>
        <Avatar alt="Avatar" className="w-16 h-16">
          <AvatarImage source={{ uri: 'https://picsum.photos/id/3/200/300' }} />
          <AvatarFallback className="text-white text-2xl font-semibold bg-blue-600">
            JD
          </AvatarFallback>
        </Avatar>
      </View>
      <ImagePicker images={images} onImagesChange={setImages} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
