import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './homeStack';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import FavoritesStack from './favoritesStack';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <>
      <Tab.Navigator initialRouteName="HomeStack" screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.tint,
      }}>
        <Tab.Screen name="HomeStack" component={HomeStack} options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <FontAwesome name="home" size={30} color={focused ? Colors.light.tint : 'lightgray'} />,
        }} />
        <Tab.Screen name="FavoriteStack" component={FavoritesStack} options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <FontAwesome name="star" size={30} color={focused ? Colors.light.tint : 'lightgray'} />,
        }} />
      </Tab.Navigator>
    </>

  );
}