<template>
  <div class="profile_page">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<template>

  <div>
    <p> <input placeholder="Kliendi nr" v-model="vehicle.clientId">
      Ajutine väli sõiduki sisestamiseks, kuni sisse logimine ei tööta. </p>

    <h1>Minu sõidukid</h1>

    <table border="1" align="center">
      <tr>
        <th hidden>Id</th>
        <th hidden>VehId</th>
        <th>Reg.no</th>
        <th>Tüüp</th>
        <th>Tootja</th>
        <th>Mudel</th>
        <th>Aastakäik</th>
        <th>Kütus</th>
        <th>Mootori võimsus, kW</th>
        <th>Läbisõit</th>
      </tr>
      <tr v-for="(row, index) in vehicleList">
        <td hidden>{{index}}</td>
        <td hidden>{{row.vehId}}</td>
        <td>{{row.regNo}}</td>
        <td>{{row.type}}</td>
        <td>{{row.manufactorer}}</td>
        <td>{{row.model}}</td>
        <td>{{row.year}}</td>
        <td>{{row.fuel}}</td>
        <td>{{row.kW}}</td>
        <td><input v-model="row.odo" ></td>
        <td><button v-on:click="updateOdo(index)" > Uuenda läbisõitu </button></td>
        <td><button v-on:click="goToServices(row.vehId)" > Hoolduste valik </button></td>
        <td><button v-on:click="goToDashboard(row.vehId)" > Töölauale </button></td>
        <td><button v-on:click="deleteRow(index)">Kustuta sõiduk</button></td>
      </tr>
      <tr>
        <td><input placeholder="reg. nr" v-model="vehicle.regNo"></td>
        <td><input placeholder="tüüp" v-model="vehicle.type"></td>
        <td><input placeholder="tootja" v-model="vehicle.manufactorer"></td>
        <td><input placeholder="mudel" v-model="vehicle.model"></td>
        <td><input placeholder="aasta" v-model="vehicle.year"></td>
        <td><input placeholder="kütus" v-model="vehicle.fuel"></td>
        <td><input placeholder="kw" v-model="vehicle.kW"></td>
        <td><input placeholder="läbisõit" v-model="vehicle.odo"></td>
        <td><button v-on:click="addVehicle()">Lisa sõiduk</button></td>
      </tr>
    </table>
  </div>
</template>

<script>

let getMyVehicles = function (clientId){
  this.$http.get("http://localhost:8080/myVehicles?clientId=" + clientId)
      .then(response => this.vehicleList = response.data);
}

let updateOdo = function (index){
  let url = "http://localhost:8080/updateOdo";
  let config = {    //selle osa võib ka ära jätta
    params: {}
  }
  let body = {
    vehId: this.vehicleList[index].vehId,
    newOdoValue: this.vehicleList[index].odo

  }
  this.$http.put(url, body)
      .then(alert("uuendatud"))
}

let goToDashboard = function (vehicleId){
  this.$router.push({ path: 'Dashboard', params: { vehId: vehicleId } })
}

let goToServices = function (vehicleId){
  this.$router.push({ path: 'TeenusteValimine', params: { vehId: vehicleId } })
}

let deleteRow = function (index){
  let url="http://localhost:8080/deleteVehicle" + "?id=" + this.vehicleList[index].vehId;
  this.$http.put(url)
      .then(alert("Sõiduk kustutatud"))
      .then(this.vehicleList.splice(index, 1))
}

let addVehicle = function (){
  this.vehicle.active = true;
  let url ="http://localhost:8080/addVehicle"
  this.$http.post(url, this.vehicle)
      .then(this.vehicleList.push(this.vehicle))
      .then(alert("sõiduk lisatud"))
      // .then(this.$router.push({ path: 'Profilepage' }))
}

let randomFunction = function (){
  getSelection()
}

export default {
  methods: {
    getMyVehicles:getMyVehicles,
    deleteRow:deleteRow,
    updateOdo:updateOdo,
    addVehicle:addVehicle,
    goToDashboard:goToDashboard,
    goToServices:goToServices
  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleList: [],
      vehicle: {}
    }
  },
  created() {this.getMyVehicles(3)   //Selle created meetodi tõmbab Vue alati esimesena tööle
  }
}
</script>
