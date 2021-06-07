import { CheckBox } from 'react-native-elements'
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export const CheckboxList = ({ data, ids, onChange, onChangeInnerData }) => {

    const [innerData, setInnerData] = useState(data);
    const [reportsIds, setReportsIds] = useState(ids);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.itemWrapper}
                onPress={() => setToggleCheckbox(index)}>
                <CheckBox
                    style={styles.checkbox}
                    title={item.title}
                    checked={item.active}
                    uncheckedColor='#e4e4e4'
                    checkedColor='#556c55'
                    uncheckedIcon='circle-o'
                    checkedIcon='circle-o'
                    containerStyle={styles.checkboxWrapper}
                    textStyle={styles.checkboxTitle}
                    onPress={() => setToggleCheckbox(index)}
                />
            </TouchableOpacity>
        );
    };

    const setToggleCheckbox = (index) => {
        let newArr = [...innerData];
        newArr[index].active = !newArr[index].active;
        setInnerData(newArr);
        let tmpIds = [...reportsIds];
        if (tmpIds.indexOf(index) !== -1) {
            tmpIds = tmpIds.filter(item => item !== index);
        } else {
            tmpIds.push(index);
        }
        tmpIds.sort();
        setReportsIds(tmpIds)
        onChange(tmpIds);
        onChangeInnerData(innerData);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={innerData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
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
        borderBottomColor: '#e4e4e4',
    },
    checkboxTitle: {
        fontWeight: 'normal',
        fontFamily: 'SF'
    }
});