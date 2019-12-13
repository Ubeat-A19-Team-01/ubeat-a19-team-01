class UserSession {

    getTokenInfo = async (url,token) => {
        const response = await fetch(url + 'tokenInfo', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        const json = await response.json();
        return {
            id: json.id,
            name: json.name,
            token: json.token,
            email: json.email,
            followings:json.following
        }
    };
}

export default UserSession;