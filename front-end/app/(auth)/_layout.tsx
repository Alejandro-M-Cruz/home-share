import { Stack } from "expo-router";

const StackLayout = () => {
    return (
        <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: '#194976',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
              }
        }}
        >
            <Stack.Screen
            name = "login"
            options={{
                headerTitle: "Login"
            }}
            />
            <Stack.Screen
            name = "signup"
            options={{
                headerTitle: "Sign Up"
            }}
            />
            <Stack.Screen
            name = "forgot-password"
            options={{
                headerTitle: "Forgot Password"
            }}
            />
            <Stack.Screen
            name = "password-reset/[token]"
            options={{
                headerTitle: "Reset Password"
            }}
            />
        </Stack>
    )
}

export default StackLayout