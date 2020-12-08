<template xmlns="http://www.w3.org/1999/html">
  <div class="Admin">
  </div>

</template>

<template>

  <div>
    <p><input placeholder="Kliendi nr" v-model="vehicle.clientId"> Täita sõiduki sisestamisel </p>

    <h1>Kõik sõidukid</h1>

    <table border="1" align="center">
      <tr>
        <th>Id</th>
        <th>VehId</th>
        <th>Reg.no</th>
        <th>Tüüp</th>
        <th>Tootja</th>
        <th>Mudel</th>
        <th>Aastakäik</th>
        <th>Kütus</th>
        <th>Mootori võimsus, kW</th>
        <th>Läbisõit</th>
        <th>Aktiivne</th>
      </tr>
      <tr v-for="(row, index) in vehicleList">
        <td>{{index}}</td>
        <td>{{row.vehId}}</td>
        <td>{{row.regNo}}</td>
        <td>{{row.type}}</td>
        <td>{{row.manufactorer}}</td>
        <td>{{row.model}}</td>
        <td>{{row.year}}</td>
        <td>{{row.fuel}}</td>
        <td>{{row.kW}}</td>
        <td><input v-model="row.odo" ></td>
        <td>{{row.active}}</td>
        <td><button v-on:click="updateOdo(index)" > Uuenda läbisõitu </button></td>
        <td><button v-on:click="deleteRow(index)">Kustuta sõiduk</button></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td><input placeholder="reg. nr" v-model="vehicle.regNo"></td>
        <td><input placeholder="tüüp" v-model="vehicle.type"></td>
        <td><input placeholder="tootja" v-model="vehicle.manufactorer"></td>
        <td><input placeholder="mudel" v-model="vehicle.model"></td>
        <td><input placeholder="aasta" v-model="vehicle.year"></td>
        <td><input placeholder="kütus" v-model="vehicle.fuel"></td>
        <td><input placeholder="kw" v-model="vehicle.kW"></td>
        <td><input placeholder="läbisõit" v-model="vehicle.odo"></td>
        <td>{{vehicle.kW}}"</td>
        <td><button v-on:click="addVehicle()">Lisa sõiduk</button></td>
      </tr>
    </table>
  </div>
</template>

<script>

let getAllVehicles = function (){
  this.$http.get("http://localhost:8080/public/allVehicles")
      .then(response => this.vehicleList = response.data);
}

let updateOdo = function (index){
  let url = "http://localhost:8080/client/updateOdo";
  let body = {
    vehId: this.vehicleList[index].vehId,
    newOdo: this.vehicleList[index].odo

  }
  this.$http.put(url, body)
      .then(alert("uuendatud"))
}

let deleteRow = function (index){
  let url="http://localhost:8080/client/deleteVehicle?id=" + this.vehicleList[index].vehId;
  this.$http.put(url)
      .then(alert("Sõiduk kustutatud"))
      .then(this.vehicleList.splice(index, 1))
}


let addVehicle = function (){
  this.vehicle.active = true;
  let url ="http://localhost:8080/client/addVehicle"
  this.$http.post(url, this.vehicle)
      .then(this.getAllVehicles())
}

export default {
  methods: {
    getAllVehicles:getAllVehicles,
    deleteRow:deleteRow,
    updateOdo:updateOdo,
    addVehicle:addVehicle
  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleList: [],
      vehicle: {}
    }
  },
  created() {this.getAllVehicles()   //Selle created meetodi tõmbab Vue alati esimesena tööle
  }
}
</script>
