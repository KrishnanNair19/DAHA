import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const SigninStack = createNativeStackNavigator();


export default function SignInStack() {
  return (
        
    <SigninStack.Navigator >
      <SigninStack.Screen 
        name="LogIn" 
        component={LogInScreen} 
        options={{headerShown: false}}
    /> 
      <SigninStack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{headerShadowVisible:false,  headerTitle: "", headerBackTitleVisible: false}}
        /> 
    </SigninStack.Navigator>
  );
}
