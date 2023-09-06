import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DahaScreen from '../screens/DahaScreen.js'
import NewRequestScreen from '../screens/NewRequestScreen.js'

const DAHAStack = createNativeStackNavigator();


export default function DahaStack() {
  return (
        
    <DAHAStack.Navigator >
      <DAHAStack.Screen name="DAHA" component={DahaScreen} />
      <DAHAStack.Screen name="New Request" component={NewRequestScreen}  />     
    </DAHAStack.Navigator>
  );
}
