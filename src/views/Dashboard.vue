<template>
  <div class="Dashboard">

  </div>
</template>

<template>

  <div>
    <p> <input placeholder="Sõiduki nr" v-model="vehicle.vehicleId">
      Ajutine väli hoolduste sisestamiseks, kuni sisse logimine ei tööta. </p>
    <button v-on:click="getVehicleSelectedServices(vehicle.vehicleId)" > Vaheta sõidukit </button>

    <h1>Töölaud</h1>

    <table border="1" align="center">
      <tr>
        <th hidden>Id</th>
        <th>Hooldus/töö</th>
        <th>Välba ühik</th>
        <th>Välba väärtus</th>
        <th>Eelmine kp</th>
        <th>Eelmine odo</th>
        <th>Järgmine kp</th>
        <th>Järgmine odo</th>
        <th>Teostatud kp</th>
        <th>Teostatud odo</th>
        <th>Märkus</th>
      </tr>
      <tr v-for="(row, index) in vehicleSelectedServiceList">
        <td hidden>{{index}}</td>
        <td>{{row.serviceName}}</td>
        <td>{{row.pUnit}}</td>
        <td>{{row.pValue}}</td>
        <td>{{row.lastSDate}}</td>
        <td>{{row.lastSOdo}}</td>
        <td>{{row.nextSDate}}</td>
        <td>{{row.nextSOdo}}</td>
        <td><input v-model="doneDate" ></td>
        <td><input v-model="doneOdo" ></td>
        <td><input v-model="row.comment" ></td>
      </tr>
    </table>
  </div>
</template>

<script>

let getVehicleSelectedServices = function (vehicleId){
  this.$http.get("http://localhost:8080/VehicleSelectedServiceListDashboard?vehicleId=" + vehicleId)
      .then(response => this.vehicleSelectedServiceList = response.data);
}

let updateOdo = function (index){
  let url = "http://localhost:8080/updateOdo";
  let config = {    //selle osa võib ka ära jätta
    params: {}
  }
  let body = {
    vehId: this.vehicleSelectedServiceList[index].vehId,
    newOdo: this.vehicleSelectedServiceList[index].odo

  }
  this.$http.put(url, body)
      .then(alert("uuendatud"))
}

let deleteRow = function (index){
  let url="http://localhost:8080/deleteVehicle" + "?id=" + this.vehicleSelectedServiceList[index].vehId;
  this.$http.put(url)
      .then(alert("Sõiduk kustutatud"))
      .then(this.vehicleList.splice(index, 1))
}

let addVehicle = function (){
  this.vehicle.active = true;
  let url ="http://localhost:8080/addVehicle"
  this.$http.post(url, this.vehicle)
      .then(this.vehicleSelectedServiceList.push(this.vehicle))
      .then(alert("sõiduk lisatud"))
      // .then(this.$router.push({ path: 'Profilepage' }))
}

let randomFunction = function (){
  getSelection()
}

export default {
  methods: {
    getVehicleSelectedServices:getVehicleSelectedServices,
    deleteRow:deleteRow,
    updateOdo:updateOdo,
    addVehicle:addVehicle
  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleSelectedServiceList: [],
      vehicle: {}
    }
  },
  created() {this.getVehicleSelectedServices(8)   //Selle created meetodi tõmbab Vue alati esimesena tööle
  }
}
</script>
