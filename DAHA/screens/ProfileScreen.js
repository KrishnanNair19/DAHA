import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react'
import { getAuth } from "firebase/auth";
import colors from '../Themes/colors';
import CustButton from '../components/CustButton';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase.js'


export default function ProfileScreen ({navigation}) {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userID = currentUser.uid;
    const filename = 'users/' + userID + '/profile.jpg'

    const [userInfo, setUserInfo] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const signOut = async () => {
        auth.signOut().then(() => {
            console.log('signed out')
          }).catch((error) => {
            console.log("error")
          });
    }

    useEffect(() => {
        (async () => {
            console.log(currentUser);
            const userDoc = await getDoc(doc(db, "users", userID));
            const userData = userDoc.data();
            console.log("User: " + userData.firstName + " " + userData.lastName);
            setUserInfo(userData);
            setImage(userData.photoURL)
        })();
    }, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.1,
        });


        if (!result.cancelled) {
            let uri = result.uri;
            setImage(uri);
            uploadImage(uri, setLoading);
        }
      };

      const uploadImage = async (uri, setLoading) => {
        let response = await fetch(uri);
        let blob = await response.blob();
        let imageRef = ref(storage, filename);
        setLoading(true);
        await uploadBytes(imageRef, blob);
        let downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'users', userID), {photoURL: downloadURL});
        setLoading(false);
      }
       
    
    return (
        <View style={styles.container}>
            <View style={styles.profilePhoto}>
                {!image ? 
                <Icon
                    name="account" 
                    size={150}
                    color="#666"
                />
                :
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
                }

                <View style={styles.camera}>
                    <Icon
                        name="camera-plus" 
                        size={40}
                        color="#666"
                        backgroundColor={null}
                        onPress={pickImage}
                        disabled={loading}
                    />
                </View>
            </View>

            <Text style={styles.username}>{userInfo.firstName} {userInfo.lastName}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>

            <View style={styles.row}>
                <TouchableOpacity style={styles.sectionButton} onPress={() => navigation.navigate("Requests")}>
                <Image style={styles.buttonImage} source={require('../assets/stock-images/thinking.png')} />
                    <Text style={styles.buttonText}>My Requests</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionButton} onPress={() => navigation.navigate("Offers")}>
                <Image style={styles.buttonImage} source={require('../assets/stock-images/mystore.png')} />
                    <Text style={styles.buttonText}>My Shop</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.signOut}>
            <CustButton label="Sign Out" onPress={signOut} disabled={false}/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        paddingHorizontal: 20,
        overflow: 'hidden'
    },

    username: {
        fontFamily: "Lato-Bold",
        fontSize: 30,
        marginBottom: 10
    },
    sectionButton: {
        flex: 1,
        padding: 20,
        margin: 10,
        backgroundColor: 'snow',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    buttonImage: {
        height: 150,
        aspectRatio: 1
    },
    buttonText: {
        fontFamily: "Montserrat-Bold"
    },
    signOut: {
        width: '100%',
        position: 'absolute',
        bottom: 30
    },
    camera: {
        position: 'absolute',
        left: 210,

    },
    image: {
        resizeMode: 'cover',
        height: 200,
        width: 200, 
        borderRadius: 100,
        borderColor: colors.orange, 
        borderWidth: 3

    },
    profilePhoto: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: colors.orange,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "#ccc"
    },
    email: {
        fontFamily: "Lato-Light",
        fontSize: 20,
        marginBottom: 15
    }        
})