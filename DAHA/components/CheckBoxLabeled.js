import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../Themes/colors';
import Checkbox from 'expo-checkbox';
export default function CheckBoxLabeled({label, purchaseOptions, handleClick, index}) {

    
    return (
        
        <View style={styles.container}>
            <Checkbox
                style={styles.checkbox}
                value={purchaseOptions[index]}
                onValueChange={(newValue) => {
                    handleClick(index, newValue)
                }}
                color={purchaseOptions ? colors.dandelions : undefined}
            />
            <Text style={styles.label}> {label} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        marginRight: 10,
        alignItems: 'center',
    },
    label: {
        fontSize: 18, 
        fontFamily: "Lato-Regular"
    }, 
    checkbox: {
        margin: 8,
      },
})