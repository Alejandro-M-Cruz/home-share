import * as React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import {
  Image,
  Button,
  Pressable,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Colors from '@/constants/colors'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { useAuth } from '@/hooks/useAuth'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
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
              paddingRight: 20, // Agrega un espacio a los lados para separar los elementos del borde de la pantalla
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
                <Button
                  title="Log out"
                  onPress={() => logout()}
                  disabled={logoutStatus === 'pending'}
                />
              ) : (
                <>
                  <Link href="/login" asChild>
                    <TouchableOpacity style={styles.button}>
                      Log in
                    </TouchableOpacity>
                  </Link>
                  <Link href="/signup" asChild>
                    <TouchableOpacity style={styles.button}>
                      Sign up
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
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color="#FFF" />,
          tabBarLabelStyle: { color: '#FFF', fontWeight: 'bold' }
        }}
      />
      <Tabs.Screen
        name="rental-listings"
        options={{
          title: 'Rental Listings',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color="#FFF" />,
          tabBarLabelStyle: { color: '#FFF', fontWeight: 'bold' }
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color="#FFF" />,
          tabBarLabelStyle: { color: '#FFF', fontWeight: 'bold' }
        }}
      />
      <Tabs.Screen
        name="my-rental-listings"
        options={{
          title: 'My Rental Listings',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color="#FFF" />,
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
