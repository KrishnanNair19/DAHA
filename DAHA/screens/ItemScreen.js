import CarouselCards from "../components/CarouselCards";
import React , {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView , Pressable} from "react-native";
import colors from "../Themes/colors";
import CustButton from "../components/CustButton";
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ItemScreen ({ route, navigation }) {

   
    // const { productId,name,seller,price,description} = route.params;
    const {completed, description, email, endDate, favorite, id, photos, price, priceTimeFrame, purchaseOptions, specifyDates, startDate, timestamp, title, user} = route.params
    console.log(route.params)
    const [isFavorite, setFavorite] = useState(favorite);
    const currentUser = auth.currentUser;
    const userID = currentUser.uid;
    const userRef = doc(db, "users", userID);


    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "users", userID), async (userDoc) => {
            let userFavesRefs = userDoc.data().favorites;
            if (userFavesRefs) {
                const userFaves = userFavesRefs.map (ref => ref.id);
                let newFavorite = userFaves.some(item => item === id)
                setFavorite(newFavorite)
            }        
          });
        return () => unsubscribe();
    })

    let options = { month: 'long', day: 'numeric' };


    let timeFrame;

    if (startDate) {
        let printedStartDate = new Intl.DateTimeFormat('en-US', options).format(startDate.toDate());
        
        if (endDate == null) {
            timeFrame = printedStartDate
        } else {
            let printedEndDate = new Intl.DateTimeFormat('en-US', options).format(endDate.toDate());
            timeFrame = printedStartDate + " to " + printedEndDate;
        }
    }

    else {
        timeFrame = "As soon as possible"
    }

    let priceDisplay;
    let monetaryTimeFrame;

    if (purchaseOptions === "Rent") {
        priceDisplay = "$" + price;
        monetaryTimeFrame = priceTimeFrame != "for specified date range" ? priceTimeFrame : "custom date range";
    }
    else {
        priceDisplay = "$" + price
    }

    const toggleFavorite = async () => {
        const userDoc = await getDoc(userRef);
        const favArray = await userDoc.get("favorites");
        if (favArray) {
           if (isFavorite) {
                const favFilt = favArray.filter(item => item.id != id)
                await updateDoc(userRef, {favorites: favFilt})
            } else {
                const newFavRef = doc(db,"offers", id);
                let contains = false;
                favArray.forEach(item => {if (item.path == newFavRef.path) contains = true;})
                if (!contains) {
                    const newFavs = [newFavRef, ...favArray];
                    await updateDoc(userRef, {favorites: newFavs})
                }
                
            } 
        } else {
            const newFavRef = doc(db,"offers", id);
            await updateDoc(userRef, {favorites: [newFavRef]})
        }
    }
    

    return (
        <SafeAreaView >
            <ScrollView style = {styles.container} >
  
            <CarouselCards images = {photos}/>
           
  

            <View style={styles.itemInfo}>

                <View style={styles.titleRow}>
                    <Text style = {styles.header}>{title}</Text> 
                    <Pressable onPress={toggleFavorite} style={{alignSelf: 'flex-start'}}>
                        <MaterialCommunityIcons name={isFavorite? "heart" : "heart-outline"} color={isFavorite? "red" : "black"} size= {25}/>
                    </Pressable>

                </View>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="account-circle" size={24} color="grey"/>
                    <Text style = {styles.person}> {user} ({email})</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar" size={24} color="grey"/>
                    <Text style = {styles.person}> {timeFrame}</Text>
                </View>

                
                <Text style = {styles.text}>{description} </Text>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>{priceDisplay}</Text>
                    <Text style={styles.person}>{monetaryTimeFrame}</Text>
                </View>
                
                

                

                <View>
                    <CustButton 
                        label="Comments"
                        onPress={() => {
                            navigation.navigate("Comments", {
                              productId: id
                            });
                        }}
                        disabled={false}
                    >
                    </CustButton>
                </View>
            
            </View>

                </ScrollView>
        </SafeAreaView>

    )



}

const styles =  StyleSheet.create({
    price: {
        fontSize: 24,
        marginBottom: 10,
        color: colors.orange,
        fontFamily: "Montserrat-Bold",
        marginRight: 5,

    },
    container: {
        //justifyContent: "flex-start",
        backgroundColor: "white",
        height: "100%"
        
    },
    header: {
        //alignItems: "baseline",
        fontFamily:"Montserrat-Bold",
        marginBottom: 5,
        fontSize: 24,
        width: '85%',
        marginRight: 10
    }, 
    person: {
        fontFamily: "Lato-Light",
        fontSize: 18,
        textAlignVertical: 'center',
        

    }, 
    buybutton: {
        width: 50,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#AAB290',
        margin: 10
    },
    rentbutton: {
        width: 50,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#93C1C3',
        margin: 10
    },
    buttons: {
        width: 150,
        flexDirection: "row",

    },
    text: {
        marginVertical: 10,
        fontSize: 18,

    },
    comments: {
        alignItems: "center",
        backgroundColor: "orange",
        borderRadius: 10,
        width: 150,
        height: 50,
        justifyContent: "space-around",
        margin: 10,
        alignSelf: "center",
        marginBottom: 20

    },
    itemInfo: {
        flexGrow: 1,
        padding: 20, 
        backgroundColor: colors.peach,
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25,
        shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row'
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        marginBottom: 20,
    },
}

)

