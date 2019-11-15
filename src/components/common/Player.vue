<template>
     <vuetify-audio :file=Musicfile :ended="audioFinish"></vuetify-audio>
</template>
<script>
import VuetifyAudio from 'vuetify-audio';
export default {
     components:{'vuetify-audio': VuetifyAudio} ,
    props:['Musicfile'] 
    ,methods:{
   audioFinish () {
				this.msgs.push('The audio finished.');
      },
    }
}
</script>