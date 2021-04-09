import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const SelectListItem = (props) => {

    return (
        <Text style={[styles.listItem, props.selected && styles.selected]}>{props.label}</Text>
    )
}

const styles = StyleSheet.create({
    listItem: {
        paddingVertical: 12,
        marginHorizontal: 30,
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    selected: {
        fontWeight: 'bold',
        backgroundColor: '#EEF3DC',
        borderRadius: 30
    }
})