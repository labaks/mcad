// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import PickerModal from 'react-native-picker-modal-view';
import { Loader } from '../components/Loader';
import { MainBtn } from '../components/MainBtn';
import { SelectListItem } from '../components/SelectListItem';
import { SelectView } from '../components/SelectView';
import { TitleText } from '../components/TitleText';

import { BackButtonHandler } from '../helpers/BackButtonHandler';
import { McData } from '../helpers/McData';

let dropDownAlert;

export const Reports = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [selected, setSelected] = useState({});

    let btnDisabled = selected.Name == null;

    useEffect(() => {
        console.log("======================");
        console.log("---Reports Screen Loaded---")
        console.log("-params received: ", route.params);
        _setUserCompanies();
    }, [])

    const _setUserCompanies = async () => {
        setLoading(true)
        let userId = await McData._getCurrentUserId(token, url);
        if (userId.status) {
            handleError(userId);
        } else {
            let companies = await McData._getUserCompanies(token, url, userId);
            if (companies.status) {
                handleError(companies);
            } else {
                setLoading(false);
                setCompanies(McData.companiesForPicker(companies));
            }
        }
    }

    const selectCompany = () => {
        console.log("--Selected company: ", selected);
        navigation.reset({
            index: 0,
            routes: [{
                name: 'DrawerNavigationCompanySelected',
                params: { url: url, token: token, selectedCompany: selected }
            }]
        })
    }

    const handleError = (error) => {
        setLoading(false);
        if (error.message == "Unauthorized") {
            console.log("--Force logout");
            AsyncStorage.setItem('logged_in', 'false').then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'Login',
                        params: { url: url, message: error.details }
                    }]
                })
            })
        } else {
            console.log("--Error: ", error.details ? error.details : error.message);
            dropDownAlert.alertWithType(
                'error',
                '',
                error.details ? error.details : error.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.titleWrapper}>
                    <TitleText text="Choose the company" />
                </View>
                <PickerModal
                    renderSelectView={(disabled, selected, showModal) =>
                        <SelectView
                            label="Company"
                            selected={selected.Name}
                            disabled={disabled}
                            onPress={showModal}
                        />
                    }
                    renderListItem={(selected, item) =>
                        <SelectListItem
                            label={item.Name}
                            selected={selected.Id === item.Id}
                        />
                    }
                    onSelected={(selected) => setSelected(selected)}
                    onClosed={() => console.log('-pickerModal closed')}
                    onBackButtonPressed={() => console.log('-pickerModal back key pressed')}
                    items={companies}
                    showToTopButton={true}
                    selected={selected}
                    searchPlaceholderText={'Search...'}
                />
                <MainBtn
                    text="Select"
                    onPress={selectCompany}
                    disabled={btnDisabled}
                />
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
        alignSelf: 'stretch',
        marginBottom: 40
    },
    contentWrapper: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})