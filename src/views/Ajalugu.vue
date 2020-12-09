<template>
  <div>
    <h1>Ajalugu</h1>
    <br>
    <table align="center" border="1">
      <tr hidden>
        <th>AutoID</th>
        <th>Tootja</th>
        <th>Mudel</th>
        <th>RegNr</th>
      </tr>
      <tr v-for="(row, index) in resultList1">
        <td hidden>{{ row.id }}</td>
        <td>{{ row.manufacturer }}</td>
        <td>{{ row.model }}</td>
        <td>{{ row.regNo }}</td>
      </tr>
    </table>
    <br>
    <table border="1">
      <tr>
        <th>ID</th>
        <th>Kuupäev</th>
        <th>Auto Id</th>
        <th>Hooldus</th>
        <th>Kuupäev</th>
        <th>Läbisõit</th>
        <th>Kommentaar</th>
        <th>Staatus</th>
      </tr>
      <tr v-for="(row, index) in vehicleServisLog">
        <td>{{ row.id }}</td>
        <td>{{ row.logDate }}</td>
        <td>{{ row.vehicleId }}</td>
        <td>{{ row.serviceName }}</td>
        <td>{{ row.serviceDate }}</td>
        <td>{{ row.serviceOdo }}</td>
        <td>{{ row.comment }}</td>
        <td>{{ row.active }}</td>
      </tr>

    </table>


  </div>

</template>


<script>
let getOneVehicle = function (vehId) {
  let url = "http://localhost:8080/client/oneVehicle?vehicleId=" + vehId;

  this.resultList1 = this.$http.get(url)
      .then(result => this.resultList1 = result.data)
}
let getVehicleServiceLog = function (vehId) {
  let url = "http://localhost:8080/vehicleServiceLog?vehicleId=8";

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
    this.getVehicleServiceLog(this.$route.params.vehid)

  }
}


</script>
