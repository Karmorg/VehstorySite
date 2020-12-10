<template xmlns="http://www.w3.org/1999/html">
  <div class="Profilepage">
  </div>

</template>
<template>

  <div>
    <p align="right"><button  v-on:click="logout()" > Logi välja </button></p>

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
        <td><input size="5" maxlength="9" v-model="row.odo" ></td>
        <td><button v-on:click="updateOdo(index)" > Uuenda läbisõitu </button></td>
        <td><button v-on:click="goToServices(row.vehId)" > Hoolduste valik </button></td>
        <td><button v-on:click="goToDashboard(row.vehId)" > Töölauale </button></td>
        <td><button v-on:click="goToHistory(row.vehId)" > Ajalugu </button></td>
        <td><button v-on:click="deleteRow(index)">Kustuta sõiduk</button></td>
      </tr>
      <tr>
        <td><input size="5" maxlength="9" placeholder="reg. nr" v-model="vehicle.regNo"></td>
        <td><input size="8" maxlength="12" placeholder="tüüp" v-model="vehicle.type"></td>
        <td><input size="8" maxlength="20" placeholder="tootja" v-model="vehicle.manufactorer"></td>
        <td><input size="8" maxlength="20" placeholder="mudel" v-model="vehicle.model"></td>
        <td><input size="5" maxlength="4" placeholder="aasta" v-model="vehicle.year"></td>
        <td><input size="8" maxlength="15" placeholder="kütus" v-model="vehicle.fuel"></td>
        <td><input size="5" maxlength="4" placeholder="kw" v-model="vehicle.kW"></td>
        <td><input size="5" maxlength="9" placeholder="läbisõit" v-model="vehicle.odo"></td>
        <td><button v-on:click="addVehicle()">Lisa sõiduk</button></td>
      </tr>
    </table>
  </div>
</template>

<script>

let getMyVehicles = function (){
  this.$http.get(this.$host + "/client/myVehicles")
      .then(response => this.vehicleList = response.data);
}

let addVehicle = function (){
  this.vehicle.active = true;
  let url =this.$host + "/client/addVehicle"
  this.$http.post(url, this.vehicle)
      .then(() => {
          alert("Sõiduk on lisatud. Alusta hoolduste valikuga.")
          this.getMyVehicles()
          this.vehicle = {}})
      // .then(this.$router.push({ name: 'TeenusteValimine', params: { vehId: vehId  }  }))
  // .then(this.$router.push({ path: 'Profilepage' }))
}

let updateOdo = function (index){
  let url = this.$host + "/client/updateOdo";
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

let goToDashboard = function (vehId){
  this.$router.push({ name: 'Dashboard', params: { vehId: vehId } })
}

let goToServices = function (vehId){
  this.$router.push({ name: 'TeenusteValimine', params: { vehId: vehId  }  })
}

let goToHistory = function (vehId){
  this.$router.push({ name: 'Ajalugu', params: { vehId: vehId } })
}

let deleteRow = function (index){
  let url=this.$host + "/client/deleteVehicle?id=" + this.vehicleList[index].vehId;
  this.$http.put(url)
      .then(alert("Sõiduk kustutatud"))
      .then(this.vehicleList.splice(index, 1))
}
let logout = function (){
  localStorage.removeItem('user-token')
  // location.reload()
  this.$router.push({path: '/'})
}

export default {
  methods: {
    getMyVehicles:getMyVehicles,
    deleteRow:deleteRow,
    updateOdo:updateOdo,
    addVehicle:addVehicle,
    goToDashboard:goToDashboard,
    goToServices:goToServices,
    goToHistory:goToHistory,
    logout
  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleList: [],
      vehicle: {}
    }
  },
  created() {
    // this.vehicle.clientId = 1
    this.getMyVehicles()
     //Selle created meetodi tõmbab Vue alati esimesena tööle
  }
}
</script>
