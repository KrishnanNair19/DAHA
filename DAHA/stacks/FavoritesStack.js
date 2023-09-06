import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopScreen from '../screens/ShopScreen';
import ItemScreen from '../screens/ItemScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const FavStack = createNativeStackNavigator();


export default function FavoritesStack() {
  return (
        
    <FavStack.Navigator >
      <FavStack.Screen name="Favorites" component={FavoritesScreen} />
      <FavStack.Screen name="Item" component={ItemScreen} />
    </FavStack.Navigator>
  );
}
