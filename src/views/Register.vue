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
      <input placeholder="Sisesta parool" v-model="client.password">
    </p>
    <br>
    <button v-on:click="createAccount()"> Registreeri </button>
    <button> Login </button>
    <br>  <br>
    <br>
    <button v-on:click="addRow"> Lisa rida </button>

    <table border="1">
      <tr>
        <th>Id</th>
        <th>VehId</th>
        <th>Reg.no</th>
        <th>Odo</th>
        <th>Uuenda</th>
        <th>tüüp</th>
      </tr>
      <tr v-for="(row, index) in vehicleList">
        <td>{{index}}</td>
        <td>{{row.vehId}}</td>
        <td>{{row.regNo}}</td>
        <td><input v-model="row.odo" ></td>
        <td><button v-on:click="updateOdo(index)" > Uuenda läbisõitu </button></td>
        <td>{{row.type}}</td>
        <td><button v-on:click="deleteRow(index)">Delete row</button></td>
      </tr>
    </table>
  </div>
</template>

<script>

let addRow = function (){
  this.vehicleList.push({});
}

let deleteRow = function (index){
  this.vehicleList.splice(index, 1);
}

let updateOdo = function (index){
  alert(this.vehicleList[index].odo);
  let url = "http://localhost:8080/updateOdo";
  let config = {
    params: {}
  }
  let body = {
    vehId: this.vehicleList[index].vehId,
    newOdoValue: this.vehicleList[index].odo

  }
  this.$http.put(url, body)
      .then(alert("uuendatud"))

}

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

let getAllVehicles = function (){
  this.$http.get("http://localhost:8080/allVehicles")
      .then(response => this.vehicleList = response.data);
}

export default {
  methods: {
    createAccount: createAccountFunction,
    getAllVehicles:getAllVehicles,
    addRow:addRow,
    deleteRow:deleteRow,
    updateOdo:updateOdo
    // showResponse: showResponse
  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleList: [],
      client: {}
    }
  },
  created() {this.getAllVehicles()    //Selle created meetodi tõmbab Vue alati esimesena tööle
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
