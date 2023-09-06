import * as React from 'react';
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import DahaCard from '../components/DahaCard.js';
import colors from '../Themes/colors';
import { doc, getDoc } from "firebase/firestore"
import { db, auth } from '../firebase.js'

export default function MyRequestsScreen({navigation}) {

    const [requests, setRequests] = useState([])
    const currentUser = auth.currentUser;

    useEffect(() => {
        (async () => {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            let allRequests = [];
            let requestRefs = (userDoc.data().requests) ? userDoc.data().requests : [];
            for (let i = 0; i < requestRefs.length; i++) {
                let request = await getDoc(requestRefs[i]);
                if (request.data()) {
                    let tempRef = request.data();
                    tempRef['requestId'] = request.id;
                    allRequests.unshift(tempRef);
                }
            }
            setRequests(allRequests);
        })();
    }, [])

    const renderItem = ({ item }) => (
        <DahaCard 
            userId={item.user.path.substring(6)}
            request={item.text} 
            buy={item.buy}
            rent={item.rent}
            startDate={item.startDate}
            endDate={item.endDate}
            requestStatus={item.completed}
            myRequests={true}
            requestId={item.requestId}
            myOffer={true}
        />
      );

    return (

        <View style={styles.container}>
        <FlatList
            style={{marginHorizontal:10, marginTop: 5}}
            data={requests}
            renderItem={renderItem}
            keyExtractor={(item, index) => item + index}
        />
        </View>

    )
}

const styles = StyleSheet.create({
    container :{
        height: '100%',
        backgroundColor: colors.peach,
    }
})
