<template >
  <div id="app">
    <div id="nav">
      <router-link to="/register">Registreeri kliendiks/ logi sisse</router-link> |
      <router-link to="/Profilepage">Minu sõidukid</router-link> |
      <router-link to="/Admin">Admin</router-link>
    </div>
    <router-view/>
  </div>
</template>

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
