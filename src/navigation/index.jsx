import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import Load from '../components/Load';
import { ApplicationContext } from '../contexts/Application';
import SearchStack from './searchStack';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const {isLoading} = useContext(ApplicationContext)
  return (
    <> 
      <Tab.Navigator initialRouteName="Search" screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
        <Tab.Screen name="Search" component={SearchStack} />
      </Tab.Navigator>
      {isLoading && <Load/>}
    </>
   
  );
}