import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const LegendUnit = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.square(props.color)}></View>
            <Text>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    square: color => ({
        height: 30,
        width: 30,
        backgroundColor: color,
    }),
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})