<script setup lang="ts">
import axios from 'axios'

const mensaje = ref(" ")

const getYear = () => {
    const token = localStorage.getItem('access_token')
    let config = {
        headers: {
            "Authorization":`Bearer ${token}`
        }
    }
    const limit = "limit=50"
    const after = "&after="+1609459200000 //Unix stamp from 01/01/2021
    const url =  "https://api.spotify.com/v1/me/player/recently-played"+"?"+limit+after
    console.log(url);
    axios.get(url, config)
    .then((response: any) => {
        console.log("------------------------------------------------------------------------------------");
        // const tracks = response.data.items
        // tracks.forEach((track: any) => {
        //     console.log(track.played_at + " - " + track.track.name);
        // });
        mensaje.value = "Work in progress!"
    })
}

</script>
<template>
    <div class="my-4">
        <div class="my-5">
            <button @click="getYear" class="btn spoti m-1" disabled>Get year summary</button>
            <h4>{{mensaje}}</h4>
      </div>
    </div>
</template>