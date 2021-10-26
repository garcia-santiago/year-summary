<script setup lang="ts">
import axios from 'axios'
import { isDark } from '~/logic'


const top: Top = {
  tracks: [{
    name: "",
    artists: [
      {name: ""}
    ]
  }],
  artists: [{
    name: ""
  }]
}
const mostrar = ref({
  top_tracks: false,
  top_artists: false
})

const getTop = (tipo: string) => {
  const token = localStorage.getItem('access_token')
  let config = {
      headers: {
          "Authorization":`Bearer ${token}`
      }
  }
  const time_range = "time_range=medium_term"
  const limit = "&limit=20"
  const offset = "&offset=0"
  const url =  "https://api.spotify.com/v1/me/top/"+tipo+"?"+time_range+limit+offset
  //console.log(url, config);
  axios.get(url, config)
  .then((response: any) => {
      if(tipo === "tracks"){
        // console.log("Tracks: ");
        // console.log(response.data);
        top.tracks = response.data.items
        mostrar.value.top_artists = false
        mostrar.value.top_tracks = true
      }
      else if(tipo === "artists"){
        // console.log("Artists: ");
        // console.log(response.data);
        top.artists = response.data.items
        mostrar.value.top_tracks = false
        mostrar.value.top_artists = true
      }


  })

}


</script>
<template>
  <div class="my-4">
      <div class="my-5">
          <button @click="getTop('tracks')" class="btn spoti m-1 mx-3">Get Top 20 tracks</button>
          <button @click="getTop('artists')" class="btn spoti m-1 mx-3">Get Top 20 artists</button>
          <p>(from the last ~6 months)</p>
      </div>

      <table class="table-auto mx-auto" v-show="mostrar.top_tracks">

          <thead>
          <tr>
              <th>Song</th>
              <th>Artist</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="track in top.tracks" v-if="isDark">
              <td class="td-dark"> {{track.name}} </td>
              <td class="td-dark"> {{track.artists[0].name}} </td>
          </tr>
          <tr v-for="track in top.tracks" v-if="!isDark">
              <td> {{track.name}} </td>
              <td> {{track.artists[0].name}} </td>
          </tr>
          </tbody>

      </table>

      <table class="table-auto mx-auto" v-show="mostrar.top_artists">

          <thead>
          <tr>
              <th>Artist</th>
          </tr>
          </thead>

          <tbody>
            <tr v-for="artist in top.artists" v-if="isDark">
                <td class="td-dark"> {{artist.name}} </td>
            </tr>
            <tr v-for="artist in top.artists" v-if="!isDark">
                <td> {{artist.name}} </td>
            </tr>

          </tbody>

      </table>
  </div>
</template>
<style>
.td-dark{
  @apply border-light-100;
}
</style>
