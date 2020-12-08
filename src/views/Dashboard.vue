<template>
  <div class="Dashboard">

  </div>
</template>

<template>

  <div>
    <p> <input placeholder="Sõiduki nr" v-model="vehicle.vehId">
      Ajutine väli peab hoolduste sisestamiseks olema täidetd. Kuni sisse logimine ei tööta. </p>
    <button v-on:click="getVehicleSelectedServices(vehicle.vehId)" > Vaheta sõidukit </button>
    <br><br>

    <h1>Töölaud</h1>

    <table border="1">
      <tr >
        <th hidden>AutoID</th>
        <th>Tootja</th>
        <th>Mudel</th>
        <th>RegNr</th>
      </tr>
      <tr v-for="(row, index) in resultList1">
        <td hidden>{{row.id}}</td>
        <td>{{row.manufacturer}}</td>
        <td>{{row.model}}</td>
        <td>{{row.regNo}}</td>
      </tr>
    </table>

    <button v-on:click="goToServices(vehicle.vehId)" > Lisa hooldusi </button>
    <button v-on:click="addServiceLog()" > Sisesta hooldused logisse </button>

    <br> <br>

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
        <td hidden>{{index+1}}</td>
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

let getOneVehicle = function(vehId) {
  let url="http://localhost:8080/client/oneVehicle?vehicleId="+vehId;

  this.resultList1=this.$http.get(url)
      .then(result => this.resultList1=result.data)
}

let getVehicleSelectedServices = function (vehicleId){
  this.$http.get("http://localhost:8080/client/VehicleSelectedServiceListDashboard?vehicleId=" + vehicleId)
      .then(response => this.vehicleSelectedServiceList = response.data);
}

let addServiceLog = function (){
  let url = "http://localhost:8080/client/addServiceLog"
  this.$http.post(url, this.vehicleSelectedServiceList)
  .then(alert("kanded ajaloos"))

}

let updateOdo = function (index) {
  let url = "http://localhost:8080/client/updateOdo";

  let body = {
    vehId: this.vehicleSelectedServiceList[index].vehId,
    newOdo: this.vehicleSelectedServiceList[index].odo

  }
  this.$http.put(url, body)
      .then(alert("uuendatud"))
}

let goToServices = function (vehId){
  this.$router.push({ name: 'TeenusteValimine', params: { vehId: vehId  }  })
}

let deleteRow = function (index){
  let url="http://localhost:8080/client/deleteVehicle?id=" + this.vehicleSelectedServiceList[index].vehId;
  this.$http.put(url)
      .then(alert("Sõiduk kustutatud"))
      .then(this.vehicleList.splice(index, 1))
}

export default {
  methods: {
    getVehicleSelectedServices:getVehicleSelectedServices,
    getOneVehicle: getOneVehicle,
    deleteRow:deleteRow,
    updateOdo:updateOdo,
    addServiceLog,
    goToServices,

  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleSelectedServiceList: [],
      vehicle: {},
      resultList1: []
    }
  },
  created() {
    this.vehicle.vehId = this.$route.params.vehId
    this.getVehicleSelectedServices(this.vehicle.vehId)
    this.getOneVehicle(this.vehicle.vehId)
  }
}
</script>
