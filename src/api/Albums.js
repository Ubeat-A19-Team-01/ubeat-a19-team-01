/* Module Albums */
class Albums
{
  getAlbumsById = async(url, id,token) => {
        const response = await fetch(url + `albums/${id}`, {
            method: 'GET' ,
            headers:{"Authorization":token}

        });
        return await response.json();
    };

   getTracksByAlbumsById = async(url, id,token) => {
        const response = await fetch(url + `albums/${id}/tracks`, {
            method: 'GET',
            headers:{"Authorization":token}

        });
        return await response.json();
    };

}
export default Albums ; 