import { createStackNavigator } from '@react-navigation/stack';
import ChapterScreen from '../screens/Chapter';

const Stack = createStackNavigator();

export default function MangaStack() {
  return (
    <Stack.Navigator initialRouteName="Chapter" screenOptions={{
      headerShown: false,
      gestureEnabled: false,
      animationEnabled:false,
    }}>
      <Stack.Screen name="Chapter" component={ChapterScreen} />
      <Stack.Screen name="Reader" component={ChapterScreen} />
    </Stack.Navigator>
  );
}