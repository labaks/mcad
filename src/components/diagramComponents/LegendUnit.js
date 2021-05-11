import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const LegendUnit = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.square(props.color)}></View>
            <Text style={styles.value}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    square: color => ({
        height: 20,
        width: 20,
        backgroundColor: color,
        marginRight: 5,
        borderRadius: 5
    }),
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    value: {
        fontFamily: 'SF'
    }
})