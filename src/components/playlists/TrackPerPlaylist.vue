<template>
    <div>
        <app-track-per-playlist>

        </app-track-per-playlist>
    </div>
</template>

<script>
    import TrackOnlyPerPlaylist from "./TrackOnlyPerPlaylist";
    export default {
        name: "TrackPerPlaylist",
        components: {
            AppTrackPerPlaylist: TrackOnlyPerPlaylist
        }
    }
</script>

<style scoped>

</style>