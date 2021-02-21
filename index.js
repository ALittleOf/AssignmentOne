// Assignment One (02.526 IDV)
// Due: 25-Feb
'use strict'

// execute commands inside every time browser reloaded
window.onload = () => { getData() }


//get Data and append to HTML table
async function getData() {
    try{
        const response = await fetch ("https://api.data.gov.sg/v1/transport/carpark-availability");
        if (response.ok){
            const data = await response.json();
            /*console.log (data);
            console.log (typeof(data));
            console.log(Object.keys(data).length) //length*/
            const carparkData = data.items[0].carpark_data;
            // console.log(carparkData) //array of Objects
            /*console.log (typeof(carparkData));
            console.log(Object.keys(carparkData).length) //length
            console.log(carparkData[0]); //first Object of array

            console.log(carparkData[0].carpark_info);
            console.log (typeof(carparkData[0].carpark_info));

            console.log(carparkData[0].carpark_info[0].total_lots);
            console.log(carparkData[0].carpark_info[0].lot_type);
            console.log(carparkData[0].carpark_info[0].lots_available);*/

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
        } 
        throw new Error("Request failed");
        } 
        catch (error) {
        console.log(error);
        }
} 
getData();


