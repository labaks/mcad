import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AccountTextView = (props) => {

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{props.label}</Text>
            <Text style={styles.textValue}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 10,
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
    },
    label: {
        color: '#E4E4E4',
        fontFamily: 'SF'
    },
    textValue: {
        color: '#4B4B52',
        fontSize: 16,
        paddingVertical: 10,
        fontFamily: 'SF'
    }
})