import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsScreen from '../screens/ChatsScreen.js';

const ChatStack = createNativeStackNavigator();


export default function ChatsStack() {
  return (
        
    <ChatStack.Navigator >
      <ChatStack.Screen name="DAHA" component={ChatsScreen} /> 
    </ChatStack.Navigator>
  );
}
