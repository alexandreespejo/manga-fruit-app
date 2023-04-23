import { createStackNavigator } from '@react-navigation/stack'
import ChapterScreen from '../screens/Chapter'
import ReaderScreen from '../screens/Reader'
import FavoritesScreen from '../screens/Favorites'

const Stack = createStackNavigator()

export default function FavoritesStack() {
  return (
    <Stack.Navigator initialRouteName="Favorites" screenOptions={{
      gestureEnabled: false,
      animationEnabled: false,
    }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Chapter" component={ChapterScreen} />
      <Stack.Screen name="Reader" component={ReaderScreen} />
    </Stack.Navigator>
  )
}