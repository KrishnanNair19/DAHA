import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {TextInput} from 'react-native-paper'
import colors from '../Themes/colors';
import CheckBoxLabeled from '../components/CheckBoxLabeled';
import CalendarPicker from 'react-native-calendar-picker';
import CustButton from '../components/CustButton';
import { collection, doc, addDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../firebase.js'

export default function NewRequestScreen({route, navigation}) {

    const { fetchRequests } = route.params;

    const [request, setRequest] = useState('');
    const [purchaseOptions, setPurchaseOptions] = useState([false, false]);
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [disabled, setDisabled] = useState(true)

    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (request && (purchaseOptions[0] || purchaseOptions[1]) && startDate) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
      }, [request, purchaseOptions, startDate]);

   
    const handleClick = (index, newValue) => {
        let temp = [...purchaseOptions]
        temp[index] = newValue
        setPurchaseOptions(temp)
    }

    const postRequest = async () => {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            const requestTimestamp = Timestamp.fromDate(new Date());
            const startTimestamp = Timestamp.fromDate(startDate.toDate());
            const endTimestamp = endDate ? Timestamp.fromDate(endDate.toDate()) : null;
            const newRequest = {
                user: userRef,
                text: request,
                buy: purchaseOptions[0],
                rent: purchaseOptions[1],
                completed: false,
                timestamp: requestTimestamp,
                startDate: startTimestamp,
                endDate: endTimestamp
            }
            const requestRef = await addDoc(collection(db, "requests"), newRequest);

            await updateDoc(userRef, {
                requests: arrayUnion(requestRef)
            });
            
            fetchRequests();
            // addRequest(newRequest);
            navigation.pop();
        } catch (err) {
            console.log(err);
        }
    }


    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
          setEndDate(date)
        } else {
          setStartDate(date)
        }

    }

    const minDate = new Date(); // Today
    const maxDate = new Date(2024, 6, 3);
    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView contentContainerStyle={styles.requestContainer}>
                <Text style={styles.dahaTitle}> Does anyone have a... </Text>
                <TextInput 
                    multiline={true}
                    backgroundColor='snow'
                    activeUnderlineColor={colors.orange}
                    onChangeText={(request) => setRequest(request)}
                    value={request}
                    style={styles.requestTextBox}
                   scrollEnabled={true}
                   maxHeight={60}
                /> 

                <Text style={styles.sectionHeaders}>I would like to...</Text>

                <View style={styles.buyingOptionsRow}>
                <CheckBoxLabeled
                    label = {"Buy"}
                    purchaseOptions={purchaseOptions}
                    handleClick={handleClick}
                    index={0}
                />

                <CheckBoxLabeled
                    label = {"Rent"}
                    purchaseOptions={purchaseOptions}
                    handleClick={handleClick}
                    index={1}
                />
                </View>



                <Text style={styles.sectionHeaders}>Desired Time Frame:</Text>

                <View style={styles.calendar}>
                <CalendarPicker
                    allowRangeSelection={purchaseOptions[1] ? true : false}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor={colors.sandstone}
                    selectedDayColor={colors.dandelions}
                    selectedDayTextColor="#000"
                    onDateChange={onDateChange}
                    style={styles.calendar}
                />
                </View>
                
                <CustButton 
                    label="Post"   
                    onPress={() => postRequest()}
                    disabled={disabled}
                    style={styles.postButton}
                />

                
            </ScrollView>
        </TouchableWithoutFeedback>
    )
    
}

const styles = StyleSheet.create({
    dahaTitle: {
        marginVertical: 10,
        fontFamily: "Montserrat-SemiBold", 
        fontSize: 24, 
        color: colors.orange
    },
    requestContainer: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10,
        paddingHorizontal: 20,
        // backgroundColor: colors.peach
        
    },
    requestTextBox: {
        fontFamily: "Lato-Regular",
        fontSize: 16, 
        marginBottom: 20,
    },
    sectionHeaders: {
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 20, 
        color: colors.orange,
        marginBottom: 10,
    },
    buyingOptionsRow: {
        flexDirection: 'row',
        marginBottom: 25,

    },
    calendar: {
        marginBottom: 15,
    },
    postButton: {
        marginBottom: 10
    }

})