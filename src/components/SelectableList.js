import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const SelectableList = (props) => {
    let modalRef;
    const openModal = () => modalRef.show();
    const saveModalRef = ref => modalRef = ref;
    const onSelectedOption = value => {
        console.log(`You selected: ${value}`);
        selectedValue = value;
    };

    let selectedValue = "Select";
    
    return (
        <View style={styles.inputView}>
            <Text style={styles.inputLabel}>{props.label}</Text>
            <TouchableOpacity onPress={openModal}>
                <Text style={styles.inputText}>{selectedValue}</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        marginBottom: 10
    },
    inputLabel: {
        color: '#E4E4E4',
        fontFamily: 'SF'
    },
    inputText: {
        color: '#4B4B52',
        fontSize: 16,
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        paddingVertical: 10,
        fontFamily: 'SF'
    }
})