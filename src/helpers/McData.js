export class McData {

    static async _getCurrentUser(token = '', host = '') {
        let dataToSend = {
            "session_id": token,
            "data": {
                "session_id": token, //mc api feature
                "fields": ["name", "rl_name"]
            }
        }
        console.log("--_getCurrentUser dataToSend: ", dataToSend);
        const response = await fetch('https://mcapp.mcore.solutions/api/users_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            },
        });
        let json = await response.json();
        console.log("--_getCurrentUser response", json);
        if (json.status == 200) {
            return json.data[0];
        } else {
            return json;
        }
    }

    static async _getCurrentUserId(token = '', host = '') {
        let dataToSend = {
            "session_id": token,
            "data": {
                "session_id": token, //mc api feature
                "fields": ["id"]
            }
        }
        console.log("--_getCurrentUserId dataToSend: ", dataToSend);
        const response = await fetch('https://mcapp.mcore.solutions/api/users_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            },
        });
        let json = await response.json();
        console.log("--_getCurrentUserId response", json);
        if (json.status == 200) {
            return json.data[0][0].toString();
        } else {
            return json;
        }
    }

    static async _getUserCompanies(token = '', host = '', userId = '') {
        let dataToSend = {
            "session_id": token,
            "data": {
                "user_id": userId,
                "fields": ["id", "name"]
            }
        }
        console.log("--_getUserCompanies dataToSend: ", dataToSend);
        let response = await fetch('https://mcapp.mcore.solutions/api/client_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            },
        })
        let json = await response.json();
        console.log("--_getUserCompanies response status: ", json.status);
        if (json.status == 200) {
            return json.data;
        } else {
            return json;
        }
    }

    static userArrayToObj(array = ['']) {
        return {
            name: array[0],
            role: array[1]
        }
    }

    static companiesForPicker(array = []) {
        let objectsArray = [];
        for (var i in array) {
            objectsArray.push(
                {
                    Id: array[i][0],
                    Name: array[i][1]
                }
            )
        }
        return objectsArray;
    }

    static async _getTopTenRegionsIn(token = '', host = '', companyId) {
        let dataToSend = {
            "session_id": token,
            "data": {
                "client_id": companyId,
                "direction": "in"
            }
        }
        console.log("--_getTopTenRegionsIn dataToSend: ", dataToSend);
        let response = await fetch('https://mcapp.mcore.solutions/api/top_duration_regions_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            },
        })
        let json = await response.json();
        console.log("--_getTopTenRegionsIn response: ", json);
        if (json.status == 200) {
            return json.data;
        } else {
            return json;
        }
    }

    static async _login(host = '', login = '', password = '', ip = '') {
        let dataToSend = {
            "login": login,
            "password": password,
            "ip": ip
        }
        console.log("--_Login dataToSend: ", dataToSend);
        const response = await fetch('https://mcapp.mcore.solutions/api/login/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            }
        });
        let json = await response.json();
        console.log("--_Login response", json);
        return json;
    }

    static async _logout(token = '', host = '') {
        const response = await fetch('https://mcapp.mcore.solutions/api/logout/', {
            method: 'POST',
            body: JSON.stringify({ 'session_id': token, 'data': {} }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            }
        });
        let json = await response.json();
        return json;
    }

}