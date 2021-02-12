import { StatusBar } from 'expo-status-bar';
import { CheckBox } from 'native-base';
import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import { InputView } from './components/InputView';
import { Logo } from './components/Logo';
import { MainBtn } from './components/MainBtn';
import { PasswordField } from './components/PasswordField';
import { TitleText } from './components/TitleText';

export const SignUpScreen = ({ navigation }) => {
    const [agryWithPrivacy, setAgryWithPrivacy] = useState(false);
    const privacyPolicyUrl = "https://speedflow.com/privacy-policy/";

    const openPrivacy = useCallback(async () => {
        const supported = await Linking.canOpenURL(privacyPolicyUrl);

        if (supported) {
            await Linking.openURL(privacyPolicyUrl);
        } else {
            Alert.alert(`Don't know how to open this URL: ${privacyPolicyUrl}`);
        }
    }, [privacyPolicyUrl]);

    return (
        <View style={styles.signUpScreenContainer}>
            <ImageBackground
                source={require('./../assets/signUpBg.png')}
                style={styles.bgImage}>
                <View style={styles.contentWrapper}>
                    <Logo />
                    <View style={styles.mainText}>
                        <TitleText text='Hello!' />
                        <Text style={styles.fontFamilySF}>Create an account to continue</Text>
                    </View>
                    <InputView label='URL' />
                    <InputView label='Login' />
                    <PasswordField />
                    <View style={styles.privacyBlock}>
                        <CheckBox
                            style={styles.privacyChk}
                            checked={agryWithPrivacy}
                            onPress={() => setAgryWithPrivacy(!agryWithPrivacy)}
                            color="#4B4B52" />
                        <View style={styles.privacyText}>
                            <Text>I agree with </Text>
                            <TouchableOpacity
                                onPress={openPrivacy}>
                                <Text style={styles.privacyLink}>Privacy policy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <MainBtn text='Sign Up' />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.fontFamilySF}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    signUpScreenContainer: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        width: '100%'
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainText: {
        marginBottom: 30,
        alignSelf: 'flex-start'
    },
    privacyBlock: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 15
    },
    privacyChk: {
        marginStart: -10,
        marginEnd: 20
    },
    privacyText: {
        flex: 1,
        flexDirection: 'row',
    },
    privacyLink: {
        color: '#63abca'
    },
    fontFamilySF: {
        fontFamily: 'SF'
    }
})