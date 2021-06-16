import AsyncStorage from '@react-native-async-storage/async-storage';

export class ErrorHandler {

    static handle(element, error, url, navigation) {
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
            element.alertWithType(
                'error',
                '',
                error.details ? error.details : error.message);
        }
    };
};