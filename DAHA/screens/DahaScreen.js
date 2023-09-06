import * as React from 'react';
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, SafeAreaView, RefreshControl, View, TouchableOpacity, Text } from 'react-native';
import DahaCard from '../components/DahaCard.js';
import {FAB} from "react-native-paper";
import { collection, getDocs, query, orderBy, where} from "firebase/firestore"
import { db } from '../firebase.js'
import colors from '../Themes/colors.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DahaScreen({navigation}) {

    const [requests, setRequests] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [sort, setSort] = useState("Latest")
    const [filter, setFilter] = useState("All")
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
    {label: 'All', value: 'All', icon: () => <MaterialCommunityIcons name="filter" icon={24}/>},
    {label: 'Complete', value: 'Complete', icon: () => <MaterialCommunityIcons name="filter" icon={24}/>},
    {label: 'Incomplete', value: 'Incomplete', icon: () => <MaterialCommunityIcons name="filter" icon={24}/>}
    ]);

    useEffect( () => {
        fetchRequests();
    }, [sort, filter])

    const fetchRequests = () => {
        setRefreshing(true);
        const requestsRef = collection(db, "requests");
        var q;
        if (sort === "Latest") {
            if (filter === "All") {
                q = query(requestsRef, orderBy("timestamp", "desc"));
            }
            else if (filter === "Complete") {
                q = query(requestsRef, where("completed", "!=", false), orderBy("completed"), orderBy("timestamp", "desc"))
            }
            else {
                q = query(requestsRef, where("completed", "!=", true), orderBy("completed"), orderBy("timestamp", "desc"));
            }
        }
        else {
            if (filter === "All") {
                q = query(requestsRef, orderBy("timestamp"));
            }
            else if (filter === "Complete") {
                q = query(requestsRef, where("completed", "!=", false), orderBy("completed"), orderBy("timestamp"));
            }
            else {
                q = query(requestsRef, where("completed", "!=", true), orderBy("completed"), orderBy("timestamp"));
            }
        }
            
        getDocs(q).then(
                (allRequests) => {
                    setRefreshing(false);
                    const data = allRequests.docs.map(document => 
                        addRequestId(document));
                    setRequests(data);
                }
            );
        // getDocs(query(collection(db, "requests"), 
        //     orderBy("timestamp", "desc"))).then(
        //         (allRequests) => {
        //             setRefreshing(false);
        //             const data = allRequests.docs.map(document => 
        //                 addRequestId(document));
        //             setRequests(data);
        //         }
        //     );
    };

    const addRequestId = (doc) => {
        let docTemp = doc.data();
        docTemp['requestId'] = doc.id;
        return docTemp;
    }

    const addRequest = (newRequest) => {
        newRequest.id = requests.length + 1
        setRequests([newRequest, ...requests])
    };

    const renderItem = ({ item }) => (
        <DahaCard 
            userId={item.user.path.substring(6)}
            request={item.text} 
            buy={item.buy}
            rent={item.rent}
            startDate={item.startDate}
            endDate={item.endDate}
            requestStatus={item.completed}
            myRequests={false}
            requestId={item.requestId}
        />
      );

    const switchSort = () => {
        sort === "Latest" ? setSort("Oldest") : setSort("Latest")
    }


    
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.filterRow}>
                <TouchableOpacity style={styles.sortOrFilter} onPress={switchSort}>
                    <MaterialCommunityIcons name="sort" size={16} style={styles.icon}/>
                    <Text>Sort: Date ({sort})</Text>
                </TouchableOpacity>
                <DropDownPicker
                    style={styles.sortOrFilter}
                    open={open}
                    value={filter}
                    items={items}
                    setOpen={setOpen}
                    setValue={setFilter}
                    setItems={setItems}
                />
               
            </View>
            <FlatList
                style={{marginHorizontal:10, marginTop: 5}}
                data={requests}
                renderItem={renderItem}
                keyExtractor={(item, index) => item + index}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={fetchRequests}
                    />
                }
            />

            <FAB
                    style = {styles.fab}
                    small
                    icon = 'plus'
                    label = 'Make a request'
                    onPress = {()=> navigation.navigate("New Request", {fetchRequests})}

            />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    fab:{
        backgroundColor: colors.orange,
        position: "absolute",
        margin: 20,
        right: 0,
        bottom: 10
    },
    container: {
        height: '100%',
        backgroundColor: colors.peach
    },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        height: 50,
        zIndex:1
       
      
    },
    sortOrFilter: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 0,
        height: '100%'
    },
    icon: {
        marginRight: 5
    }

   
})

