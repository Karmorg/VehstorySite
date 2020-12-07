<template>
  <div class="Dashboard">

  </div>
</template>

<template>

  <div>
    <p> <input placeholder="Sõiduki nr" v-model="vehicle.vehicleId">
      Ajutine väli hoolduste sisestamiseks, kuni sisse logimine ei tööta. </p>
    <button v-on:click="getVehicleSelectedServices(vehicle.vehicleId)" > Vaheta sõidukit </button>
    <button v-on:click="addServiceLog(vehicle.vehicleId)" > Sisesta hooldused logisse </button>

    <h1>Töölaud</h1>

    <table border="1" align="center">
      <tr>
        <th hidden>Id</th>
        <th>Töö nr</th>
        <th>Hooldus/töö</th>
        <th>Sõiduki nr</th>
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
        <td>{{row.serviceId}}</td>
        <td>{{row.serviceName}}</td>
        <td>{{row.vehicleId}}</td>
        <td>{{row.pUnit}}</td>
        <td>{{row.pValue}}</td>
        <td>{{row.lastSDate}}</td>
        <td>{{row.lastSOdo}}</td>
        <td>{{row.nextSDate}}</td>
        <td>{{row.nextSOdo}}</td>
        <td><input type="date" v-model="row.serviceDate" ></td>
        <td><input v-model="row.serviceOdo" ></td>
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

let addServiceLog = function (vehicleId){
  let url = "http://localhost:8080/addServiceLog"
  this.$http.post(url, this.vehicleSelectedServiceList)
  .then(alert("kanded ajaloos"))
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


export default {
  methods: {
    getVehicleSelectedServices:getVehicleSelectedServices,
    deleteRow:deleteRow,
    updateOdo:updateOdo,
    addServiceLog

  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleSelectedServiceList: [],
      vehicle: {}
    }
  },
  created() {
    // this.getVehicleSelectedServices(this.$route.params.vehId)   //Selle created meetodi tõmbab Vue alati esimesena tööle
    this.getVehicleSelectedServices(84)   //Selle created meetodi tõmbab Vue alati esimesena tööle
  }
}
</script>
