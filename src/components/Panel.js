import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Panel = ({ children, ...props }) => {

    const { style, ...rest } = props;

    return (
        <View
            style={[styles.panel, style]}
            {...rest}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    panel: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: .5,
        borderColor: '#e4e4e4',
        padding: 10,
        alignSelf: 'stretch',
        shadowColor: "#e4e4e4",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: .8,
        shadowRadius: 3.5,
        elevation: 3
    },
})