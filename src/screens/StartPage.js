import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DropdownAlert from 'react-native-dropdownalert';

import { CheckboxList } from "../components/CheckboxList";
import { DiagramsHeader } from '../components/DiagramsHeader';
import { MainBtn } from '../components/MainBtn';
import { Panel } from '../components/Panel';
import { TabContent } from '../components/TabContent';

let dropDownAlert;

export const StartPage = ({ navigation, route }) => {
    const [selectedDiagramsIds, setSelectedDiagramsIds] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const [titles, setTitles] = useState([]);
    const [chosenTab, setChosenTab] = useState("");
    let defaultListData = [
        { id: 0, title: 'Call Charts', active: false },
        { id: 1, title: 'Top 10 Targets', active: false },
        { id: 2, title: 'Top 10 Countries by Margin', active: false },
        { id: 3, title: 'Top 10 Countries by min.', active: false },
        { id: 4, title: 'Top 10 Offers', active: false },
        { id: 5, title: 'Credit Limit Check', active: false },
    ];
    const [listData, setListData] = useState(defaultListData);

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Start Page Screen Loaded---");
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
        setChosenTab("");
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
                    onBackPressed={onBackPressed} />
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
                            <MainBtn
                                disabled={!selectedDiagramsIds.length}
                                text="Submit"
                                onPress={selectDiagrams} />
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
                                token={route.params.token}
                                url={route.params.url}
                                navigation={navigation}
                                dropDownAlert={dropDownAlert} />
                        </View>
                    </ScrollView>
                }
            </View>
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