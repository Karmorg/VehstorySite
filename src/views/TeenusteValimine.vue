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
    <button v-on:click="test2()">Salvesta ja mine töölauale</button>
    <br><br>
    <table border="1" align="center">
      <caption>Sõiduki töölaual hoolduse kuvamiseks määra välba ühik ja soovi korral väärtus, märkus</caption>
      <tr>
        <th width="30"></th>
        <th hidden width="30">ID</th>
        <th hidden width="30">AutoID</th>
        <th>Teenus</th>
        <th>Välba ühik</th>
        <th>Välba väärtus</th>
        <th>Märkus</th>
                <th>Valitud</th>


      </tr>
      <tr v-for="(row, index) in resultList">
        <td>{{ index + 1 }}</td>
        <td hidden>{{ row.id }}</td>
        <td hidden>{{ row.vehicleId }}</td>
        <td>{{ row.serviceName }}</td>
        <td><span hidden>{{ row.pUnit }}</span><select v-model="row.pUnit" v-on:change="makeActive(index)">
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
    <br><br>
    <button v-on:click="toServiceLog()">Sõiduki hoolduste ajalugu</button>
    <br><br>
    <img alt="Vue logo" src="../assets/logo.png">

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
let makeActive = function (index){
  this.resultList[index].active = true
}

let toServiceLog = function (){
  this.$router.push({ name: 'Ajalugu', params: { vehId: this.$route.params.vehId }  })
}

export default {
  methods: {
    getData: getData,
    test2: test2,
    getOneVehicle:getOneVehicle,
    makeActive,
    toServiceLog
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

