import * as React from 'react';
import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native';
import colors from "../Themes/colors";
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase.js'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CommentCard({ userId, comment, numLikes, dateTime}) {
  
  const [userFullName, setUserFullName] = useState("")

  useEffect(() => {
      (async () => {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.data().firstName && userDoc.data().lastName) {
            const fullName = userDoc.data().firstName + " " + userDoc.data().lastName;
            setUserFullName(fullName);
        }
      })();
  }, [])



  return (

    <View style={styles.card}>

     

      <View style = {styles.profilepic}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
          }}
        />

      </View>

      <View style = {styles.writing}> 
        <Text style={styles.userFullName}> {userFullName}</Text>
        <Text style={styles.comment}> {comment} </Text>  
      </View>
        
      
       
    </View> 
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: 'flex-start',
    width: '100%', 
    padding: 10,
    backgroundColor: colors.peach,
    borderRadius: 25, 
    marginBottom: 10
  },

  userFullName: {
    fontSize: 12, 
    fontFamily: "Lato-Regular", 
    color: "black",
    marginBottom: 5,  
    marginTop: 5,
    fontWeight: "bold"
  },

  comment: {
    marginBottom: 5,
    fontSize: 18, 
    fontFamily: "Lato-Regular", 
    
  }, 
  profilepic : {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 25
  }, 
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25

  }, 
  writing: {
    width: "70%"
  }


});