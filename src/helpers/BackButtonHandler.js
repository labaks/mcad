import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler, Alert } from "react-native";

export const BackButtonHandler = () => {
    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const onBackPress = () => {
        console.log("--On back press");
        Alert.alert(
            "Hold on!",
            "Are you sure you want to exit?",
            [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "YES",
                    onPress: () => BackHandler.exitApp()
                }
            ]
        );
        return true
    };
}
