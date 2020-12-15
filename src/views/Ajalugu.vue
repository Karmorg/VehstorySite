<template>
  <div>
    <h1>Hoolduste ajalugu</h1>
    <br>
    <table border="1" align="center">
      <caption>Sõiduki andmed</caption>
      <tr>
        <th hidden>AutoID</th>
        <th>Tootja</th>
        <th>Mudel</th>
        <th>RegNr</th>
      </tr>
      <tr v-for="(row, index) in resultList1">
        <td hidden>{{ row.id }}</td>
        <th width="60">{{ row.manufacturer }}</th>
        <td width="60">{{ row.model }}</td>
        <td width="60">{{ row.regNo }}</td>
      </tr>
    </table>
    <br>
    <table border="1" align="center">
      <caption>Teostatud hooldused</caption>
      <tr>
        <th>Nr</th>
        <th hidden>ID</th>
        <th width="125">Kuupäev</th>
        <th hidden>Auto Id</th>
        <th width="125">Hooldus</th>
        <th width="125">Kuupäev</th>
        <th width="100">Läbisõit</th>
        <th width="125">Kommentaar</th>
        <th hidden>Staatus</th>
      </tr>
      <tr v-for="(row, index) in vehicleServiceLog">
        <td>{{index+1}}</td>
        <td hidden>{{row.id}}</td>
        <td>{{ row.logDate }}</td>
        <td hidden>{{ row.vehicleId }}</td>
        <td >{{ row.serviceName }}</td>
        <td>{{ row.serviceDate }}</td>
        <td>{{ row.serviceOdo }}</td>
        <td>{{ row.comment }}</td>
        <td hidden>{{ row.active }}</td>
      </tr>
    </table>
    <br><br>
    <button v-on:click="myVehicles()">Minu sõidukid</button>
    <button v-on:click="toSelectedServices()">Sõiduki töölauale</button>
    <button v-on:click="logOut()">Logi välja</button>

  </div>

</template>


<script>
let getOneVehicle = function (vehId) {
  let url = this.$host + "/client/oneVehicle?vehicleId=" + vehId;

  this.resultList1 = this.$http.get(url)
      .then(result => this.resultList1 = result.data)
}
let getVehicleServiceLog = function (vehId) {
  let url = this.$host + "/client/vehicleServiceLog?vehicleId=" +vehId;

  this.vehicleServiceLog = this.$http.get(url)
      .then(result => this.vehicleServiceLog = result.data);
}
let myVehicles = function (){
  this.$router.push({path: "/Profilepage"})
}
let toSelectedServices = function (){
  // this.$router.push({ name: 'Dashboard', params: { vehId: vehId  }  })
  this.$router.push({ name: 'Dashboard', params: { vehId: this.$route.params.vehId } })
}
let logOut = function () {
  localStorage.removeItem('user-token')
  this.$router.push({path: '/'})
  location.reload()
}

export default {
  methods: {
    getOneVehicle: getOneVehicle,
    getVehicleServiceLog: getVehicleServiceLog,
    myVehicles,
    toSelectedServices,
    logOut
  },
  data: function () {
    return {
      resultList1: [],
      vehicleServiceLog: [],
      vehicleId: ""
    }
  },
  created() {
    // this.vehicleId = this.$route.params.vehId
    this.getOneVehicle(this.$route.params.vehId)
    this.getVehicleServiceLog(this.$route.params.vehId)
  }
}


</script>
<style scoped>
h1 {
  margin: 80px 0 0;
  color: darkcyan ;
}
ul {
  list-style-type: none;

  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

