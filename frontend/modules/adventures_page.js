
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get('city')
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return await res.json();
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(item => {

  const card = document.createElement('div');
  card.setAttribute('class', 'activity-card border border-top-0 shadow mb-4 bg-white');

  const a = document.createElement('a');
  a.setAttribute('href', `detail/?adventure=${item.id}`);
  a.setAttribute('id', `${item.id}`);

  const img = document.createElement('img');
  img.src = item.image;
  img.alt = "";
  img.setAttribute('class','activity-card img img-fluid');
  a.appendChild(img);
  card.appendChild(a);

  const div1 = document.createElement('div');
  div1.setAttribute('class','d-flex w-100');
  const name = document.createElement('div');
  name.textContent = item.name;
  name.setAttribute('class','mr-auto p-1');
  const curr = document.createElement('div');
  curr.textContent = '₹'+item.costPerHead;
  curr.setAttribute('class','p-1');
  div1.appendChild(name);
  div1.appendChild(curr);
  a.appendChild(div1);

  const div2 = document.createElement('div');
  div2.setAttribute('class','d-flex w-100');
  const duration = document.createElement('div');
  duration.setAttribute('class','mr-auto p-1');
  duration.textContent = 'Duration';
  const hours = document.createElement('div');
  hours.setAttribute('class', 'p-1');
  hours.textContent = `${item.duration} Hours`;
  div2.appendChild(duration);
  div2.appendChild(hours);
  a.appendChild(div2);

  const banner = document.createElement('div');
  banner.setAttribute('class','category-banner');
  banner.innerText= item.category;
  card.appendChild(banner);

  const row = document.getElementById('data');
  const col = document.createElement('div');
  col.setAttribute('class','col-6 col-lg-3 py-3');
  row.append(col);
  col.appendChild(card);
  



});
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  
  let list1 = list.filter(item => {
    return item.duration >= low && item.duration <= high
  });
  return list1;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {

  let list2 = list.filter(item => categoryList.includes(item.category));
  return list2;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let categoryList = filters.category;
  let dur = filters.duration;

  if (categoryList.length == 0 && dur === "") {
    return list;
  } else if (categoryList.length > 0 && dur === "") {
    let filteredCategoryList = filterByCategory(list, categoryList);
    return filteredCategoryList;
  } else if (dur.length && categoryList.length == 0) {
    let nums = dur.split("-").map(Number);
    let filteredDurationList = filterByDuration(list, nums[0], nums[1]);
    return filteredDurationList;
  } else {
    let catlist = filterByCategory(list, categoryList);
    let nums = dur.split("-").map(Number);
    let finalList = filterByDuration(catlist, nums[0], nums[1]);
    return finalList;
  }
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  let saveLocal = window.localStorage.setItem('filters', JSON.stringify(filters));
  return saveLocal;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format

let getLocal = JSON.parse(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return getLocal;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  
  let inputCategory = filters.category;
  inputCategory.forEach(item => {
  const name = document.createElement('div');
  name.innerText = item;
  name.setAttribute('class', 'category-filter d-inline-block');
  const closeBtn = document.createElement('div');
  closeBtn.innerText = 'x';
  closeBtn.setAttribute('class', 'd-inline-block pl-2')
  const id = document.getElementById('category-list');
  name.appendChild(closeBtn);
  id.appendChild(name);
  
});
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
