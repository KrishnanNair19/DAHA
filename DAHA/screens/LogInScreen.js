import { Text, View, StyleSheet, Button, Image, KeyboardAvoidingView} from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 
import colors from '../Themes/colors';
import CustButton from '../components/CustButton';
import { TextInput, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LogInScreen ({navigation}) {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const loginUser = async () => {
    if (email.length === 0 || password.length === 0) {
      setLoginError("Please fill out all fields!");
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setLoginError("Wrong password");
      } else if (err.code === "auth/user-not-found") {
        setLoginError("No associated user account");
      } else if (err.code === "auth/invalid-email") {
        setLoginError("Invalid email");
      } else if (err.code === "auth/unverified-email") {
        setLoginError("Email not verified");
      }
      setLoading(false);
      console.log(err.code);
    }
  }

  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
  
        <Text style={styles.title}>DAHA?</Text>
        <Text style={styles.caption}>A simpler way to shop and sell your belongings at Stanford</Text>

     
        <Image style={styles.thinking} source={require('../assets/stock-images/thinking.png')} />
        
      <HelperText type="error" visible={loginError}>
        {loginError}
      </HelperText>

      <View style={styles.inputContainerView}>

      <TextInput
        style={styles.textinput}
        label="Email Address"
        backgroundColor='snow'
        activeUnderlineColor={colors.orange}
        onChangeText={onChangeEmail}
        value={email}
        />  

      <TextInput
        style={styles.textinput}
        label="Password"
        backgroundColor='snow'
        secureTextEntry
        activeUnderlineColor={colors.orange}
        onChangeText={onChangePassword}
        value={password}
        />      
     
     </View>


      <CustButton label={"Login User"} onPress={loginUser} disabled={loading}/>

    <View style={styles.newUserRow}>
      <Text style={styles.newUser}>New User?</Text><Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} disabled={loading}/>
      </View>
    
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textinput: {
    fontFamily: "Lato-Regular",
    fontSize: 16, 
    width: '100%',
    marginBottom: 20,
  },
  title: {
      fontFamily: "Montserrat-Bold",
      fontSize: 46,
      color: colors.orange, 
      marginBottom: 10, 

  },
  thinking: {
      height: 250, 
      width: 250
  },
  inputLabel: {
    fontFamily: 'Montserrat-Bold', 
    fontSize: 18, 
    // color: colors.orange,
    marginBottom: 5,
    alignSelf: 'flex-start'
},
inputContainerView: {
    width: '80%',
},
caption: {
    paddingHorizontal: 30,
    textAlign: 'center',
    fontSize: 16
},
newUserRow: {
    position: 'absolute', 
    bottom: 30,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
},
newUser: {
    textAlignVertical: 'center',
    fontSize: 16
},

});
