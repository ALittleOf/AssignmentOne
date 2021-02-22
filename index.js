// Assignment One (02.526 IDV)
// Due: 25-Feb
'use strict'

// execute commands inside every time browser reloaded
window.onload = () => {
    getData();
}


//get Data and append to HTML table
async function getData() {
  try {
    const response = await fetch("https://api.data.gov.sg/v1/transport/carpark-availability");
    if (response.ok) {
      const data = await response.json();
      return data.items[0].carpark_data;
    }
  } catch (error) {
    console.log(error);
  }
};


getData()
  .then(carparkData => {
    // console.log(carparkData);
    var table = document.getElementById("myTable")
    for (var i = 0; i < carparkData.length; i++){
        var x = (carparkData[i].carpark_info[0].total_lots - carparkData[i].carpark_info[0].lots_available) / (carparkData[i].carpark_info[0].total_lots)              
        var utiRate = Number(x).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })
        var row = `<tr>
                        <td>${carparkData[i].carpark_number}</td>
                        <td>${carparkData[i].update_datetime}</td>
                        <td>${carparkData[i].carpark_info[0].lots_available}</td>
                        <td>${carparkData[i].carpark_info[0].lot_type}</td>
                        <td>${carparkData[i].carpark_info[0].total_lots}</td>
                        <td>${utiRate}</td>
                  </tr>`
        table.innerHTML += row
    }
  })
  .catch(err => {
    console.log(err);
});


