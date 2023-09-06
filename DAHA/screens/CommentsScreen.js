import * as React from 'react';
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, SafeAreaView, Keyboard, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import { IconButton } from "react-native-paper";
import CommentCard from '../components/CommentCard.js';
import { collection, doc, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { db } from '../firebase.js'


export default function CommentsScreen({ route, navigation }) {

    const { productId } = route.params;

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    let numLikes = Math.floor(Math.random() * 10) + 1;


    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;


    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    useEffect( () => {
        fetchComments();
    }, [])

    const fetchComments = () => {
        getDocs(query(collection(db, "offers", productId, "comments"), 
            orderBy("timestamp"))).then(
                (comments) => {
                    const data = comments.docs.map(document => 
                        document.data());
                    setComments(data);
                }
            );
    };

    const addComment = (newComment) => {
        newComment.id = comments.length + 1
        setComments([...comments, newComment])
    };

    const postComment = async () => {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            const commentTimestamp = Timestamp.fromDate(new Date());
            const comment = {
                user: userRef,
                text: newComment,
                timestamp: commentTimestamp,
                numlikes: numLikes,
                datetime : dateTime
            }
            await addDoc(collection(db, "offers", productId, "comments"), comment);
            addComment(comment);
            setNewComment("");
        } catch (err) {
            console.log(err);
        }
    }

    const renderItem = ({ item }) => (
        <CommentCard 
            userId={item.user.path.substring(6)}
            comment={item.text}
            numLikes = {item.numlikes}
            dateTime = {item.datetime}
        />
      );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
            style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={comments}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => item + index}
                        />
                        <TextInput 
                            multiline
                            numberOfLines={4} 
                            onChangeText={(text) => setNewComment(text)}
                            value={newComment}
                            placeholder="Add a comment..."
                            style={styles.newCommentTextBox}
                            scrollEnabled={true}
                            minHeight={40}
                        /> 
                        <IconButton 
                            icon="arrow-up"
                            size={20}
                            style={styles.icon} 
                            disabled={!newComment}
                            onPress={() => postComment()}
                        />
                    </SafeAreaView>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    newCommentTextBox:{
        backgroundColor: 'white',
        padding: 10,
        fontFamily: "Lato-Regular",
        fontSize: 16,
        marginBottom: 30
    },

    icon:{
        backgroundColor: "#DB753C",
        position: "absolute",
        marginBottom: 25,
        right: 0,
        bottom: 10
    },

    container :{
        margin: 10,
        height: '100%'
    }

})
