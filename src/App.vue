<template >
  <div id="app">
    <div id="nav">
      <router-link v-if="token" to="/Profilepage">Minu sõidukid</router-link>   .
      <button v-if="token" v-on:click="logOut()" >Logi välja</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
let logOut = function (){
  localStorage.removeItem('user-token')
  this.$router.push({path: '/'})
  location.reload()
}

export default {
  methods:{
    logOut
  },
  data(){
    return {
      token: ''
    }
  },
  created() {
    this.token = localStorage.getItem('user-token')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: dodgerblue;
}
</style>
