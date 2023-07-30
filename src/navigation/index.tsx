import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './homeStack'
import { FontAwesome } from '@expo/vector-icons'
import FavoritesStack from './favoritesStack'
import UserConfigScreen from '../screens/UserConfig'
import { useTheme } from 'styled-components'

const Tab = createBottomTabNavigator()

export default function MyTabs() {
  const theme = useTheme()

  return (
    <>
      <Tab.Navigator initialRouteName="HomeStack" screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarStyle: {
          backgroundColor: theme.background
        },
        headerTintColor: theme.text,
        headerStyle: {
          backgroundColor: theme.background,
        }
      }}>
        <Tab.Screen name="HomeStack" component={HomeStack} options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => <FontAwesome name="home" size={30} color={focused ? theme.tint : 'lightgray'} />,
        }} />
        <Tab.Screen name="FavoriteStack" component={FavoritesStack} options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => <FontAwesome name="star" size={30} color={focused ? theme.tint : 'lightgray'} />,
        }} />
        <Tab.Screen name="ConfigStack" component={UserConfigScreen} options={{
          tabBarLabel: '',
          title: 'User config',
          tabBarIcon: ({ focused }) => <FontAwesome name="gear" size={30} color={focused ? theme.tint : 'lightgray'} />,
        }} />
      </Tab.Navigator>
    </>
  )
}