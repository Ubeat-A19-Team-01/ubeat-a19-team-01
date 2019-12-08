<template>
 <GlobalSearch :searchResult="searchResult" />
</template>
<script>
import API_ENDPOINT from "../../api/GetEndPoint.js";  
import GlobalSearch from "../../components/searchs/GlobalSearch"
export default {      
      components:{GlobalSearch}   ,
      inject:['myCookie','mySearch'],
      data() {
            return {                              
                  currentUser :localStorage.getItem('currentUser') , 
                  searchtype :localStorage.getItem('searchtype'),                
                  searchResult :[] ,              
                 
            };
        } 
   ,   
  Update() {
        this.Search() ; 
  },

  mounted(){
this.Search() ; 
  },

  methods: {
 
        Search()
        {
               let token = this.myCookie.get(this.currentUser) ; 
              
               let searchQuery; 

                if(this.searchtype=='Alls')
              {
                 searchQuery= `search?q=${this.$route.params.name}` ;
              }
              else 
              {
              searchQuery= `search/${this.searchtype}?q=${this.$route.params.name}` ; 
              }  
         
              this.mySearch.Search(API_ENDPOINT,searchQuery,token).then(
                  response =>{
                        this.searchResult = response ; 

                  }) 

        }

  },


      
       


}
</script>