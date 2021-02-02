import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const TitleText = (props) => {
    return (
        <Text style={styles.titleText}>{props.text}</Text>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 26,
        color: '#4A6E49',
        fontFamily: 'Dessau'
    }
})