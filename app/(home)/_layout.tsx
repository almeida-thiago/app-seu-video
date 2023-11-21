import { Tabs } from 'expo-router/tabs'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { TabCameraButton } from '@/components/buttons/TabCameraButton'
import { TAB_MENU } from '@/constants/tab-menu'
import { TabMenuItem } from '@/models/core'

const styles = StyleSheet.create({
  container: {
    paddingRight: 120,
    paddingLeft: 20,
    paddingVertical: 10,
    height: Platform.OS === 'android' ? 80 : 90,
    paddingBottom: Platform.OS === 'android' ? 20 : 30,
    position: 'relative',
  },
})

function Tab({ icon, label, link }: TabMenuItem) {
  return (
    <Tabs.Screen
      key={link}
      name={link}
      options={{
        tabBarLabel: label,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => (
          <Icon name={icon} color={color} size={size} />
        ),
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}
    />
  )
}

export default function homeLayout() {
  return (
    <>
      <TabCameraButton />
      <Tabs screenOptions={{ tabBarStyle: styles.container }}>
        {TAB_MENU.map(Tab)}
      </Tabs>
    </>
  )
}
