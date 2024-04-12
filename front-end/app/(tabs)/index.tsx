import { ScrollView, StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useAuth } from '@/hooks/useAuth'
import { ImagePicker } from '@/components/ImagePicker'

export default function TabOneScreen() {
  const { user, userError, userStatus } = useAuth()
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      {user && (
        <>
          <Text>User data:</Text>
          <Text>{JSON.stringify(user, null, 2)}</Text>
        </>
      )}
      <ImagePicker />
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
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
