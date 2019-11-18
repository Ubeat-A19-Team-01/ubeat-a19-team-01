class Users {

    signupUsers = async (url, name, email, password) => {
        const response = await fetch(url + `signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                name: name,
                email: email,
                password: password
            }
        });
        const json = await response.json();
        return {
            id: id,
            name: json.name,
            email: json.email,
            follows: json.following
        }
    };

    loginUsers = async (url, email, password) => {
        const response = await fetch(url + `login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                email: email,
                password: password
            }
        });
        const json = await response.json();
        return {
            id: id,
            name: json.name,
            email: json.email,
            token: json.token

        }
    };

    logoutUsers = async (url) => {
        const response = await fetch(url + `logout`, {
            method: 'POST'
        });
        return await response.json();
    };

    getUsers = async(url, token) => {
        const response = await fetch(url + `users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Token ${token}`
            },
        });
        const json = await response.json();
        return {
            id: id,
            name: json.name,
            email: json.email
        }
    }
}

export default Users;