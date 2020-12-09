<template>
  <div class="register">
    <img alt="Vue logo" src="../assets/logo.png">
    <img src="">
  </div>

</template>

<template>
  <div>
    <p>
      <input placeholder="Sisesta nimi" v-model="client.name">
      <br>
      <br>
      <input placeholder="Sisesta email" v-model="client.eMail">
      <br>
      <br>
      <input type="password" placeholder="Sisesta parool" v-model="client.password">
    </p>
    <br>
    <button v-on:click="createAccount()"> Registreeri </button>      <button v-on:click="login()"> Logi sisse </button>
    <br>
    <br>
    <button v-on:click="logout()"> Logi välja </button>
    <br>  <br>
    <br>
<!--    <button v-on:click="addRow"> Lisa rida </button>-->
  </div>
</template>

<script>

// let addRow = function (){
//   this.vehicleList.push({});
// }

let createAccountFunction = function () {
  let url = "http://localhost:8080/public/register";
  let config = {
    params: {}
  }
  this.$http.post(url, this.client)
      // .then(this.showResponse)
      .then(alert("Oled registreeritud kasutajaks"))
      // .then(this.login())
}

let login = function (){
  let url = "http://localhost:8080/public/login"
  this.$http.post(url, this.client).
      then(response => {
        let token = response.data;
        localStorage.setItem('user-token', token)
        this.$http.defaults.headers.common['Authorization'] = "Bearer " + token
        alert("Sisse logitud")
  })
      // .then(response => this.reply = response.data)
      // .then(alert(this.reply));
}

let logout = function (){
  localStorage.removeItem('user-token')
}

export default {
  methods: {
    createAccount: createAccountFunction,
    login:login,
    logout:logout
  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleList: [],
      client: {}
    }
  },
  created() {    //Selle created meetodi tõmbab Vue alati esimesena tööle
  }
}
</script>
