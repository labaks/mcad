import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler } from "react-native";

export const BackButtonHandler = () => {
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                console.log("--On back press")
                // BackHandler.exitApp();
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );
}