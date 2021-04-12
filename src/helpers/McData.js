export class McData {

    static async _getCurrentUser(token = '', host = '') {
        let dataToSend = {
            "session_id": token,
            "data": {
                "session_id": token, //mc api feature
                "fields": ["name", "rl_name"]
            }
        }
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
        return json.data[0];
    }

    static async _getCurrentUserId(token = '', host = '') {
        let dataToSend = {
            "session_id": token,
            "data": {
                "session_id": token, //mc api feature
                "fields": ["id"]
            }
        }
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
        return json.data[0][0].toString();
    }

    static async _getUserCompanies(token = '', host = '', userId = '') {
        let dataToSend = {
            "session_id": token,
            "data": {
                "user_id": userId,
                "fields": ["id", "name"]
            }
        }
        console.log("---dataToSend: ", dataToSend)
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
        return json.data
    }

    static userArrayToObj(array = ['']) {
        return {
            name: array[0],
            role: array[1]
        }
    }

    static companiesForPicker (array = []) {
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