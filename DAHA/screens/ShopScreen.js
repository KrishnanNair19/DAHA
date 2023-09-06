import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl
} from 'react-native';
import Product from '../components/Product';
import { FAB } from 'react-native-paper';
import { db, auth } from '../firebase';
import colors from '../Themes/colors';
import { collection, getDocs, query, orderBy, getDoc, doc, onSnapshot, where } from "firebase/firestore";



export default function ShopScreen({route, navigation}) {


  const [offers, setOffers] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const currentUser = auth.currentUser;
  const userID = currentUser.uid;


  useEffect(() => {
      setRefreshing(true)
      const unsubscribe = onSnapshot(doc(db, "users", userID), async (userDoc) => {
        fetchOffers(userDoc);        
      });
      return () => unsubscribe();

  }, [])


  const fetchOffers = async (userDoc) => {
    if (!userDoc) {
      userDoc = await getDoc(doc(db, "users", userID));
    }
    console.log("Fetching Offers")
    getDocs(query(collection(db, "offers"), 
      orderBy("completed"),
      orderBy("timestamp", "desc"), 
      where("completed", "!=", true))).then((allOffers) => {
      Promise.all(allOffers.docs.map(async (doc) => {
        // let {user, title, description, price, photos, purchaseOptions, completed} = doc.data();
        let {completed, user, title, description, purchaseOptions, price, priceTimeFrame, specifyDates, startDate, endDate, timestamp, photos} = doc.data();
        let userSnapshot = await getDoc(user);
        let {firstName, lastName, email} = userSnapshot.data();
        let displayName = firstName + " " + lastName;
        let id = doc.id;
        let userFavesRefs = userDoc.data().favorites;
        let favorite = false;
        if (userFavesRefs) {
          const userFaves = userFavesRefs.map (ref => ref.id);
          favorite = userFaves.some(item => item=== id)
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
    })
  }

  const addOffer = (newOffer) => {
    newOffer.id = offers.length + 1
    setOffers([newOffer, ...offers])
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
              myShop = {false}
            /> 
          )}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchOffers(null)}
              }
            />
          }
      />

      <FAB
          style = {styles.fab}
          small
          icon = 'plus'
          label = 'Add new post'
          onPress = {()=> navigation.navigate("New Post", {addOffer})}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.peach
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  fab:{
    backgroundColor: colors.orange,
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 10
  }, 
  column: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})