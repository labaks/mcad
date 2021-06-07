import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import headerImage from '../../assets/adaptive-icon.png';

export const DiagramsHeader = (props) => {

    const title = props.title ? props.title : "No records found";

    return (
        <View style={styles.wrapper}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={headerImage} />
                <View style={styles.textWrapper}>
                    <Text style={styles.header}>Diagrams</Text>
                    <Text style={[styles.diagramName, !props.title && styles.noRecords]}>{title}</Text>
                </View>
            </View>
            {props.showButtons ?
                <View style={styles.btnsWrapper}>
                    <TouchableOpacity
                        style={[styles.button, styles.topButton]}
                        activeOpacity={.5}
                        onPress={props.onBackPressed}>
                        <Text style={styles.btnText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.bottomButton]}
                        activeOpacity={.5}
                        onPress={props.onRequestPressed}>
                        <Text style={styles.btnText}>Request</Text>
                    </TouchableOpacity>
                </View>
                :
                <View></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: .5,
        borderColor: '#e4e4e4',
        padding: 8,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#e4e4e4",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: .8,
        shadowRadius: 3.5,
        elevation: 3
    },
    content: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
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
    },
    btnsWrapper: {
        flexDirection: 'column',
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#4B4B52',
        padding: 5,
        height: 32,
        width: 70,
        alignContent: 'center',
        justifyContent: 'center'
    },
    topButton: {
        marginBottom: 1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    bottomButton: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'SFBold'
    }
})