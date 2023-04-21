import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/Search';
import ChapterScreen from '../screens/Chapter';
import ReaderScreen from '../screens/Reader';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={{
      title: "",
      gestureEnabled: false,
      animationEnabled: false,
    }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Chapter" component={ChapterScreen} />
      <Stack.Screen name="Reader" component={ReaderScreen} />
    </Stack.Navigator>
  );
}