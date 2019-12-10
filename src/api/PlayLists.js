class PlayLists{

    getPlaylists = async (url, token) => {
        const response = await fetch(url + 'playlists', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k]).tracks
        }
    };

    getPlaylistsById = async(url, id, token) => {
        const response = await fetch(url + `playlists/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k])["tracks"]
        }
    };

    createPlaylists = async(url, name, token) => {
        const response = await fetch(url + 'playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
               name: name.name,
               owner: name.owner
            })
        });
        const json = await response.json();
        return {
           json
        }
    };

    modifyPlaylistsById = async(url, id, name, token) => {
        const response = await fetch(url + `playlists/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                name: name
            })
        });
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k])["tracks"]
        }
    };

    deletePlaylistsById = async(id, token) => {
        const response = await fetch(`https://ubeat.herokuapp.com/unsecure/playlists/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k])["tracks"]
        }
    };

    addPlaylistsTracksById = async(url, id, track, token) => {
        const response = await fetch(url + `playlists/${id}/tracks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(track)
        });
        return await response.json();
    };

    deletePlaylistsByIdAndTrackId = async(id, trackId, token) => {
        const response = await fetch(`https://ubeat.herokuapp.com/unsecure/playlists/${id}/tracks/${trackId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });
        return await response.json();
    }


}

export default PlayLists;