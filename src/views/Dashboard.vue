<template>
  <div class="Dashboard">

  </div>
</template>

<template>

  <div>
    <p><input placeholder="Sõiduki nr" v-model="vehicle.vehicleId">
      Ajutine väli hoolduste sisestamiseks, kuni sisse logimine ei tööta. </p>
    <button v-on:click="getVehicleSelectedServices(vehicle.vehicleId)"> Vaheta sõidukit</button>

    <h1>Töölaud</h1>

    <button v-on:click="addLog()"> Sisesta tööd logisse</button>
    <br> <br>

    <table border="1" align="center">
      <tr>
        <th >Id</th>
        <th hidden>Töö ID</th>
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
        <td >{{ index+1 }}</td>
        <td hidden>{{row.serviceId}}</td>
        <td>{{ row.serviceName }}</td>
        <td>{{ row.pUnit }}</td>
        <td>{{ row.pValue }}</td>
        <td>{{ row.lastSDate }}</td>
        <td>{{ row.lastSOdo }}</td>
        <td>{{ row.pValue + row.lastSOdo }}</td>
        <td>{{ row.nextSOdo }}</td>
        <td><input v-model="row.serviceDate"></td>
        <td><input v-model="row.serviceOdo"></td>
        <td><input v-model="row.comment"></td>
      </tr>
    </table>
  </div>
</template>

<script>

let getVehicleSelectedServices = function (vehicleId) {
  this.$http.get("http://localhost:8080/VehicleSelectedServiceListDashboard?vehicleId=" + vehicleId)
      .then(response => this.vehicleSelectedServiceList = response.data);
}

let updateOdo = function (index) {
  let url = "http://localhost:8080/updateOdo";
  let body = {
    vehId: this.vehicleSelectedServiceList[index].vehId,
    newOdo: this.vehicleSelectedServiceList[index].odo

  }
  this.$http.put(url, body)
      .then(alert("uuendatud"))
}

let addLog = function () {
  let url = "http://localhost:8080/addServiceLog";
  this.$http.post(url, this.vehicleSelectedServiceList)
}

export default {
  methods: {
    getVehicleSelectedServices: getVehicleSelectedServices,
    updateOdo: updateOdo,
    addLog: addLog
  },
  data: function () {      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleSelectedServiceList: [],
      vehicle: {}
    }
  },
  created() {
    let a =this.$route.params.vehId
    this.getVehicleSelectedServices(a)   //Selle created meetodi tõmbab Vue alati esimesena tööle
  }
}
</script>
