import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LogBox } from 'react-native';
import Constants from 'expo-constants';
import colors from './Themes/colors';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DahaStack from './stacks/DahaStack';
import { DawaStack, FavoritesStack, ProfileStack, SignInStack } from './stacks';
import {auth} from "./firebase"
export default function App() {

  let [fontsLoaded] = useFonts({

    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'), 
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'), 
    'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'), 
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'), 
    'Montserrat-LightItalic': require('./assets/fonts/Montserrat-LightItalic.ttf'), 
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-MediumItalic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),


    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
    'Lato-LightItalic': require('./assets/fonts/Lato-LightItalic.ttf'),
  });

  const[user, setUser] = useState(true);
  const [initializing, setInitializing] = useState(true);

  LogBox.ignoreAllLogs();

  function onAuthStateChanged(user) {
    console.log(user);
    if (user == null || user.emailVerified) {
      setUser(user);
      if (initializing) setInitializing(false);
    } else {
      console.log('Email not verified!'); // possible TODO: user feedback for unverified email
      auth.signOut();
      setUser(null);
      setInitializing(false);
      return ( 
        <SafeAreaProvider>
          <NavigationContainer>
            <SignInStack/>
          </NavigationContainer>
        </SafeAreaProvider>
        )
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const Tab = createBottomTabNavigator();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!user) {
    return ( 
    <SafeAreaProvider>
      <NavigationContainer>
        <SignInStack/>
      </NavigationContainer>
    </SafeAreaProvider>
    )
  }

  return (

    //comment out the rest of the code and uncomment out the signup screen to see
    //them
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'DAHA') {
                return <MaterialCommunityIcons name="comment-question" size={size} color={color} />
              } else if (route.name === 'Favorites') {
                return <MaterialCommunityIcons name="heart" size={size} color={color} />
              } else if (route.name === 'DAWA') {
                return <MaterialCommunityIcons name="cart" size={size} color={color} />
              }
              else if (route.name === 'Profile') {
                return <MaterialCommunityIcons name="account" size={size} color={color} />
              }


              // You can return any component that you like here!
              return <MaterialCommunityIcons name='account' size={size} color={color} />;
            },
            tabBarActiveTintColor: '#9BA773',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="DAHA" component={DahaStack} />
          <Tab.Screen name="DAWA" component={DawaStack} />
          <Tab.Screen name="Favorites" component={FavoritesStack} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.merino,
    padding: 10,

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
