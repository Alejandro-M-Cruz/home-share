import * as React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Colors from '@/constants/colors'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { useAuth } from '@/hooks/useAuth'
import { Text } from '@/components/Text'
import { FontAwesome6 } from '@expo/vector-icons'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const { user, logout, logoutStatus } = useAuth()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: '#194976'
        },
        tabBarStyle: {
          backgroundColor: '#194976'
        },
        headerTitle: '',
        headerRight: () => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: 20,
              width: '100%'
            }}
          >
            <View>
              <Image
                source={require('../../assets/images/extendedLogo.png')}
                style={styles.image}
              />
            </View>
            <View
              style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}
            >
              {user ? (
                <TouchableOpacity style={styles.button} onPress={() => logout()} disabled={logoutStatus === 'pending'}>
                  <Text>Log out</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <Link href="/login" asChild>
                    <TouchableOpacity style={styles.button}>
                      <Text>Log in</Text>
                    </TouchableOpacity>
                  </Link>
                  <Link href="/signup" asChild>
                    <TouchableOpacity style={styles.button}>
                      <Text>Sign up</Text>
                    </TouchableOpacity>
                  </Link>
                </>
              )}
            </View>
          </View>
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Rental listings',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house" size={20} className="text-primary-foreground -mb-[3px]" />
          ),
          tabBarLabelStyle: { color: '#FFF', fontWeight: 'bold' }
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="map" size={22} className="text-primary-foreground -mb-[3px]" />
          ),
          tabBarLabelStyle: { color: '#FFF', fontWeight: 'bold' }
        }}
      />
      <Tabs.Screen
        name="my-rental-listings"
        options={{
          title: 'My rental listings',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house-user" size={20} className="text-primary-foreground -mb-[3px]" />
          ),
          tabBarLabelStyle: { color: '#FFF', fontWeight: 'bold' }
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 250
  },
  button: {
    backgroundColor: '#ffffff',
    width: 80,
    height: 35,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    fontSize: 15,
    color: '#194976',
    fontWeight: 'bold'
  }
})
