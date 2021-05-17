export class McData {

    static url = "https://mcapp.mcore.solutions";

    static async _getCurrentUser(token = '', host = '') {
        let dataToSend = {
            "session_id": token,
            "data": {
                "session_id": token, //mc api feature
                "fields": ["name", "rl_name"]
            }
        }
        console.log("--_getCurrentUser dataToSend: ", dataToSend);
        const response = await fetch(this.url + '/api/users_get/', {
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
    };

    static async _getCurrentUserId(token = '', host = '') {
        let dataToSend = {
            "session_id": token,
            "data": {
                "session_id": token, //mc api feature
                "fields": ["id"]
            }
        }
        console.log("--_getCurrentUserId dataToSend: ", dataToSend);
        const response = await fetch(this.url + '/api/users_get/', {
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
    };

    static async _getUserCompanies(token = '', host = '', userId = '') {
        let dataToSend = {
            "session_id": token,
            "data": {
                "user_id": userId,
                "fields": ["id", "name"]
            }
        }
        console.log("--_getUserCompanies dataToSend: ", dataToSend);
        let response = await fetch(this.url + '/api/client_get/', {
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
    };

    static userArrayToObj(array = ['']) {
        return {
            name: array[0],
            role: array[1]
        }
    };

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
    };

    static async _getTopTenRegions(token = '', host = '', companyId, direction, profit = false) {
        let dataToSend = {
            "session_id": token,
            "data": {
                "client_id": companyId,
                "direction": direction
            }
        }
        console.log("--_getTopTenRegions dataToSend: ", dataToSend);
        let route = profit ? '/api/top_profit_regions_get/' : '/api/top_duration_regions_get/';
        let response = await fetch(this.url + route, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            },
        })
        let json = await response.json();
        console.log("--_getTopTenRegions response: ", json);
        return json;
    };

    static async _getTopTenCountries(token = '', host = '', companyId, direction) {
        let dataToSend = {
            "session_id": token,
            "data": {
                "client_id": companyId,
                "direction": direction
            }
        }
        console.log("--_getTopTenCountries dataToSend: ", dataToSend);
        let response = await fetch(this.url + '/api/top_countries_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            },
        })
        let json = await response.json();
        console.log("--_getTopTenCountries response: ", json);
        return json;
    };

    static async _getTrafficShare(token = '', host = '', companyId, direction) {
        let dataToSend = {
            "session_id": token,
            "data": {
                "client_id": companyId,
                "direction": direction
            }
        }
        console.log("--_getTrafficShare dataToSend: ", dataToSend);
        let response = await fetch(this.url + '/api/traffic_share_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            },
        })
        let json = await response.json();
        console.log("--_getTrafficShare response: ", json);
        return json;
    };

    static defineData(data, labels) {
        let arr = [];
        for (var i in data) {
            let obj = {};
            for (var j in labels) {
                obj[labels[j]] = data[i][j];
            }
            arr.push(obj);
        }
        return arr;
    };

    static async _getFinSummary(token = '', host = '', companyId, period) {
        let start_date, end_date;
        let today = new Date();
        let yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        switch (period) {
            case "yesterday":
                start_date = this.dateFormat(yesterday, true);
                end_date = this.dateFormat(yesterday, false);
                break;
            case "today":
                start_date = this.dateFormat(today, true);
                end_date = this.dateFormat(today, false);
                break;
        };
        let dataToSend = {
            "session_id": token,
            "data": {
                "start_date": start_date,
                "end_date": end_date,
                "type": 2,
                "companies": [companyId],
                "fields": ["company", "total", "direction", "point_name", "destination", "country", "duration", "calc_duration", "op_price", "tp_price", "attempts", "sa", "asr", "acd", "pdd", "sc", "op_sum", "tp_sum", "delta_price", "delta_profit", "is_closed", "manager", "ner"],
            }
        }
        console.log("--_getTrafficShare dataToSend: ", dataToSend);
        let response = await fetch(this.url + '/api/fin_summary_get/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            },
        })
        let json = await response.json();
        console.log("--_getTrafficShare response: ", json);
        return json;
    };

    static dateFormat(day, start) {
        return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + 'T' + (start ? '00:00:00' : '23:59:59');
    };

    static async _login(host = '', login = '', password = '', ip = '') {
        let dataToSend = {
            "login": login,
            "password": password,
            "ip": ip
        }
        console.log("--_Login dataToSend: ", dataToSend);
        const response = await fetch(this.url + '/api/login/', {
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
    };

    static async _logout(token = '', host = '') {
        const response = await fetch(this.url + '/api/logout/', {
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
    };

}