import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import headerImage from '../../assets/adaptive-icon.png';

export const DiagramsHeader = (params) => {

    let title = params.title ? params.title : "No records found";

    return (
        <View style={styles.content}>
            <Image
                style={styles.image}
                source={headerImage} />
            <View style={styles.textWrapper}>
                <Text style={styles.header}>Diagrams</Text>
                <Text style={[styles.diagramName, !params.title && styles.noRecords]}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: .5,
        borderColor: '#e4e4e4',
        padding: 12,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
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
    image: {
        resizeMode: 'cover',
        width: 57,
        height: 57,
    },
    textWrapper: {
        padding: 10
    },
    header: {
        color: '#4B4B52',
        fontFamily: 'SFBold'
    },
    diagramName: {
        color: '#4B4B52',
        fontFamily: 'SF'
    },
    noRecords: {
        color: '#E4E4E4'
    }
})