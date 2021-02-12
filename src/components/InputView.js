import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const InputView = (props) => {
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={styles.inputView}>
            <Text style={[styles.inputLabel, isFocused && styles.focused]}>{props.label}</Text>
            <TextInput
                style={[styles.inputText, isFocused && styles.focused]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)} />
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
    },
    focused: {
        color: '#4B4B52',
        borderBottomColor: '#4B4B52'
    }
})