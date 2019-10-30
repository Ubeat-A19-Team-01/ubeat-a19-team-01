class Artists {

    getArtistsById = async(url, id) => {
        const response = await fetch(url + `/artists/${id}`, {
            method: 'GET'
        });
        return await response.json();
    };

    getAlbumsByArtistsId = async(url, id) => {
        const response = await fetch(url + `/artists/${id}/albums`, {
            method: 'GET'
        });
        return await response.json();
    }
}

export default Artists;