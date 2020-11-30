<template>
  <div>
    <h1>Teenuste valimine</h1>
    <br><br>
    <p>
<!--      <button v-on:click="test()">vajuta</button>-->
    </p>
    <p align="right" >
      <button v-on:click="test2()">salvesta</button>
    </p>
    <table border="1">
      <tr>
        <th>Auto</th>
        <th>RegNr</th>
      </tr>
      <tr>
        <td>siia on vaja midagi, mis tooks andmed </td>
        <td>ja siia ka</td>
      </tr>
    </table>
    <br><br>
    <table border="1" align="center">
      <tr>
        <th width="20">Index tuleb javascriptist ise</th>
        <th width="30">ID</th>
        <th width="30">AutoID</th>
        <th>Teenus</th>
        <th>Välba ühik</th>
        <th>Välba väärtus</th>
        <th>Märkus</th>
        <th>Staatus</th>
        <th>Valitud</th>
      </tr>
      <tr v-for="(row, index) in resultList">
        <td>{{index+1}}</td>
        <td>{{row.id}}</td>
        <td>{{row.vehicleId}}</td>
        <td>{{row.serviceId}}</td>
        <td><input v-model="row.pUnit"></td>
        <td><input v-model="row.pValue"></td>
        <td><input v-model="row.comment"></td>
        <td><input type="checkbox" id="checkbox" v-model="row.active">
          <label for="checkbox">{{row.active}}</label> </td>
        <td><button v-on:click="valikuKinnitamine(index)"  >Vali</button></td>
      </tr>
    </table>
    <br><br><br><br>




  </div>

</template>

<script>
let test = function () {
  this.resultList.push({})
}
let kustutada=function (index){
  this.resultList.splice(index, 1)
}

let getData = function () {
  let url="http://localhost:8080/VehicleServiceList?vehicleId=22";

  this.resultList = this.$http.get(url)
      .then(result => this.resultList=result.data)

}
// let showresponse = function (response) {
//   this.resultList = response.data;
// }
let test2 = function (index){
  alert(this.serviceList[index].id);
  let url = "http://localhost:8080/updateSelectedService";

  let body = {
    id: this.serviceList[index].id,


  }
  this.$http.put(url, body)
      .then(alert("uuendatud"))

}



export default {
  //name:'Demo',
  methods: {//defineerid meetodid
    test: test,
//    kustutada:kustutada,
    getData: getData,
    test2:test2,
    // showresponse: showresponse
  },

  data: function () {//tagastab objeti, mille sees on muutujad mida saab kasutada
    return {
      resultList: []
    }
  },
  created() {//mis pannakse automaatselt tööle kui lähed lehele (kõige esimesena) Kuvab listi/info vaikimisi kohe
    this.getData()
  }

}
</script>

