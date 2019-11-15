class Artists {

    getArtistsById = async(url, id) => {
        const response = await fetch(url + `artists/${id}`, {
            method: 'GET'
        });
        const json = await response.json() ;
        // const json = await response.json();
        // return json ; 
        return {
             result: json.results.map((day) => Object.assign({resultCount:json.resultCount}, day))
         }
    };

    getAlbumsByArtistsId = async(url, id) => {
        const response = await fetch(url + `artists/${id}/albums`, {
            method: 'GET'
        });
        const json = await response.json();
        return {
            resultCount: json.resultCount,
            result: json.results.map((day) => Object.assign(json.resultCount, day))
        }
    }
}

export default Artists;