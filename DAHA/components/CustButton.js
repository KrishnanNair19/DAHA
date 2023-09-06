import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../Themes/colors';
import CheckBoxLabeled from '../components/CheckBoxLabeled';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
import CalendarPicker from 'react-native-calendar-picker';


export default function CustButton ({label, onPress, disabled}) {
    return (
        <TouchableOpacity 
            style={disabled ? [styles.buttonContainer, styles.disabled] : [styles.buttonContainer, styles.ready]} 
            onPress={onPress} 
            disabled={disabled}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        width: '80%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 50, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.6,
        shadowRadius: 5.46,
        elevation: 9,
    },
    disabled: {
        backgroundColor: colors.disabled
    },
    ready: {
        backgroundColor: colors.orange
    },
    buttonText: {
        color: 'snow', 
        fontFamily: "Lato-Regular",
        fontSize: 18
    }
})