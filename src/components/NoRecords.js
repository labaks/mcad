import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const NoRecords = () => {
    return (
        <Text style={styles.noRecords}>No records found</Text>
    )
}

const styles = StyleSheet.create({
    noRecords: {
        color: 'red',
        fontFamily: 'SFBold',
        textAlign: 'center',
        padding: 10
    }
})