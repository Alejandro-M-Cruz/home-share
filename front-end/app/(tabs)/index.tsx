import { StyleSheet, View } from 'react-native'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'

export default function TabOneScreen() {
  const { user, userError, userStatus } = useAuth()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
      />
      {user && (
        <>
          <Text>User data:</Text>
          <Text>{JSON.stringify(user, null, 2)}</Text>
        </>
      )}
      <View style={{ flex: 1, flexDirection: 'row', gap: 6, marginVertical: 12, padding: 10, backgroundColor: 'white' }}>
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
    </View>
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
