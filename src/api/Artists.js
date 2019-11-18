class Artists {

    getArtistsById = async(url, id) => {
        const response = await fetch(url + `artists/${id}`, {
            method: 'GET'
        });
        const json = await response.json() ;
        return {
             result: json.results.map((eachElement) => Object.assign({resultCount:json.resultCount}, eachElement))
         }
    };

    getAlbumsByArtistsId = async(url, id) => {
        const response = await fetch(url + `artists/${id}/albums`, {
            method: 'GET'
        });
        const json = await response.json();
        return {
            resultCount: json.resultCount,
            result: json.results.map((eachElement) => Object.assign(json.resultCount, eachElement))
        }
    }
}

export default Artists;