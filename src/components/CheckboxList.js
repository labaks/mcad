import { CheckBox } from 'react-native-elements'
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

export const CheckboxList = (props) => {

    const [data, setData] = useState(props.data);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.itemWrapper}
                onPress={() => setToggleCheckbox(index)}>
                <CheckBox
                    style={styles.checkbox}
                    title={item.title}
                    checked={item.active}
                    containerStyle={styles.checkboxWrapper}
                    textStyle={styles.checkboxTitle}
                    onPress={() => setToggleCheckbox(index)}
                />
            </TouchableOpacity>
        );
    };

    const setToggleCheckbox = (index) => {
        console.log("checkbox checked: ", index)
        let newArr = [...data];
        newArr[index].active = !newArr[index].active;
        setData(newArr);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 16
    },
    checkboxWrapper: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 0,
        margin: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#686868',
    },
    checkboxTitle: {
        fontWeight: 'normal',
        fontFamily: 'SF'
    }
});