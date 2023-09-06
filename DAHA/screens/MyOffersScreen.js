import * as React from 'react';
import { useEffect, useState } from 'react'
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    RefreshControl
  } from 'react-native';
import Product from '../components/Product';
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db, auth } from '../firebase.js';
import colors from '../Themes/colors';

export default function MyOffersScreen({navigation}) {

    const [offers, setOffers] = useState([])
    const [refreshing, setRefreshing] = useState(true);
    const currentUser = auth.currentUser;
    const userID = currentUser.uid;

    useEffect(() => {
        setRefreshing(true);
        const unsubscribe = onSnapshot(doc(db, "users", userID), async (userDoc) => {
            fetchOffers(userDoc);
        });
        return () => unsubscribe();
    }, [])

    const fetchOffers = async (userDoc) => {
        console.log("Fetching My Offers")
        if (!userDoc) userDoc = await getDoc(doc(db, "users", userID));
        let offerRefs = (userDoc.data().offers) ? userDoc.data().offers : [];
        let userFavesRefs = userDoc.data().favorites;
        Promise.all(offerRefs.map(async (offerRef) => {
            let offer = await getDoc(offerRef);
            let {completed, user, title, description, purchaseOptions, price, priceTimeFrame, specifyDates, startDate, endDate, timestamp, photos} = offer.data();
            let userSnapshot = await getDoc(user);
            let {firstName, lastName, email} = userSnapshot.data();
            let displayName = firstName + " " + lastName;
            let id = offer.id;
            let favorite = false;
            if (userFavesRefs) {
                const userFaves = userFavesRefs.map (ref => ref.id);
                favorite = userFaves.some(item => item === id)
            }
            return {
                user: displayName,
                email,
                title,
                description,
                price, // int
                photos, // array of URLs **OR** undefined
                purchaseOptions,
                priceTimeFrame,
                specifyDates,
                startDate,
                endDate,
                timestamp,
                completed,
                favorite,
                id
            }
        })).then((data) => {
            setRefreshing(false);  
            setOffers(data);
        });
    }

    return (
        <SafeAreaView style = {styles.container}>
    
            <FlatList 
                numColumns={2}
                data = {offers} 
                columnWrapperStyle={styles.column}
                renderItem = { ( { item } ) => (
                    <Product 
                        product = {item}
                        myShop = {true}
                    /> 
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => { setRefreshing(true); fetchOffers(null); }}
                    />
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: colors.peach
      },
  
      column: {
        justifyContent: 'space-around',
        alignItems: 'center',
      },
  })