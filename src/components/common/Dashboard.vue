<template>
    <div>
        <Navigation/>
        <v-content class="body">
            <router-view :key="$route.fullPath">
           

            </router-view>
        </v-content>
    </div>
</template>

<script>
    import Navigation from "../common/Navigation";
    
    export default {
        name: "Dashboard",
            components: {
            Navigation,
           
        },
    }
</script>

<style scoped>

</style>