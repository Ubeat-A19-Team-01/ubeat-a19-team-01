class PlayLists{

    getPlaylists = async (url) => {
        const response = await fetch(url + 'playlists', {
            method: 'GET'
        });
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k])["tracks"]
        }
    };

    getPlaylistsById = async(url, id) => {
        const response = await fetch(url + `playlists/${id}`, {
            method: 'GET'
        });
        return await response.json();
    };

    createPlaylists = async(url, name) => {
        const response = await fetch(url + 'playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(name)
        });
        return await response.json();
    };

    modifyPlaylistsById = async(url, id, name) => {
        const response = await fetch(url + `playlists/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        });
        return await response.json();
    };

    deletePlaylistsById = async(url, id) => {
        const response = await fetch(url +`playlists/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    };

    addPlaylistsTracksById = async(url, id, track) => {
        const response = await fetch(url + `playlists/${id}/${track}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(track)
        });
        return await response.json();
    };

    deletePlaylistsByIdAndTrackId = async(url, id, trackId) => {
        const response = await fetch(url + `playlists/${id}/tracks/${trackId}`, {
            method: 'DELETE'
        });
        return await response.json();
    }


}

export default PlayLists;