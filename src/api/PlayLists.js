class PlayLists{

    getPlaylists = async (url) => {
        const response = await fetch(url + 'playlists', {
            method: 'GET'
        });
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k]).tracks
        }
    };

    getPlaylistsById = async(url, id) => {
        const response = await fetch(url + `playlists/${id}`, {
            method: 'GET'
        });
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k])["tracks"]
        }
    };

    createPlaylists = async(url, name) => {
        const response = await fetch(url + 'playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(name)
        });
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k])["tracks"]
        }
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
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k])["tracks"]
        }
    };

    deletePlaylistsById = async(id) => {
        const response = await fetch(`https://ubeat.herokuapp.com/unsecure/playlists/${id}`, {
            method: 'DELETE'
        });
        const json = await response.json();
        return {
            playlistsT: Object.keys(json).map((k) => json[k]),
            tracks: Object.keys(json).map((k) => json[k])["tracks"]
        }
    };

    addPlaylistsTracksById = async(url, id, track) => {
        const response = await fetch(url + `playlists/${id}/tracks`, {
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