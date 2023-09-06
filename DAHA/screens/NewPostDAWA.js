import React, {useState, useEffect} from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, TouchableWithoutFeedback, Keyboard} from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import CustButton from "../components/CustButton";
import CheckBoxLabeled from "../components/CheckBoxLabeled";
import colors from '../Themes/colors';
import CalendarPicker from 'react-native-calendar-picker';
import { db, auth, storage } from "../firebase";
import { collection, doc, addDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { render } from "react-dom";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';

export default function NewPostDAWA ({navigation, route}){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [purchaseOptions, setPurchaseOptions] = useState("Buy");
    const [images, setImages] = useState([
        {photoURI: null,
        index: 0},
        {photoURI: null,
        index: 1},
        {photoURI: null, 
        index: 2},
    ]);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [price, setPrice] = useState("0");
    const [open, setOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState("per day");
    const [items, setItems] = useState([
        {label: 'per day', value: 'per day'},
        {label: 'per week', value: 'per week'},
        {label: 'per month', value: 'per month'},
        {label: 'per year', value: 'per year'},
        {label: 'for specified date range', value: 'for specified date range'}
        ]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [specifyDates, setSpecifyDates] = useState(false)
    const minDate = new Date(); // Today
    const maxDate = new Date(2024, 6, 3);
    const currentUser = auth.currentUser;

    const hasAtLeastOneImage = () => {
        let filtered = images.filter(item => item.photoURI != null && item.photoURI != '');
        return filtered.length
    }

    const datesChosen = () => {
        if (specifyDates) {
            if (purchaseOptions === "Buy" && startDate) {
                return true
            }
            else if (purchaseOptions === "Rent" && startDate & endDate) {
                return true
            }
            else return false
        }
        return true
    }

    useEffect(() => {
        if (/[a-z]/i.test(title) && hasAtLeastOneImage() && /[a-z]/i.test(description) && datesChosen()){
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [title, images, description, specifyDates, startDate, endDate, purchaseOptions]);

    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
          setEndDate(date)
        } else {
          setStartDate(date)
          setEndDate(null)
        }

    }

    const pickImage = async (index) => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.1,
        });
 
        console.log(index)
        if (!result.cancelled) {
          var newImages = [...images]
          newImages[index].photoURI = result.uri
          setImages(newImages)
        }
      };



    const uploadImage = async (uri, filename, setLoading) => {
        let response = await fetch(uri);
        let blob = await response.blob();
        let imageRef = ref(storage, filename);
        setLoading(true);
        await uploadBytes(imageRef, blob);
        setLoading(false);
        let downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
    }

    const uploadPhotos = async (uris, filePrefix, setLoading) => {
        return Promise.all(uris.map(async (item) => uploadImage(item.photoURI, filePrefix + item.index + '.jpg', setLoading)));
    } 

    const postOffer = async () => {
        try {
            let userRef = doc(db, "users", currentUser.uid);
            const startTimestamp = startDate ? Timestamp.fromDate(startDate.toDate()) : null;
            const endTimestamp = endDate ? Timestamp.fromDate(endDate.toDate()) : null;
            const offerTimestamp = Timestamp.fromDate(new Date());
            let newOffer = {
                user: userRef,
                title: title,
                description: description,
                price: price, // might need some currency manipulation
                timestamp: offerTimestamp,
                purchaseOptions: purchaseOptions,
                priceTimeFrame: dropDownValue,
                specifyDates: specifyDates,
                startDate: startTimestamp, 
                endDate: endTimestamp,
                completed: false,
                photos: images
            };

            let offerRef = await addDoc(collection(db, "offers"), newOffer);
            console.log("Finished adding original doc to firebase")
            let filePrefix = 'users/' + currentUser.uid + '/offers/' + offerRef.id + '/photo-';
            let filtered = images.filter(item => item.photoURI != null && item.photoURI != '');
            let downloadURLs = await uploadPhotos(filtered, filePrefix, setLoading);
            console.log("Obtained photo urls")
            await updateDoc(offerRef, {
                photos: downloadURLs
            });
            
            await updateDoc(userRef, {
                offers: arrayUnion(offerRef)
            });

            navigation.pop();
            //navigation.navigate("Item", {images: images})

        } catch (error) {
            console.log(error.message);
        }                            
    };


    const renderImage = (index) => {
        const uri = images[index].photoURI
        return (
            <View>
            {uri ? 

            <Image
            source={{ uri: uri }}
            style={styles.imgbox}
            />
            :
            <AntDesign  
                name="pluscircle"
                color="black"
                size={20}
                style={styles}
            />
            }  
            </View>  
               
        )
    }

    const updateBuyingOption = (newValue) => {
        if (newValue === "Rent") {
            setPurchaseOptions("Rent")
        }
        else {
            setPurchaseOptions("Buy")
            setOpen(false)
            setDropDownValue("per day")
            setEndDate(null)
        }
    }

    const updateDateOption = (newValue) => {
        if (newValue === true) {
            setSpecifyDates(true)
        }
        else {
            setStartDate(null)
            setEndDate(null)
            setSpecifyDates(false)
        }
    }

    const handleDropDownChange = (newValue) => {
        if (newValue === "for specified date range") {
            setSpecifyDates(true)
        }
        
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <Text style={styles.titleStyle}> Does anyone want a... </Text>
                <TextInput 
                    mode="outlined"
                    backgroundColor='snow'
                    activeOutlineColor={colors.orange}
                    onChangeText={setTitle}
                    value={title}
                    style={styles.textBox}
                />

                <Text style = {styles.sectionHeaders}>Upload Pictures</Text>        

                <View style={styles.imageRow}>
                   <TouchableOpacity style={styles.imgbox} onPress={() => pickImage(0)}>
                        {renderImage(0)}
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.imgbox} onPress={() => pickImage(1)}>
                       {renderImage(1)}
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.imgbox} onPress={() => pickImage(2)}>
                       {renderImage(2)}
                   </TouchableOpacity>
                </View>

                <Text style={styles.sectionHeaders}>Description</Text>
                <TextInput 
                    mode="outlined"
                    multiline
                    numberOfLines={4} 
                    backgroundColor='snow'
                    activeOutlineColor={colors.orange}
                    onChangeText={setDescription}
                    value={description}
                    style={styles.textBox}
                    scrollEnabled={true}
                    maxHeight={100}
                />

                <Text style={styles.sectionHeaders}>Purchasing Options</Text>

                <RadioButton.Group onValueChange={newValue => updateBuyingOption(newValue)} value={purchaseOptions} style={styles.buyingOptionsRow}>
                    <View style={styles.buyingOptionsRow}>
                    <View style={styles.buyingOption}>
                        <RadioButton.Android value={"Buy"} color={colors.dandelions}/>
                        <Text style={styles.buyingOptionText}>Buy</Text>

                    </View>
                    <View style={styles.buyingOption}>
                        <RadioButton.Android value={"Rent"} color={colors.dandelions}/>
                        <Text style={styles.buyingOptionText}>Rent</Text>

                    </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.sectionHeaders}>Price</Text>

                <View style={styles.priceRow}>

                <TextInput
                    keyboardType="number-pad"
                    mode="outlined"
                    backgroundColor='snow'
                    activeOutlineColor={colors.orange}
                    onChangeText={setPrice}
                    value={price}
                    style={styles.priceBox}
                />


                <DropDownPicker

                    disabled={purchaseOptions === "Rent" ? false : true}
                    listMode="SCROLLVIEW"
                    style={styles.dropdown}
                    open={open}
                    setOpen={setOpen}
                    value={dropDownValue}
                    items={items}
                    setValue={setDropDownValue}
                    onChangeValue={(newValue) => handleDropDownChange(newValue)}
                    setItems={setItems}
                    dropDownContainerStyle={styles.dropdown}
                    disabledStyle={{
                        opacity: 0
                      }}

                >
                    </DropDownPicker>

                </View>

                <View zIndex={-5}>

                <Text style={styles.sectionHeaders}>Date(s) Available</Text>

                <RadioButton.Group onValueChange={newValue => updateDateOption(newValue)} value={specifyDates} style={styles.buyingOptionsRow}>
                    <View style={styles.buyingOptionsRow}>
                    <View style={styles.buyingOption}>
                        <RadioButton.Android value={false} color={colors.dandelions} disabled={dropDownValue === "for specified date range"}/>
                        <Text style={styles.buyingOptionText}>No date preference</Text>

                    </View>
                    <View style={styles.buyingOption}>
                        <RadioButton.Android value={true} color={colors.dandelions}/>
                        <Text style={styles.buyingOptionText}>Specify Date(s)</Text>

                    </View>
                    </View>
                </RadioButton.Group>


                { specifyDates === true ?

                <View style={styles.calendar}>


                <CalendarPicker
                    allowRangeSelection={purchaseOptions === "Rent" ? true : false}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor={colors.sandstone}
                    selectedDayColor={colors.dandelions}
                    selectedDayTextColor="#000"
                    selectedStartDate={startDate}
                    selectedEndDate={endDate}
                    onDateChange={onDateChange}

                />  
                </View>   
                : 
                null
                }
                </View>
                
                <View zIndex={-5}>
                <CustButton 
                    label="Post"   
                    onPress={postOffer}
                    disabled={disabled}
                />
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        marginVertical: 10,
        fontFamily: "Montserrat-MediumItalic", 
        fontSize: 24, 
        color: colors.orange
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10
        
    },
    textBox: {
        backgroundColor: 'white',
        paddingHorizontal: 7,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginBottom: 25,
        fontFamily: "Lato-Regular",
        fontSize: 16
    },
    sectionHeaders: {
        fontFamily: 'Montserrat-Medium', 
        fontSize: 20, 
        color: colors.orange,
        marginBottom: 5,
    },
    buyingOptionsRow: {
        flexDirection: 'row',
        marginBottom: 25,
        marginLeft: 5

    },
    calendar: {
        marginBottom: 15,
    },
    datepicker1: {
        //   borderWidth: 1,
          width: 135
      },
      datepicker2: {
        // borderWidth: 1,
        width: 135
    }, datepickers: {
        flexDirection: "row",
        justifyContent: "space-around"

    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 120,
        marginBottom: 20
    }, 
    imgbox: {
        backgroundColor: "#D3D3D3",
        width: 100,
        height: 100,
        margin: 10, 
       alignSelf: "center",
       justifyContent: 'center',
       alignItems: 'center'
    },
    photoDisplay: { 
        alignItems: "center", 
        justifyContent: "center", 
        alignSelf: "center", 
        alignContent: "center", 
        margin: 40
    },
    buyingOption:  {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    buyingOptionText: {
        fontSize: 16
    },
    priceBox: {
        width: 100, 
        marginRight: 15,
        height: 50

    },
    extraSpace: {
        width: '100%',
        height: 200,

    },
    dropdown: {
        width: '60%',
        borderRadius: 0,
        backgroundColor: 'snow',
        zIndex: 10
    },
    priceRow: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    calendar: {
        marginBottom: 20
    }
})