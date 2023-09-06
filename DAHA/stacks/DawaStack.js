import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopScreen from '../screens/ShopScreen';
import ItemScreen from '../screens/ItemScreen';
import NewPostDAWA from '../screens/NewPostDAWA';
import CommentsScreen from '../screens/CommentsScreen';

const DAWAStack = createNativeStackNavigator();


export default function DawaStack() {
  return (
        
    <DAWAStack.Navigator >
      <DAWAStack.Screen name="Shop" component={ShopScreen} />  
      <DAWAStack.Screen name="Item" component={ItemScreen} 
      options={{headerShadowVisible:false,  headerTitle: ""}}/>  
      <DAWAStack.Screen name="New Post" component={NewPostDAWA} />  
      <DAWAStack.Screen name="Comments" component={CommentsScreen} />  
    </DAWAStack.Navigator>
  );
}


