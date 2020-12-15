<template>
  <div>
    <h1>Hoolduste valik</h1>

    <header>
      <p align="left">
      </p>
    </header>
    <table border="1" align="center">
      <caption>Sõiduki andmed</caption>
      <tr>
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
    <br>
    <button v-on:click="test2()">salvesta ja mine töölauale</button>
    <br><br>
    <table border="1" align="center">
      <caption>Sõiduki töölaual nähtavate hoolduste valik ning välpade määramine</caption>
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
        <td><span hidden>{{ row.pUnit }}</span><select v-model="row.pUnit">
          <option>km</option>
          <option>aasta</option>
          <option>kontrollida</option>
        </select></td>
        <td><input type="number" v-model="row.pValue"></td>
        <td><input v-model="row.comment"></td>
        <td><input type="checkbox" id="checkbox" v-model="row.active">
          <label hidden for="checkbox">{{ row.active }}</label></td>

      </tr>
    </table>
    <br>
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <br><br><br><br>
  </div>
</template>

<script>

let getOneVehicle = function(vehId) {
  let url=this.$host + "/client/oneVehicle?vehicleId="+vehId;

  this.resultList1=this.$http.get(url)
  .then(result => this.resultList1=result.data)
}

let getData = function (vehId) {
  let url = this.$host + "/client/VehicleServiceListWithServiceName?vehicleId=" + vehId;

  this.resultList = this.$http.get(url)
      .then(result => this.resultList = result.data)
}

let test2 = function () {
  let url = this.$host + "/client/updateSelectedService";

  this.$http.put(url, this.resultList)
    .then(()=> {
      this.$router.push({ name: 'Dashboard', params: { vehId: this.$route.params.vehId } })
  })
}

export default {
  methods: {
    getData: getData,
    test2: test2,
    getOneVehicle:getOneVehicle
  },
  data: function () {
    return {
      resultList: [],
      resultList1:[],
      vehicle: {}
    }
  },
  created() {
    this.getData(this.$route.params.vehId)
    this.getOneVehicle(this.$route.params.vehId)
  }
}
</script>

