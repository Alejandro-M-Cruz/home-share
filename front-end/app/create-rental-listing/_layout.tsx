import { Stack } from 'expo-router'

const StackLayout2 = () => {
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
        name="first-step"
        options={{
          headerTitle: 'First Step'
        }}
      />
      <Stack.Screen
        name="second-step"
        options={{
          headerTitle: 'Second Step'
        }}
      />
      <Stack.Screen
        name="third-step"
        options={{
          headerTitle: 'Third Step'
        }}
      />
    </Stack>
  )
}

export default StackLayout2
