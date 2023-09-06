import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import colors from '../Themes/colors';
import CustButton from '../components/CustButton';
import { TextInput, HelperText } from 'react-native-paper';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { db, auth } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SignUpScreen ({navigation}) {

  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [password, onChangePassword] = useState("");
  const [email, onChangeEmail] = useState("");
  const [confirmPassword, onChangeConfirmation] = useState("");
  const [disable, setDisable] = useState(false);
  const [signupError, setSignupError] = useState("");

  const register = async () => {
    if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
      setSignupError("Please fill out all fields!");
      return;
    } else if (password !== confirmPassword) {
      setSignupError("Confirmed password must match!");
      return;
    }
    try {
      setDisable(true);
      setSignupError("");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      let uid = userCredential.user.uid;
      await setDoc(doc(db, 'users', uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        photoURL: null,
      });
      
      // auth.signOut();
      navigation.navigate('LogIn');

    } catch (error) {
      if (error.code === "auth/weak-password") {
        setSignupError("Password should be at least 6 characters");
      } else if (error.code === "auth/email-already-in-use") {
        setSignupError("Email already in use!");
      } else if (error.code === "auth/invalid-email") {
        setSignupError("Invalid email");
      }
      setDisable(false);
      console.log(error.code);
    }
  };

  
  return (
    <KeyboardAwareScrollView style={styles.container} extraScrollHeight={20}>
        <Text style={styles.title}>Create An Account</Text>

        <TextInput
        style={styles.textinput}
        label="First Name"
        backgroundColor='snow'
        activeUnderlineColor={colors.orange}
        onChangeText={onChangeFirstName}
        value={firstName}
        />
        
        <TextInput
        style={styles.textinput}
        label="Last Name"
        backgroundColor='snow'
        activeUnderlineColor={colors.orange}
        onChangeText={onChangeLastName}
        value={lastName}
        />

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

        <TextInput
        style={styles.textinput}
        label="Confirm Password"
        backgroundColor='snow'
        secureTextEntry
        activeUnderlineColor={colors.orange}
        onChangeText={onChangeConfirmation}
        value={confirmPassword}
        />  

        { signupError ?
          <HelperText type="error" visible={signupError}>
            {signupError}
          </HelperText>
          : 
          null
        }

        <View style={styles.submit}>
        <CustButton 
            label="Let's Get Started!"
            onPress={register}
            disabled={disable}
            />
        </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  
  textinput: {

    fontFamily: "Lato-Regular",
    fontSize: 16, 
    width: '100%',
    marginBottom: 15,

  },
  title: {
      fontFamily: "Montserrat-Bold",
      fontSize: 36,
      color: colors.orange, 
      marginBottom: 10, 

  },
  thinking: {
      height: '35%', 
      aspectRatio:1
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
submit: {
    marginTop: 20,
    marginBottom: 50
    
}


});
