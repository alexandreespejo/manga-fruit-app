import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from '../screens/Search'
import ChapterScreen from '../screens/Chapter'
import ReaderScreen from '../screens/Reader'
import internalization from '../services/internalization'
import HomeScreen from '../screens/Home'

const Stack = createStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      gestureEnabled: false,
      animationEnabled: false,
      headerBackTitle: internalization.t('headerBackLabel')
    }}>
      <Stack.Screen name="Home" options={{ title: internalization.t('homeScreenTitle') }} component={HomeScreen} />
      <Stack.Screen name="Search" options={{ title: '' }} component={SearchScreen} />
      <Stack.Screen name="Chapter" options={{ title: '' }} component={ChapterScreen} />
      <Stack.Screen name="Reader" options={{ title: '' }} component={ReaderScreen} />
    </Stack.Navigator>
  )
}