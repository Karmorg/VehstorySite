<template>
  <div>
    <h1>Teenuste valimine</h1>
    <br><br>
    <p>
      <!--      <button v-on:click="test()">vajuta</button>-->
    </p>
    <p align="right">
      <button v-on:click="test2()">salvesta</button>
    </p>
    <table border="1">
      <tr>
        <th>Auto</th>
        <th>RegNr</th>
      </tr>
      <tr>
        <td>siia on vaja midagi, mis kuvaks andmed</td>
        <td>ja siia ka</td>
      </tr>
    </table>
    <br><br>
    <table border="1" align="center">
      <tr>
        <th width="30"></th>
        <th hidden width="30">ID</th>
        <th hidden width="30">AutoID</th>
        <th>Teenus</th>
        <th>Välba ühik</th>
        <th>Välba väärtus</th>
        <th>Märkus</th>
        <th>Valitud/staatus</th>

      </tr>
      <tr v-for="(row, index) in resultList">
        <td>{{ index + 1 }}</td>
        <td hidden>{{ row.id }}</td>
        <td hidden>{{ row.vehicleId }}</td>
        <td>{{ row.serviceName }}</td>
        <td><span>{{ row.pUnit }}</span><select v-model="row.pUnit">
          <option>km</option>
          <option>aasta</option>
          <option>kontrollida</option>
        </select></td>
        <td><input v-model="row.pValue"></td>
        <td><input v-model="row.comment"></td>
        <td><input type="checkbox" id="checkbox" v-model="row.active">
          <label hidden for="checkbox">{{ row.active }}</label></td>

      </tr>
    </table>
    <br><br><br><br>
  </div>
</template>

<script>

let getData = function () {
  let url = "http://localhost:8080/VehicleServiceListWithServiceName?vehicleId=8";

  this.resultList = this.$http.get(url)
      .then(result => this.resultList = result.data)
}

let test2 = function () {
  let url = "http://localhost:8080/updateSelectedService";

  this.$http.put(url, this.resultList)
      .then(alert("uuendatud"))

}

export default {
  methods: {
    getData: getData,
    test2: test2,
  },
  data: function () {
    return {
      resultList: []
    }
  },
  created() {
    this.getData()
  }
}
</script>

