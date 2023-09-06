import { View, StyleSheet,} from 'react-native';
import colors from '../Themes/colors';
import { TextInput, HelperText } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomInputText ({icon, label, value, onChangeText, secureTextEntry}) {
    return (
        <View style={styles.inputRow}>

            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name={icon} size={24}/>
            </View>

            <TextInput
                style={styles.textinput}
                label={label}
                backgroundColor='snow'
                // selectionColor={colors.orange}
                activeUnderlineColor={colors.orange}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
            />
      </View>
    )
}

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
        alignItems: 'center'
    },
    textinput: {
        fontFamily: "Lato-Regular",
        fontSize: 16, 
        width: '90%'
    },
    iconContainer: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
})