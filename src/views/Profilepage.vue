<template xmlns="http://www.w3.org/1999/html">
  <div class="Profilepage">
  </div>

</template>
<template>


  <div>
    <h1>Minu sõidukid</h1>

    <table border="1" align="center">
      <caption>Sõiduki lisamiseks peavad kõik väljad täidetud olema</caption>
      <tr>
        <th hidden>Id</th>
        <th hidden>VehId</th>
        <th>Reg.no</th>
        <th>Tüüp</th>
        <th>Tootja</th>
        <th>Mudel</th>
        <th>Aastakäik</th>
        <th>Kütus</th>
        <th>Võimsus, kW</th>
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
        <td>{{row.odo}}</td>
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
        <td><input type="number" size="5" maxlength="4" placeholder="kw" v-model="vehicle.kW"></td>
        <td><input type="number" size="5" maxlength="9" placeholder="läbisõit" v-model="vehicle.odo"></td>
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
      .then(this.vehicleList.splice(index, 1))
}

export default {
  methods: {
    getMyVehicles:getMyVehicles,
    deleteRow:deleteRow,
    addVehicle:addVehicle,
    goToDashboard:goToDashboard,
    goToServices:goToServices,
    goToHistory:goToHistory
  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleList: [],
      vehicle: {}
    }
  },
  created() {
    this.getMyVehicles()
  }
}
</script>
