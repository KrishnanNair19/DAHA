import * as React from 'react';
import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableWithoutFeedbackBase } from 'react-native';
import colors from "../Themes/colors";
import Tag from "./tags.js";
import { Entypo } from '@expo/vector-icons'; 
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from '../firebase.js'
import CheckBoxHideable from './CheckBoxHideable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DahaCard({userId, request, requestId, buy, rent, startDate, endDate, requestStatus, myRequests}) {
  
  const [userFullName, setUserFullName] = useState("")
  const [reqStatus, setReqStatus] = useState(requestStatus)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
      (async () => {
        const userDoc = await getDoc(doc(db, "users", userId));
        const fullName = userDoc.data().firstName + " " + userDoc.data().lastName;
        const email = userDoc.data().email
        setUserFullName(fullName);
        setUserEmail(email)
      })();
  }, [userId])

  const toggleStatus = () => {
    updateDoc(doc(db, "requests", requestId), {completed: !reqStatus}).then(setReqStatus(!reqStatus));
  } 
  
  let options = { month: 'long', day: 'numeric' };
  let printedStartDate = new Intl.DateTimeFormat('en-US', options).format(startDate.toDate());
  
  let timeFrame;
  /* if (startDate == "ASAP") {
      timeFrame = "As soon as possible"
  } */
  if (endDate == null) {
      timeFrame = printedStartDate
  } else {
      let printedEndDate = new Intl.DateTimeFormat('en-US', options).format(endDate.toDate());
      timeFrame = printedStartDate + " to " + printedEndDate;
  }

  if ((requestStatus != reqStatus) && (myRequests == false)) {
    setReqStatus(requestStatus);
  }

  const iconName = reqStatus ? "check-circle" : "circle-outline"
  const iconColor = reqStatus ? colors.green : colors.orange
  const pricingOptions = buy && rent ? "Buy or Rent" : buy ? "Buy" : "Rent"

  const handlePress = () => {
    if (myRequests) {
      toggleStatus()
    }
  }

  return (
    <View style={styles.card}>
        
        <View style={styles.reqStatus}>
          <MaterialCommunityIcons name={iconName} size={24} color={iconColor} onPress={handlePress}/>
        </View>

        <View style={styles.cardInfo}>
        <Text style={styles.userFullName}> {userFullName} ({userEmail})</Text>
        
        <Text style={styles.requestBody}> Does anyone have a ... {request} </Text>

        <View style={styles.infoRow}>
            <MaterialCommunityIcons name="calendar" size={24} style={styles.icon}/>
            <Text>{timeFrame}</Text>
        </View>

        <View style={styles.infoRow}>
            <MaterialCommunityIcons name="tag" size={24} style={styles.icon}/>
            <Text>{pricingOptions}</Text>
        </View>
      
          {/* <CheckBoxHideable hidden={!myRequests} handleClick={toggleStatus} checked={reqStatus} textOptions={["Complete", "Incomplete"]}/> */}
        </View>


    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
    shadowOpacity: 0.3,
    shadowRadius: 5.46,
    elevation: 9,
  },
  reqStatus: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flexDirection: "column", 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    width:'80%',
    paddingVertical: 10,
    
   // borderWidth: 2,
  //  borderColor: colors.orange,
  },

  userFullName: {
    fontSize: 12, 
    fontFamily: "Lato-Regular", 
    color: colors.grey,
    marginBottom: 5,  
    marginTop: 5
  },

  requestBody: {
    fontSize: 18, 
    fontFamily: "Lato-Regular",
    marginBottom: 5,
    marginLeft: -3
  }, 

  timeFrame: {
    fontFamily: "Lato-Regular",
    marginBottom: 5
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  icon: {
    marginRight: 5
  }



});