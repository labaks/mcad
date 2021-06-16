import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import { CheckboxList } from "../components/CheckboxList";
import { DiagramsHeader } from '../components/DiagramsHeader';
import { MainBtn } from '../components/MainBtn';
import { Panel } from '../components/Panel';
import { TabContent } from '../components/TabContent';

export const DiagramsList = ({ url, token, selectedCompany, service, onRequest, navigation }) => {
    const [selectedDiagramsIds, setSelectedDiagramsIds] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const [titles, setTitles] = useState([]);
    const [chosenTab, setChosenTab] = useState("");
    let defaultListData = [
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
    const [listData, setListData] = useState(defaultListData);

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Diagrams List Screen Loaded---");
        navigation.setOptions({ headerTitle: selectedCompany.Name });
    }, [])

    const selectDiagrams = () => {
        let tmpTitles = parseTitles();
        setTitles(tmpTitles);
        setChosenTab(tmpTitles[0]);
        setIsSubmited(true);
    };

    const parseTitles = () => {
        let tmpArr = [...titles];
        tmpArr = selectedDiagramsIds.map((id) => {
            for (let i in listData) {
                if (id == listData[i].id) return listData[i].title
            }
        })
        return tmpArr;
    };

    const onAllClosed = () => {
        setIsSubmited(false);
        setSelectedDiagramsIds([]);
        for (let j in listData) {
            listData[j].active = false;
        }
    };

    const onBackPressed = () => {
        for (let j in listData) {
            listData[j].active = false;
        }
        for (let i in selectedDiagramsIds) {
            listData[selectedDiagramsIds[i]].active = true;
        }
        setIsSubmited(false);
    };

    const onRequestPressed = () => {
        navigation.setOptions({ headerTitle: '' });
        onRequest(false);
    };

    const TabButton = ({ title }) => {
        const removeTab = () => {
            let tmpArr = [...titles];
            let tmpIds = [...selectedDiagramsIds];
            let index = tmpArr.indexOf(title);
            tmpArr.splice(index, 1);
            tmpIds.splice(index, 1);
            setTitles(tmpArr);
            setSelectedDiagramsIds(tmpIds);
            if (chosenTab == title) {
                if (index < tmpArr.length) {
                    setChosenTab(titles[index + 1])
                } else {
                    setChosenTab(titles[index - 1])
                }
            };
            if (!tmpArr.length) onAllClosed();
        };

        const chooseTab = () => {
            setChosenTab(title);
        };

        return (
            <Panel style={chosenTab == title && styles.chosenTab}>
                <View style={styles.tabButtonWrapper}>
                    <TouchableOpacity
                        style={styles.tabButtonTextPressable}
                        onPress={() => chooseTab()}>
                        <Text style={[styles.tabButtonText, chosenTab == title && styles.chosenTab]}>{title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tabButtonClose}
                        onPress={() => removeTab()}>
                        <FontAwesome
                            name="close"
                            size={16}
                            color='black' />
                    </TouchableOpacity>
                </View>
            </Panel>
        )
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <DiagramsHeader
                    title={chosenTab}
                    showButtons={isSubmited}
                    onBackPressed={onBackPressed}
                    onRequestPressed={onRequestPressed}
                    service={service} />
                {!isSubmited ?
                    <View style={styles.listContainer}>
                        <Panel>
                            <CheckboxList
                                data={listData}
                                ids={selectedDiagramsIds}
                                onChange={(array) => {
                                    setSelectedDiagramsIds(array);
                                }}
                                onChangeInnerData={(obj) => {
                                    setListData(obj)
                                }} />
                        </Panel>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonWrapper}>
                                <MainBtn
                                    text="Request"
                                    onPress={onRequestPressed} />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <MainBtn
                                    disabled={!selectedDiagramsIds.length}
                                    text="Submit"
                                    onPress={selectDiagrams} />
                            </View>
                        </View>
                    </View>
                    :
                    <ScrollView
                        style={styles.tabsWrapper}
                        contentContainerStyle={styles.tabsWrapperContainer}>
                        <View style={{ flex: 1 }}>
                            {titles.map(title => {
                                return (
                                    <View key={title} style={styles.tab}>
                                        <TabButton title={title} />
                                    </View>
                                )
                            })}
                        </View>
                        <View style={styles.tabContentWrapper}>
                            <TabContent
                                chosenTab={chosenTab}
                                token={token}
                                url={url}
                                companyId={selectedCompany.Id}
                                companyName={selectedCompany.Name}
                                navigation={navigation}
                                service={service} />
                        </View>
                    </ScrollView>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listContainer: {
        marginHorizontal: 10,
        flex: 1
    },
    contentWrapper: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tabsWrapper: {
        flex: 1,
        alignSelf: 'stretch'
    },
    tabsWrapperContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonWrapper: {
        width: '50%',
        paddingHorizontal: '1%'
    },
    tab: {
        marginBottom: 10,
        height: 54,
    },
    tabButtonWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabButtonTextPressable: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 5,
    },
    tabButtonText: {
        fontFamily: 'SF',
    },
    chosenTab: {
        fontFamily: 'SFBold',
        backgroundColor: '#edf2dc'
    },
    tabButtonClose: {
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    tabContentWrapper: {
        flex: 1,
        minHeight: 150,
    }
})