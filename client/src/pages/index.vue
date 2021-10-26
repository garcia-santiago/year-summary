<script setup lang="ts">

import axios from 'axios'
import GetTops from "../components/GetTops.vue"
import GetYear from "../components/GetYear.vue"


const loggeado = ref(false)

const nombre = ref("")

const authLogin = () => {
  const client_id: string = "?client_id=8f4b90e854a8466e98424b0310ec4e63"
  const response_type: string = "&response_type=code"
  const redirect_uri: string = "&redirect_uri=http://localhost:3333/" 
  const scope: string = "&scope=user-top-read user-read-recently-played"

  const url = "https://accounts.spotify.com/authorize"+client_id+response_type+redirect_uri+scope

  location.href = url;
}

const getToken = () => {
  const code = localStorage.getItem('code')
  axios.post('api/user/token', {code: code})
  .then((response: any) => {
      //console.log(response);
    const {access_token, refresh_token} = response.data
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
  })
}

const getPerfil = () => {
  const token = localStorage.getItem('access_token')
  let config = {
      headers: {
          "Authorization":`Bearer ${token}`
      }
  }
  axios.get('https://api.spotify.com/v1/me', config)
  .then((response: any) => {
      //console.log(response);
      nombre.value = response.data.display_name
  })
  .catch(() => {
      const refresh_token = localStorage.getItem('refresh_token')
      axios.post('api/user/trefresh', {refresh_token})
      .then((response: any) => {
          if(response.status == 200){
              localStorage.setItem('access_token', response.data.access_token)
              getPerfil()
          }
      })
      
  })
}

onMounted(() => {
  const route = useRoute();
  const logged: string | null = localStorage.getItem('logged')
  // En primer login
  if(route.query.code && logged==null){
    let code: string | any= route.query.code
    localStorage.setItem('code', code);
    localStorage.setItem('logged', 'true');
    loggeado.value = true
    getToken()
    getPerfil()
  }
  else if(logged=='true'){
    loggeado.value = true
    getPerfil()
  }

})


</script>

<template>
  <h1 class="text-4xl font-bold mb-4">Year summary </h1> 


  <button @click="authLogin" class="btn spoti" v-show="!loggeado">LOGIN</button>

    <div v-if="loggeado">
        <h2 class="text-3xl">Hello {{nombre}}</h2> 
        
        <GetYear />

        <GetTops />

    </div>

</template>