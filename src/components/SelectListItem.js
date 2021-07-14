import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export const SelectListItem = (props) => {

    return (
        <View style={[styles.listItemWrapper, props.selected && styles.selectedWrapper]}>
            <Text style={[styles.listItem, props.selected && styles.selectedListItem ]}>{props.label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItemWrapper: {
        marginHorizontal: 30,
        borderRadius: 30
    },
    listItem: {
        paddingVertical: 12,
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    selectedWrapper: {
        backgroundColor: '#eef3dc'
    },
    selectedListItem: {
        fontWeight: 'bold'
    }
})