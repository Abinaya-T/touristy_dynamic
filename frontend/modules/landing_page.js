import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  try {
    let url = config.backendEndpoint + "/cities";
    let res = await fetch(url);
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return await res.json();
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
 function addCityToDOM(id, city, description, image) {

   let card = document.createElement('div');
   card.setAttribute('class', 'tile shadow bg-white');

   let a = document.createElement('a');
   a.setAttribute('href',`pages/adventures/?city=${id}`);
   a.setAttribute('id',`${id}`);
   a.setAttribute('alt', "");

   let img = document.createElement('img');
   img.src = image;
   img.setAttribute('class','tile img img-fluid');

  //  let p = document.createElement('p');
  //  let pCity = document.createTextNode(city);
  //  //let pDesc = document.createTextNode(description);
  //  p.appendChild(pCity);
  //  //p.appendChild(pDesc)
  //  p.setAttribute('class', 'tile-text');
   
  let div1 = document.createElement('div');
  div1.setAttribute('class', 'd-flex flex-column tile-text');
  let div2 = document.createElement('div');
  div2.setAttribute('class', 'd-flex justify-content-center')
  div2.innerHTML = city
  let div3 = document.createElement('div');
  div3.setAttribute('class', 'd-flex justify-content-center py-2')
  div3.innerHTML = description;
  div1.appendChild(div2);
  div1.appendChild(div3);
   
   a.appendChild(img);
   card.appendChild(div1);
   card.appendChild(a);
   

   let row = document.getElementById('data');
   let col = document.createElement('div');
   col.setAttribute('class', 'col-6 col-lg-3 py-3');
   row.append(col);
   col.appendChild(card);

} 


export { init, fetchCities, addCityToDOM };
