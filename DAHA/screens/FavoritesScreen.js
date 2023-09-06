import { View, Text, SafeAreaView, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react'
import Product from '../components/Product';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js'
import colors from '../Themes/colors';

export default function FavoritesScreen () {
    const [favorites, setFavorites] = useState([])
    const auth = getAuth();
    const [refreshing, setRefreshing] = useState(false);
    const currentUser = auth.currentUser;
    const userID = currentUser.uid;
    useEffect(() => {
        (async () => {
            setRefreshing(true)
            const unsubscribe = onSnapshot(doc(db, "users", userID), async (userDoc) => {
                fetchFavorites(userDoc);
            });
            return () => {
                unsubscribe();
            }
            })();
    }, [])

    const fetchFavorites = async (userDoc) => {
      console.log("Fetching Favorites")
      if (!userDoc) {
        userDoc = await getDoc(doc(db, "users", userID));
      }
      let favArray = userDoc.data().favorites;
      let favList = [];
      if (favArray) {
        for (let i = favArray.length-1; i >= 0; i--) {
            let favDoc = await getDoc(favArray[i]);
            let favData = favDoc.data();
            if (favData) {
              let sellerDoc = await getDoc(favData.user);
              let sellerFirst = sellerDoc.data().firstName;
              let sellerLast = sellerDoc.data().lastName;
              let favEntry = {
                user: sellerFirst + " " + sellerLast,
                email: favData.email,
                title: favData.title,
                description: favData.description,
                price: favData.price,
                photos: favData.photos,
                purchaseOptions: favData.purchaseOptions,
                priceTimeFrame: favData.priceTimeFrame,
                specifyDates: favData.specifyDates,
                startDate: favData.startDate,
                endDate: favData.endDate,
                timestamp: favData.timestamp,
                completed: favData.completed,
                id: favDoc.id,
                favorite: true
              };                
              favList = [favEntry, ...favList];
            } 
          }
          setRefreshing(false);
          setFavorites(favList);
          }
    }

    return(
        <SafeAreaView style = {styles.container}>
          
    
          <FlatList 
          numColumns={2}
          data = {favorites} 
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
                fetchFavorites(null)}
              }
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