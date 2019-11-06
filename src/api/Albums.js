/* Module Albums */

    getAlbumsById = async(url, id) => {
        const response = await fetch(url + `/albums/${id}`, {
            method: 'GET'
        });
        return await response.json();
    };

    getTracksByAlbumsById = async(url, id) => {
        const response = await fetch(url + `/albums/${id}/tracks`, {
            method: 'GET'
        });
        return await response.json();
    }


