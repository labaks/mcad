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
import { ErrorHandler } from '../helpers/ErrorHandler';

import { DiagramsList } from './DiagramsList';

var dropDownAlert;

export const ChooseCompanyScreen = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const service = route.params.service;
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [isSelected, setIsSelected] = useState(false);

    let btnDisabled = selectedCompany.Name == null;

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Choose Company Screen Loaded---")
        console.log("-params received: ", route.params);
        _setUserCompanies();
    }, [])

    const _setUserCompanies = async () => {
        setLoading(true)
        const userId = await McData._getCurrentUserId(token, url);
        if (userId.status) {
            setLoading(false);
            ErrorHandler.handle(dropDownAlert, userId, url, navigation);
        } else {
            const companies = await McData._getUserCompanies(token, url, userId, service);
            if (companies.status) {
                setLoading(false);
                ErrorHandler.handle(dropDownAlert, companies, url, navigation);
            } else {
                setLoading(false);
                setCompanies(McData.companiesForPicker(companies));
            }
        }
    };

    const onRequest = (selected) => {
        setIsSelected(selected);
        setSelectedCompany({});
    };

    return (
        <View style={styles.container}>
            {isSelected ?
                <DiagramsList
                    url={url}
                    token={token}
                    selectedCompany={selectedCompany}
                    service={service}
                    onRequest={onRequest}
                    navigation={navigation} />
                :
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
                        onSelected={(selected) => setSelectedCompany(selected)}
                        onClosed={() => console.log('-pickerModal closed')}
                        onBackButtonPressed={() => console.log('-pickerModal back key pressed')}
                        items={companies}
                        showToTopButton={true}
                        selected={selectedCompany}
                        searchPlaceholderText={'Search...'}
                    />
                    <MainBtn
                        text="Select"
                        onPress={() => setIsSelected(true)}
                        disabled={btnDisabled}
                    />
                </View>
            }
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