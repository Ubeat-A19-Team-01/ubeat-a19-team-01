class Search {

    
        Search = async(url,searchQuery,token) => {        

            const response = await fetch(url + searchQuery, {
            method: 'GET',
            headers:{"Authorization":token}
        });
        
   
        return await response.json();
    };
  

}

export default Search;