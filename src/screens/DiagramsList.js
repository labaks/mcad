import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';

import { CheckboxList } from "../components/CheckboxList";
import { DiagramsHeader } from '../components/DiagramsHeader';
import { Loader } from '../components/Loader';
import { MainBtn } from '../components/MainBtn';
import { Panel } from '../components/Panel';

import { BackButtonHandler } from '../helpers/BackButtonHandler';

let dropDownAlert;

export const DiagramsList = ({ navigation, route }) => {
    const backButtonHandler = BackButtonHandler();
    const token = route.params.token;
    const url = route.params.url;
    const companyId = route.params.companyId;
    const [loading, setLoading] = useState(false);
    const [diagramsSelected, setDiagramsSelected] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const [titles, setTitles] = useState([]);
    const diagramsListData = [
        { id: 0, title: 'Top 10 Regions In', active: false },
        { id: 1, title: 'Top 10 Regions Out', active: false },
        { id: 2, title: 'Top 10 Regions In, $', active: false },
        { id: 3, title: 'Top 10 Regions Out, $', active: false },
        { id: 4, title: 'Top 10 Countries In', active: false },
        { id: 5, title: 'Top 10 Countries Out', active: false },
        { id: 6, title: 'Traffic Share In', active: false },
        { id: 7, title: 'Traffic Share Out', active: false },
        { id: 8, title: 'Financial Reports Today', active: false },
        { id: 9, title: 'Financial Reports Yesterday', active: false }
    ];

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Diagrams List Screen Loaded---")
        console.log("-params received: ", route.params);
    }, [])

    const selectDiagrams = () => {
        parseTitles();
        setIsSubmited(true);
    }

    const parseTitles = () => {
        let tmpArr = [...titles];
        tmpArr = diagramsSelected.map((id) => {
            for (var i in diagramsListData) {
                if (id == diagramsListData[i].id) return diagramsListData[i].title
            }
        })
        setTitles(tmpArr);
    };

    const tempBack = () => {
        setIsSubmited(false);
    }

    const request = () => {
        navigation.reset({
            index: 0,
            routes: [{
                name: 'NavChooseCompany',
                params: { url: url, token: token }
            }]
        })
    };

    const TabButton = ({ title }) => {
        return (
            <Panel>
                <Text>{title}</Text>
            </Panel>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <DiagramsHeader title='' />
                {!isSubmited ?
                    <View style={styles.container}>
                        <Panel>
                            <CheckboxList
                                data={diagramsListData}
                                onChange={(array) => setDiagramsSelected(array)} />

                        </Panel>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonWrapper}>
                                <MainBtn
                                    text="Request"
                                    onPress={request} />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <MainBtn
                                    text="Submit"
                                    onPress={selectDiagrams} />
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.tabsWrapper}>
                        <Text>selected Ids: {diagramsSelected.toString()}</Text>
                        <Text>selected titles: {titles.toString()}</Text>
                        <View style={styles.wrapper}>
                            <MainBtn
                                text="Back"
                                onPress={tempBack} />
                        </View>
                        <View style={{ flex: 1 }}>
                            {titles.map(title => (
                                <View key={title} style={{ flex: 1, marginBottom: 10 }}>
                                    <TabButton title={title} />
                                </View>
                            ))}
                        </View>
                    </View>
                }
            </View>
            <Loader loading={loading} />
            <StatusBar style="auto" />
            <DropdownAlert
                ref={(ref) => { dropDownAlert = ref }}
                closeInterval={3000} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentWrapper: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 30,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tabsWrapper: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'flex-start'
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonWrapper: {
        width: '50%',
        paddingHorizontal: '1%'
    }
})