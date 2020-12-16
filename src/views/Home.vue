<template id="logo">

  <div class="home">
    <h1>Vehstory</h1>
    <h2>Minu sõidukite hoolduste ajalugu</h2>

    <p>
      <br>
      <input placeholder="Sisesta email" v-model="client.eMail">
      <br>
      <br>
      <input type="password" placeholder="Sisesta parool" v-model="client.password">
    </p>
    <br>
    <button v-on:click="createAccount()"> Registreeri</button>
    <button v-on:click="login()"> Logi sisse</button>
    <br>

    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>


<script>

let createAccountFunction = function () {
  let url = this.$host + "/public/register";

  this.$http.post(url, this.client)
      .then(response => this.login())
      .catch(error => {
            if (error.response.status == 400) {
              alert(error.response.data.message)
              location.reload()
            }
          }
      )
}

let login = function () {
  let url = this.$host + "/public/login"
  this.$http.post(url, this.client)
      .then(response => {
        let token = response.data;
        localStorage.setItem('user-token', token)
        this.$http.defaults.headers.common['Authorization'] = "Bearer " + token
        this.$router.push({path: "Profilepage"})
        location.reload()
      }).catch(error => {
    if (error.response.status == 400) {
      alert(error.response.data.message)
      location.reload()
    } else if (error.response.status == 500) {
      alert("Serveri koodi annab veel paremaks teha")
    }
  })
}
export default {
  methods: {
    createAccount: createAccountFunction,
    login: login
  },
  data: function () {      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleList: [],
      client: {}
    }
  },
  created() {
  }
}
</script>
