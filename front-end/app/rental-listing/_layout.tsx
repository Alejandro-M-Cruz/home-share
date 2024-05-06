import { Stack } from 'expo-router'

const StackLayout3 = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#194976'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Details'
        }}
      />
    </Stack>
  )
}

export default StackLayout3
