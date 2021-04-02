import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AccountTextView = (props) => {

    return (
        <View style={styles.inputView}>
            <Text style={styles.inputLabel}>{props.label}</Text>
            <Text style={styles.inputText}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        marginBottom: 10
    },
    inputLabel: {
        color: '#E4E4E4',
        fontFamily: 'SF'
    },
    inputText: {
        color: '#4B4B52',
        fontSize: 16,
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        paddingVertical: 10,
        fontFamily: 'SF'
    }
})