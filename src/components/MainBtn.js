import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const MainBtn = (props) => {
    return (
        <TouchableOpacity style={styles.mainBtn}>
            <Text style={styles.mainBtnText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainBtn: {
        width: "100%",
        backgroundColor: '#4B4B52',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10
    },
    mainBtnText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'SF',
    },
})