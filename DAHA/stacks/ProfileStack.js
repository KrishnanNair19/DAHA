import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen.js';
import MyRequestsScreen from '../screens/MyRequestsScreen.js';
import MyOffersScreen from '../screens/MyOffersScreen.js';
import ItemScreen from '../screens/ItemScreen.js';

const ProfStack = createNativeStackNavigator();

export default function ProfileStack() {
  return ( 
    <ProfStack.Navigator >
      <ProfStack.Screen name="Profile" component={ProfileScreen} />
      <ProfStack.Screen name="Requests" component={MyRequestsScreen} />
      <ProfStack.Screen name="Offers" component={MyOffersScreen} />
      <ProfStack.Screen name="Item" component={ItemScreen} />
    </ProfStack.Navigator>
  );
}
