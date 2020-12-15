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

export default {
  methods: {
    getOneVehicle: getOneVehicle,
    getVehicleServiceLog: getVehicleServiceLog

  },
  data: function () {
    return {
      resultList1: [],
      vehicleServiceLog: []

    }
  },
  created() {
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

