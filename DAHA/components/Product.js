import { React, useEffect, useState } from "react";
import {View, Text, Image, StyleSheet, Pressable, ImageBackground} from "react-native";
import { Button, TouchableOpacity} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import CheckBoxHideable from './CheckBoxHideable';
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.js'
import colors from "../Themes/colors.js";

export default function Product({product, myShop}) {

        const navigation = useNavigation(); 
        const {title, user, price, photos, favorite, id, description, completed, purchaseOptions, priceTimeFrame, specifyDates, startDate, endDate} = product
        const [isFavorite, setFavorite] = useState(favorite);
        const [soldStatus, setSoldStatus] = useState(completed);
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const userID = currentUser.uid;
        const userRef = doc(db, "users", userID);

        useEffect(() => {
            if (favorite != isFavorite) {
                setFavorite(favorite);
            }
        })

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
            
            setFavorite(favorite);            
        }

        const toggleSoldStatus = () => {
            updateDoc(doc(db, "offers", id), {completed: !soldStatus}).then(setSoldStatus(!soldStatus));
        }

        
        let options = { month: 'short', day: 'numeric' };
        let priceDisplay;
        let timeFrame;

        if (purchaseOptions === "Rent" && priceTimeFrame !== "for specified date range") {
            priceDisplay = "$" + price;
            timeFrame = priceTimeFrame;
        }
        else if (purchaseOptions === "Rent" && priceTimeFrame === "for specified date range") {
            let printedStartDate = new Intl.DateTimeFormat('en-US', options).format(startDate.toDate());
            
            /* if (startDate == "ASAP") {
                timeFrame = "As soon as possible"
            } */
            if (endDate == null) {
                timeFrame = printedStartDate;
            } else {
                let printedEndDate = new Intl.DateTimeFormat('en-US', options).format(endDate.toDate());
                timeFrame = printedStartDate + " to " + printedEndDate;
            }
            priceDisplay = "$" + price;
        }
        else {
            priceDisplay = "$" + price;
        }

        return (
            <TouchableOpacity 
                style = {styles.card}
                onPress={() => {
                  
                    navigation.navigate("Item", {
                      productId: id,
                      name:title,
                      seller: user, 
                      price: price,
                      description:description,
                      images: photos
                    });

                    navigation.navigate("Item", product);
                }}
            >
                {
                    completed ? 
                    <ImageBackground style = {styles.imgBackGround} imageStyle={{opacity: 0.3}} source = {{ uri: photos? photos[0] : undefined}}>
                        <View>
                        <Text style={styles.soldText}>SOLD</Text>
                        </View>
                    </ImageBackground>
                    :
                    <Image style = {styles.itemimg} source = {{ uri: photos? photos[0] : undefined}}/>
                }
                
                <Text style = {styles.itemTitle} numberOfLines={1}> {title}</Text>
                <Text style = {styles.itemSeller}> {user}</Text>
                
                <View style = {styles.iconline}>
                    <Text style = {styles.price}>{priceDisplay}</Text>
                    <Text style = {styles.timeFrame}>{timeFrame? timeFrame : ""}</Text>
                    <Pressable onPress={toggleFavorite}>
                        <MaterialCommunityIcons name={isFavorite? "heart" : "heart-outline"} color={isFavorite? "red" : "black"} size= {25}/>
                    </Pressable>
                </View> 
                <CheckBoxHideable hidden={!myShop} handleClick={toggleSoldStatus} checked={soldStatus} textOptions={["Sold", "Sold"]}/>
            </TouchableOpacity>
            
            
        )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        width: '47%',
        margin: 10, 
        padding: 10, 
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 6,
            },
        shadowOpacity: 0.5,
        shadowRadius: 5.46,
        elevation: 9,
    },
    buttons: {
        justifyContent: "space-evenly",
        flexDirection: "row",
        width: 150

    },
    buybutton: {
        width: 50,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#AAB290'
    },
        rentbutton: {
        width: 50,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#93C1C3',
    },
    price: {
        color: colors.orange,
        textAlign: "left",
        fontWeight:"bold",
        fontSize: 18
    },
    iconline: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    itemimg: { 
        width: '100%',
        height: 250, 
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginBottom: 5
    },
    itemTitle: {
        // textAlign: "left", 
        fontWeight:"bold",
        fontSize: 16,
        marginBottom: 2
    },
    itemSeller: {
        fontFamily: "Lato-Light",
        marginBottom: 2
    },
    imgBackGround: {
        width: '100%',
        height: 250, 
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginBottom: 5, 
        justifyContent: "center",
        alignItems: 'center',
    },
    soldText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 25,
        color: "black",
        opacity: 1,

    },
    timeFrame: {
        fontWeight: "normal"
    }

    }
)