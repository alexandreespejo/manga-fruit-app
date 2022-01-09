import { createStackNavigator } from '@react-navigation/stack';
import ChapterScreen from '../screens/Chapter';
import SearchScreen from '../screens/Search';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Chapter" component={ChapterScreen} />
    </Stack.Navigator>
  );
}