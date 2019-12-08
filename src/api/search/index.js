class Search {

    //Search = async(url,searchtype,searchWord,token) => {
        Search = async(url,searchQuery,token) => {

        //   let uri  ; 

        //     switch(searchtype) {
        //     case "Alls":
        //         uri =`search?q=${searchWord}`
        //     break;
        //     case "albums" :
        //          uri =`search/albums?q=${searchWord}` ;  
                
        //         break ; 
        //     case "artists":
        //         uri =`search/artists?q=${searchWord}` ;    
        //         break ; 
        //     case "tracks": 
        //        uri =`search/tracks?q=${searchWord}` ;   
        //        break;
        //     case "users":
        //        uri =`search/users?q=${searchWord}` ; 
        //     break;            
        //     default:
        //         uri =`search?q=${searchWord}` ;
        //      }              
         
        //      localStorage.setItem('req',uri) ; 

            const response = await fetch(url + searchQuery, {
            method: 'GET',
            headers:{"Authorization":token}
        });
        
   
        return await response.json();
    };
  

}

export default Search;