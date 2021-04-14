import { useState } from "react";

export const UserData = (values) => {
    const [userValues, setUserValues] = useState({ ...values });

    const updateUserValue = (key, value) => {
        setUserValues({
            ...userValues,
            [key]: value
        });
    };

    return [
        userValues,
        updateUserValue,
        setUserValues,
    ]
};
