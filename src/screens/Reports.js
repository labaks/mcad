import { StatusBar } from 'expo-status-bar';
import { Button } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import PickerModal from 'react-native-picker-modal-view';
import { Loader } from '../components/Loader';
import { MainBtn } from '../components/MainBtn';
import { SelectableList } from '../components/SelectableList';
import { TitleText } from '../components/TitleText';

import { BackButtonHandler } from '../helpers/BackButtonHandler';

let dropDownAlert;

export const Reports = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState('');

    const mockArray = [
        { Id: 1, Name: 'Test1 Name', Value: 'Test1 Value' },
        { Id: 2, Name: 'Test2 Name', Value: 'Test2 Value' },
        { Id: 3, Name: 'Test3 Name', Value: 'Test3 Value' },
        { Id: 4, Name: 'Test4 Name', Value: 'Test4 Value' }
    ]

    console.log("======================");
    console.log("---Reports Screen Loaded---")
    console.log("-params received: ", route.params);

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.titleWrapper}>
                    <TitleText text="Choose the company" />
                </View>
                <PickerModal
                    renderSelectView={(disabled, selected, showModal) =>
                        <Button disabled={disabled} title={'Show me!'} onPress={showModal} />
                    }
                    onSelected={(selected) => setSelected(selected)}
                    onClosed={() => console.warn('closed...')}
                    onBackButtonPressed={() => console.warn('back key pressed')}
                    items={mockArray}
                    sortingLanguage={'en'}
                    showToTopButton={true}
                    selected={selected}
                    selectPlaceholderText={'Choose one...'}
                    searchPlaceholderText={'Search...'}
                    autoSort={true}
                />
                <MainBtn text="Select" />
            </View>
            <Loader loading={loading} />
            <StatusBar style="auto" />
            <DropdownAlert
                ref={(ref) => { dropDownAlert = ref }}
                closeInterval={3000}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleWrapper: {
        alignSelf: 'stretch'
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})