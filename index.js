fetch('https://restcountries.com/v3.1/all?fields=name,flags')
  .then(response => response.json())
  .then(data => {
    const countriesData = JSON.stringify(data);
    localStorage.setItem('countriesData', countriesData);
    const totalCountries = data.length;
    const totalPages = Math.ceil(totalCountries / 10);
    
    initializePagination(totalPages);
 
    displayCountries(data, 1);
  });
 
const initializePagination = (totalPages) => {
  const paginationList = document.getElementById('paginationList');
  paginationList.innerHTML = '';

  const maxVisiblePages = 6;
  const initialPages = Math.min(totalPages,maxVisiblePages);
 
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.classList.add('link');
    li.dataset.page = i;
    li.textContent = i;
    li.addEventListener('click', activeLink);
    paginationList.appendChild(li);
  }
};
 
const displayCountries = (countries, page) => {
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const countriesHTML = countries.slice(startIndex, endIndex).map(country => getCountry(country));
  const container = document.getElementById('countries');
  container.innerHTML = countriesHTML.join(' ');
};
 
const getCountry = (country) => {
  return `
  <div class="country-div">
         <img src="${country.flags.png}">
         <h2><b>${country.name.common}</b></h2>
         
         <h4>NativeName: ${country.name.official} </h4>
        </div>
  `;    
};
 
let link = document.getElementsByClassName("link");
let currentValue = 1;
 
function activeLink() {
  for (let l of link) {
    l.classList.remove("active");
  }
  event.target.classList.add("active");
const pageNumber = parseInt(event.target.dataset.page);
  displayCountries(JSON.parse(localStorage.getItem('countriesData')), pageNumber);
}
 
function backBtn() {
  if (currentValue > 1) {
    for (let l of link) {
      l.classList.remove("active");
    }
    currentValue--;
    link[currentValue - 1].classList.add("active");
    displayCountries(JSON.parse(localStorage.getItem('countriesData')), currentValue);
  }
}
 
function nextBtn() {
  if (currentValue < link.length) {
    for (let l of link) {
      l.classList.remove("active");
    }
    currentValue++;
    link[currentValue - 1].classList.add("active");
    displayCountries(JSON.parse(localStorage.getItem('countriesData')), currentValue);
  }
}
