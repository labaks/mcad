import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const InputView = (props) => {
    return (
        <View style={styles.inputView}>
            <Text style={styles.inputLabel}>{props.label}</Text>
            <TextInput
                // TODO: {props.secure ? secureTextEntry : ''}
                style={styles.inputText} />
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
        fontSize: 16,
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        paddingVertical: 10,
        fontFamily: 'SF'
    }
})