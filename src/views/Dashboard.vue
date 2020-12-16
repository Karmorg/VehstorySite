<template>
  <div class="Dashboard">
  </div>
</template>

<template>

  <div>
<!--    <p> <input placeholder="Sõiduki nr" v-model="vehicle.vehId">-->
<!--      Ajutine väli peab hoolduste sisestamiseks olema täidetd. Kuni sisse logimine ei tööta. </p>-->
<!--    <button v-on:click="getVehicleSelectedServices(vehicle.vehId)" > Vaheta sõidukit </button>-->
<!--    <br><br>-->

    <h1>Sõiduki töölaud</h1>
    <table border="1" align="center">
      <caption>Sõiduki andmed</caption>
      <tr >
        <th hidden>AutoID</th>
        <th>Tootja</th>
        <th>Mudel</th>
        <th>RegNr</th>
        <th>Läbisõit</th>
        <th>Uuenda</th>
      </tr>
      <tr v-for="(row, index) in resultList1">
        <td hidden>{{row.id}}</td>
        <td>{{row.manufacturer}}</td>
        <td>{{row.model}}</td>
        <td>{{row.regNo}}</td>
        <td><input type="number" size="5" maxlength="9" placeholder="läbisõit" v-model="row.odo"></td>
        <td><button v-on:click="updateOdo(index)" > läbisõitu </button></td>
      </tr>
    </table>
    <br><br>
    <button v-on:click="goToServices(vehicle.vehId)" style="background: #f5f5dc" >Lisa allolevasse nimekirja hooldusi, mida soovid jälgida</button>
    <button v-on:click="addServiceLog()" style="background: bisque">Sisesta teostatud hooldus(ed) ajalukku</button>

    <br> <br>

    <table border="1" align="center">
      <caption>Viimased hooldused</caption>
      <tr>
        <th hidden>Id</th>
        <th hidden>Töö nr</th>
        <th bgcolor="#f5f5dc">Hooldus/töö</th>
        <th bgcolor="#f5f5dc">Sõiduki nr</th>
        <th bgcolor="#f5f5dc">Välba ühik</th>
        <th bgcolor="#f5f5dc">Välba väärtus</th>
        <th>Eelmine kp</th>
        <th>Eelmine odo</th>
        <th>Järgmine kp</th>
        <th>Järgmine odo</th>
        <th bgcolor="#ffe4c4">Teostatud kp*</th>
        <th bgcolor="#ffe4c4">Teostatud odo</th>
        <th bgcolor="#ffe4c4">Märkus</th>
      </tr>
      <tr v-for="(row, index) in vehicleSelectedServiceList">
        <td hidden>{{index+1}}</td>
        <td hidden>{{row.serviceId}}</td>
        <td bgcolor="#f5f5dc">{{row.serviceName}}</td>
        <td bgcolor="#f5f5dc">{{row.vehicleId}}</td>
        <td bgcolor="#f5f5dc">{{row.pUnit}}</td>
        <td bgcolor="#f5f5dc">{{row.pValue}}</td>
        <td>{{row.lastSDate}}</td>
        <td>{{row.lastSOdo}}</td>
        <td >{{row.nextSDate}}</td>
        <td>{{row.nextSOdo}}</td>
        <td bgcolor="#ffe4c4"><input type="date" v-model="row.serviceDate" style="background: bisque" ></td>
        <td bgcolor="#ffe4c4"><input type="number" v-model="row.serviceOdo" style="background: bisque"></td>
        <td bgcolor="#ffe4c4"><input v-model="row.comment" style="background: bisque"></td>
      </tr>
    </table>
    <br><br>
    <button v-on:click="toServiceLog(vehicle.vehId)">Sõiduki hoolduste ajalugu</button>
  </div>
</template>

<script>

let getOneVehicle = function(vehId) {
  let url=this.$host + "/client/oneVehicle?vehicleId="+vehId;

  this.resultList1=this.$http.get(url)
      .then(result => this.resultList1=result.data)
}

let getVehicleSelectedServices = function (vehicleId){
  this.$http.get(this.$host + "/client/VehicleSelectedServiceListDashboard?vehicleId=" + vehicleId)
      .then(response => this.vehicleSelectedServiceList = response.data);
}

let updateOdo = function (index){
  let url = this.$host + "/client/updateOdo";
  let body = {
    vehId: this.vehicle.vehId,
    newOdoValue: this.resultList1[index].odo
  }
  this.$http.put(url, body)
      .then(alert("Uuendatud"))
}

let addServiceLog = function (){
  let url = this.$host + "/client/addServiceLog"
  this.$http.post(url, this.vehicleSelectedServiceList)
    .then(response =>this.getVehicleSelectedServices(this.vehicle.vehId));

}

let goToServices = function (vehId){
  this.$router.push({ name: 'TeenusteValimine', params: { vehId: vehId  }  })
}

let deleteRow = function (index){
  let url=this.$host + "/client/deleteVehicle?id=" + this.vehicleSelectedServiceList[index].vehId;
  this.$http.put(url)
      .then(alert("Sõiduk kustutatud"))
      .then(this.vehicleList.splice(index, 1))
}

let toServiceLog = function (vehId){
  this.$router.push({ name: 'Ajalugu', params: { vehId: vehId  }  })
}

export default {
  methods: {
    getVehicleSelectedServices:getVehicleSelectedServices,
    getOneVehicle: getOneVehicle,
    updateOdo,
    deleteRow:deleteRow,
    addServiceLog,
    goToServices,
    toServiceLog
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
