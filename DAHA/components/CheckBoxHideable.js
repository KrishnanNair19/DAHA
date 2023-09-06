import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../Themes/colors';
import Checkbox from 'expo-checkbox';
export default function CheckBoxHideable({handleClick, hidden, checked, textOptions}) {
    
    const requestStatusColor = checked ? styles.complete : styles.incomplete

    if (hidden) {
        // console.log("Checkbox status: " + checked)
        return (
            <View style={styles.row}>
                {/*<Text style={[styles.requestStatus, requestStatusColor]}>{checked ? textOptions[0] : textOptions[1]} </Text>*/}
            </View>
        )
    }
    return (
        <View style={styles.row}>

            <Checkbox
                color={checked ? colors.orange : undefined}
                style={styles.checkbox}
                value={checked}
                onValueChange={(newValue) => {
                    handleClick(newValue)
                }}
            />
            <Text style={styles.requestStatus}>{checked ? textOptions[0] : textOptions[1]}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        margin: 4,
    },
    row: {
        flex: 1, 
        marginVertical: 5, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    requestStatus: {
        fontWeight: '500', 
        color: colors.orange
    },
    
})