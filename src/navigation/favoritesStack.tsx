import { createStackNavigator } from '@react-navigation/stack'
import ChapterScreen from '../screens/Chapter'
import ReaderScreen from '../screens/Reader'
import FavoritesScreen from '../screens/Favorites'
import internalization from '../services/internalization'
import { useTheme } from 'styled-components'

const Stack = createStackNavigator()

export default function FavoritesStack() {
  const theme = useTheme()

  return (
    <Stack.Navigator initialRouteName="Favorites" screenOptions={{
      gestureEnabled: false,
      animationEnabled: false,
      headerBackTitle: internalization.t('headerBackLabel'),
      headerTintColor: theme.text,
      headerStyle: {
        backgroundColor: theme.background,
      }
    }}>
      <Stack.Screen name="Favorites" options={{ title: internalization.t('favoriteScreenTitle') }} component={FavoritesScreen} />
      <Stack.Screen name="Chapter" options={{ title: '' }} component={ChapterScreen} />
      <Stack.Screen name="Reader" options={{ title: '' }} component={ReaderScreen} />
    </Stack.Navigator>
  )
}