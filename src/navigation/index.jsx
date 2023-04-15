import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import Load from '../components/Load';
import { ApplicationContext } from '../contexts/Application';
import SearchStack from './searchStack';
import Colors from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const { isLoading } = useContext(ApplicationContext);

  return (
    <>
      <Tab.Navigator initialRouteName="HomeStack" screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        tabBarActiveTintColor: Colors.light.tint,
      }}>

        {/* <Tab.Screen name="SearchStack" component={SearchStack} options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" color={color} size={size} />
          ),
        }} /> */}
        <Tab.Screen name="HomeStack" component={SearchStack} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => null,
        }} />
        <Tab.Screen name="FavoriteStack" component={SearchStack} options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => null,
        }} />

      </Tab.Navigator>
      {isLoading && <Load />}
    </>

  );
}