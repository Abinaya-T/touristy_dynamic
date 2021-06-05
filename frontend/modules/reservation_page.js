import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(
      `${config.backendEndpoint}/reservations/`
    );
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return await res.json();
  } catch (e) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length == 0)
  {
    document.getElementById('reservation-table-parent').style.display = "none";
     document.getElementById('no-reservation-banner').style.display = "block";
  }
  else{
    document.getElementById('reservation-table-parent').style.display = "block";
    document.getElementById('no-reservation-banner').style.display = "none";
  }
 reservations.forEach(item => {
   let table = document.getElementById('reservation-table');
   let row = document.createElement('tr');
   let cell1 = document.createElement('td')
   cell1.innerHTML = item.id;
   let cell2 = document.createElement('td')
   cell2.innerHTML = item.name;
   let cell3 = document.createElement('td')
   cell3.innerHTML = item.adventureName;
   let cell4 = document.createElement('td')
   cell4.innerHTML = item.person;
   let cell5 = document.createElement('td')
   let d = new Date(item.date);
   cell5.innerHTML = d.toLocaleDateString('en-IN');
   let cell6 = document.createElement('td')
   cell6.innerHTML = item.price;

   let cell7 = document.createElement("td");
   let time = new Date(item.time);
   const months = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December",
   ];
   let hours = time.getHours();
   let minutes = time.getMinutes();
   let sec = time.getSeconds();
   let ampm = hours >= 12 ? "pm" : "am";
   hours = hours % 12;
   hours = hours ? hours : 12;
   let strTime = hours + ":" + minutes + ":" + sec + " " + ampm;
   let formatted_date =
     time.getDate() +
     " " +
     months[time.getMonth()] +
     " " +
     time.getFullYear() +
     ", " +
     strTime;
  //  let options = { 
  //    day: 'numeric', 
  //    month: 'long', 
  //    year: 'numeric', 
  //    hour12: 'true', 
  //    hour: '2-digit', 
  //    minute:'2-digit', 
  //    second:'2-digit' 
  //   }
   
  //  let formatedTime = time.toLocaleString('en-IN', options);

   cell7.innerHTML = formatted_date;

   let cell8 = document.createElement('td');

   let btn = document.createElement('button');
   btn.setAttribute('class', 'reservation-visit-button');
   btn.setAttribute('id', item.id);
   let a = document.createElement('a')
   a.setAttribute('href', `/frontend/pages/adventures/detail/?adventure=${item.adventure}`);
   a.innerText = "Visit Adventure";
   btn.append(a);
//    btn.innerText = "Visit Adventure";
//    btn.addEventListener("click", function(){
//     location.href = `/frontend/pages/adventures/detail/?adventure=${item.adventure}`;
// });
   cell8.appendChild(btn);
   row.appendChild(cell1);
   row.appendChild(cell2);
   row.appendChild(cell3);
   row.appendChild(cell4);
   row.appendChild(cell5);
   row.appendChild(cell6);
   row.appendChild(cell7);
   row.appendChild(cell8);
   table.appendChild(row);
 });
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
