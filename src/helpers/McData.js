export class McData {

    static url = "https://mcapp.mcore.solutions";

    static async _getCurrentUser(token = '', host = '') {
        const dataToSend = {
            "session_id": token,
            "data": {
                "session_id": token, //mc api feature
                "fields": ["name", "rl_name"]
            }
        }
        const json = await this._fetch(dataToSend, 'users_get/', host);
        if (json.status == 200) {
            return json.data[0];
        } else {
            return json;
        }
    };

    static async _getCurrentUserId(token = '', host = '') {
        const dataToSend = {
            "session_id": token,
            "data": {
                "session_id": token, //mc api feature
                "fields": ["id"]
            }
        }
        const json = await this._fetch(dataToSend, 'users_get/', host);
        if (json.status == 200) {
            return json.data[0][0].toString();
        } else {
            return json;
        }
    };

    static async _getUserCompanies(token = '', host = '', userId = '') {
        const dataToSend = {
            "session_id": token,
            "data": {
                "user_id": userId,
                "fields": ["id", "name"],
                "sort_by": [{ "name": "asc" }]
            }
        }
        const json = await this._fetch(dataToSend, 'client_get/', host);
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
        const dataToSend = {
            "session_id": token,
            "data": {
                "client_id": companyId,
                "direction": direction
            }
        }
        const route = profit ? 'top_profit_regions_get/' : 'top_duration_regions_get/';
        return await this._fetch(dataToSend, route, host);
    };

    static async _getTopTenCountries(token = '', host = '', companyId, direction) {
        const dataToSend = {
            "session_id": token,
            "data": {
                "client_id": companyId,
                "direction": direction
            }
        }
        return await this._fetch(dataToSend, 'top_countries_get/', host);
    };

    static async _getTrafficShare(token = '', host = '', companyId, direction) {
        const dataToSend = {
            "session_id": token,
            "data": {
                "client_id": companyId,
                "direction": direction
            }
        }
        return await this._fetch(dataToSend, 'traffic_share_get/', host);
    };

    static defineData(data, labels) {
        let arr = [];
        for (let i in data) {
            let obj = {};
            for (let j in labels) {
                obj[labels[j]] = data[i][j];
            }
            arr.push(obj);
        }
        return arr;
    };

    static async _getFinSummary(token = '', host = '', companyId, period) {
        let start_date, end_date;
        let today = yesterday = new Date();
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
        const dataToSend = {
            "session_id": token,
            "data": {
                "start_date": start_date,
                "end_date": end_date,
                "type": 2,
                "companies": [companyId],
                "fields": [
                    "company", //company
                    "direction", //Inbound/outbound
                    "point_name", //point name v
                    "country", //country v
                    "duration", //duration v
                    "calc_duration", //calculated v
                    "attempts", //attempts v
                    "sa", //S. Attempts v
                    "op_sum", //Cost IN v
                    "tp_sum", //Cost OUT v
                    "delta_price", //Margin v
                    "delta_profit", //Profit v
                    "manager", //Account manager
                ],
            }
        }
        return await this._fetch(dataToSend, 'fin_summary_get/', host);
    };

    static dateFormat(day, start) {
        return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + 'T' + (start ? '00:00:00' : '23:59:59');
    };

    static async _login(host = '', login = '', password = '', ip = '') {
        const dataToSend = {
            "login": login,
            "password": password,
            "ip": ip
        }
        return await this._fetch(dataToSend, 'login/', host);
    };

    static async _logout(token = '', host = '') {
        return await this._fetch({ 'session_id': token, 'data': {} }, 'logout/', host);
    };

    static async _fetch(data = {}, route = '', host = '') {
        // console.log(`--${route}, dataToSend: `, data);
        const response = await fetch(this.url + '/api/' + route, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': host
            }
        });
        const json = await response.json();
        // console.log("--response: ", json);
        return json;
    };

}