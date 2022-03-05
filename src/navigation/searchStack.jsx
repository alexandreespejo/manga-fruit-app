import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/Search';
import MangaStack from './mangaStack';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={{
      title:"",
      gestureEnabled: false,
      animationEnabled:false,
    }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="MangaStack" component={MangaStack} />
    </Stack.Navigator>
  );
}