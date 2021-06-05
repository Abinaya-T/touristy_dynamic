import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  let adventureId = params.get('adventure');
  return adventureId;

}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return await res.json();
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
 let name = document.getElementById('adventure-name');
 name.innerHTML = adventure.name;

 let subtitle = document.getElementById('adventure-subtitle');
 subtitle.innerHTML = adventure.subtitle;

 
 adventure.images.forEach((item) => {
   let image = document.createElement("img");
   image.src = item;
   image.alt = "";
   image.setAttribute('class', 'activity-card-image image-fluid');

   let photoGallery = document.getElementById("photo-gallery");
   let div = document.createElement('div');
   div.setAttribute('class', 'col-12')
   div.appendChild(image);
   photoGallery.append(div);
   
 });

  let desc = document.getElementById('adventure-content');
  desc.innerText = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photo = document.getElementById("photo-gallery");
  photo.innerHTML = "";

  images.forEach((item) => {
    let div = document.createElement("div");
    div.setAttribute("class", "carousel-item");
    let image = document.createElement("img");
    image.src = item;
    image.setAttribute(
      "class",
      "activity-card-image d-block w-100 image-fluid"
    );
    div.appendChild(image);

    let carouselInner = document.getElementById("innerCarousel");
    carouselInner.append(div);
  });
  
  let item = document.getElementsByClassName("carousel-item");
  item[0].classList.add("active");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if(adventure.available == true)
  {
    document.getElementById('reservation-panel-sold-out').style.display = "none";
    document.getElementById('reservation-panel-available').style.display = "block";
    let cost = document.getElementById('reservation-person-cost');
    cost.innerHTML = adventure.costPerHead;
  }
  else {
    document.getElementById('reservation-panel-available').style.display = "none";
    document.getElementById('reservation-panel-sold-out').style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
 let TotalCost = persons * adventure.costPerHead;
 let cost = document.getElementById('reservation-cost');
 cost.innerHTML = TotalCost;

}

//Implementation of reservation form submission using JQuery

  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
function captureFormSubmitUsingJQuery(adventure) {


  // $(function () {
    $("#myForm").on("submit", function (e) {
      e.preventDefault();
      var data = $("#myForm :input").serialize()+ "&adventure=" + adventure.id;
      // data.push({name: "adventure", value: adventure.id});
      console.log(data);

      $.ajax({
        url: `${config.backendEndpoint}/reservations/new`,
        type: "POST",
        // dataType: "application/json",
        data: data,
        success: function () {
          alert("Success!");
          location.reload();
        },
        error: function () {
          alert("Failed!");
        }
      });
    });
  // });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved == true)
{
  document.getElementById('reserved-banner').style.display = "block";
}
else{
  document.getElementById('reserved-banner').style.display = "none";
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
