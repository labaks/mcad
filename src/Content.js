import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import { Logo } from './components/Logo';

export const Content = (props) => {
    const { data } = props.route.params;
    console.log(data);
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./../assets/signUpBg.png')}
                style={styles.bgImage}>
                <View style={styles.contentWrapper}>
                    <Logo />
                    <FlatList
                        data={data}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <Text>{item.title}, {item.releaseYear}</Text>
                        )}
                    />
                </View>
            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        width: '100%',
        // height: '100%',
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})