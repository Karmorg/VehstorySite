<template>
  <div class="register">
    <img alt="Vue logo" src="../assets/logo.png">
<!--    <HelloWorld msg="Registreerige uus kasutaja või sisestage oma andmed sisse logimiseks"/>-->
  </div>

</template>

<template>
  <div>
    <p>
      <input placeholder="Sisesta nimi" v-model="client.name">
      <input placeholder="Sisesta email" v-model="client.eMail">
    </p>
    <br>
    <button v-on:click="createAccount()"> Registreeri </button>
    <button> Login </button>
  </div>
</template>

<script>

// let showResponse = function (response) {
//   alert("1");
//   this.resultList = response.data;
// }
let createAccountFunction = function () {
  let url = "http://localhost:8080/register";
  let config = {
    params: {}
  }
  this.$http.post(url, this.client)
      // .then(this.showResponse)
      .then(alert("tehtud"))
  // this.accountNo = "";
}
export default {
  methods: {
    createAccount: createAccountFunction
    // showResponse: showResponse
  },
  data: function () {
    return {
      client: {}
      // resultList: []
    }
  }
}
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
//
// export default {
//   name: 'Home',
//   components: {
//     HelloWorld
//   }
// }
</script>
