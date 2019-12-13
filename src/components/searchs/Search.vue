<template>
<div>
 <GlobalSearch :searchResult="searchResult" :searchResultUsers="searchResultUsers" v-if="searchtype=='Alls'" />
 <SpecificSearch :searchResult="searchResult" v-if="searchtype!='Alls'" /> 
</div>
</template>
<script>
import API_ENDPOINT from "../../api/GetEndPoint.js";  
import GlobalSearch from "../searchs/GlobalSearch"
import SpecificSearch from "../searchs/SpecificSearch"
export default {      
      components:{GlobalSearch ,SpecificSearch}   ,
      inject:['myCookie','mySearch'],
      data() {
            return {                              
                  currentUser :localStorage.getItem('currentUser') , 
                  searchtype :localStorage.getItem('searchtype'),                
                  searchResult :[] , 
                  searchResultUsers :[] ,              
                 
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
                 this.mySearch.Search(API_ENDPOINT,searchQuery,token).then(
                  response =>{
                        this.searchResult = response ; 

                  }) 

                   searchQuery= `search/users?q=${this.$route.params.name}` ;
                 this.mySearch.Search(API_ENDPOINT,searchQuery,token).then(
                  response =>{
                        this.searchResultUsers = response ; 

                  }) 
                 



              }
              else 
              {
              searchQuery= `search/${this.searchtype}?q=${this.$route.params.name}` ; 
              this.mySearch.Search(API_ENDPOINT,searchQuery,token).then(
                  response =>{
                        this.searchResult = response ; 

                  }) 
              }  
         
              

        }

  },


      
       


}
</script>