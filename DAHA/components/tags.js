import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedbackBase } from 'react-native';
import colors from "../Themes/colors";

export default function Tag({tagType}) {
    const [tagColor, tagText] = tagType == 'buying' ? [styles.buy, "Buy"] : [styles.rent, "Rent"]

    return (
        <View style={[styles.tag, tagColor]}>
            <Text style={styles.tagText}>{tagText}</Text>
        </View>
    )  
}

const styles = StyleSheet.create({
    tag: {
        width: 75,
        paddingVertical: 5, 
        paddingHorizontal: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginRight: 5,
        borderWidth: 1
    },
    buy: {
        borderColor: colors.aquamarine
    },
    rent: {
        borderColor: colors.green
    },
    
});
