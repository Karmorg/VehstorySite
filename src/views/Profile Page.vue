<template>
  <div class="profile_page">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>

</template>

<template>

  <div>
    <h1>Minu sõidukid</h1>

    <table border="1">
      <tr>
        <th hidden>Id</th>
        <th hidden>VehId</th>
        <th>Reg.no</th>
        <th>Tüüp</th>
        <th>Tootja</th>
        <th>Mudel</th>
        <th>Aastakäik</th>
        <th>Kütus</th>
        <th>Mootori võimsus, kW</th>
        <th>Läbisõit</th>
      </tr>
      <tr v-for="(row, index) in vehicleList">
        <td hidden>{{index}}</td>
        <td hidden>{{row.vehId}}</td>
        <td>{{row.regNo}}</td>
        <td>{{row.type}}</td>
        <td>{{row.manufactorer}}</td>
        <td>{{row.model}}</td>
        <td>{{row.year}}</td>
        <td>{{row.fuel}}</td>
        <td>{{row.kw}}</td>
        <td><input v-model="row.odo" ></td>
        <td><button v-on:click="updateOdo(index)" > Uuenda läbisõitu </button></td>
        <td><button v-on:click="deleteRow(index)">Kustuta sõiduk</button></td>
<!--                          Kustutamine ei tööta veel-->
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button>Lisa sõiduk</button></td>
      </tr>
    </table>
  </div>
</template>

<script>

let deleteRow = function (index){
  this.vehicleList.splice(index, 1);
}

let updateOdo = function (index){
  let url = "http://localhost:8080/updateOdo";
  let config = {
    params: {}
  }
  let body = {
    vehId: this.vehicleList[index].vehId,
    newOdo: this.vehicleList[index].odo

  }
  this.$http.put(url, body)
      .then(alert("uuendatud"))
}


let createAccountFunction = function () {
  let url = "http://localhost:8080/register";
  let config = {
    params: {}
  }
  this.$http.post(url, this.client)
      // .then(this.showResponse)
      .then(alert("tehtud"))
  // this.accountNo = "";
}

let getAllVehicles = function (){
  this.$http.get("http://localhost:8080/allVehicles")
      .then(response => this.vehicleList = response.data);
}

export default {
  methods: {
    createAccount: createAccountFunction,
    getAllVehicles:getAllVehicles,
    deleteRow:deleteRow,
    updateOdo:updateOdo
    // showResponse: showResponse
  },
  data: function (){      //Data on ka Vue enda sisene funtsioon
    return {
      vehicleList: [],
      client: {}
    }
  },
  created() {this.getAllVehicles()   //Selle created meetodi tõmbab Vue alati esimesena tööle
  }
}
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
//
// export default {
//   name: 'Home',
//   components: {
//     HelloWorld
//   }
// }
</script>
