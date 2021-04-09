import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const SelectView = (props) => {

    let selectedValue = props.selected ? props.selected : "Choose...";

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{props.label}</Text>
            <TouchableOpacity
                disabled={props.disabled}
                onPress={props.onPress}>
                <Text style={[styles.valueText, props.selected && styles.selected]}>{selectedValue}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 10
    },
    label: {
        color: '#E4E4E4',
        fontFamily: 'SF'
    },
    valueText: {
        color: '#E4E4E4',
        fontSize: 16,
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        paddingVertical: 10,
        fontFamily: 'SF'
    },
    selected: {
        color: '#4B4B52',
        borderBottomColor: '#4B4B52'
    }
})