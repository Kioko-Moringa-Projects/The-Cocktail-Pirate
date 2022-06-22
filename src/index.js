//DOM elements as functions
const submit = document.querySelector('#submit');
const search = document.querySelector('#search');
const random = document.querySelector('#random');
const cocktailsElement = document.querySelector('#cocktails');
const resultHeading = document.querySelector('#result-heading');
const selectedCocktail = document.querySelector('#selected-cocktail');

// Search for the cocktail by fetching form the api
const searchCocktail = (e) => {
    // Stop default search settings
    e.preventDefault();
  
    // Clear any previously searched cocktails
    cocktailsElement.innerHTML = '';
    selectedCocktail.innerHTML = '';
  
    // Get the search which input by the user
    const searchInput = search.value;
  
    // Fetch search data from thecocktaildb API
    if (searchInput.trim()) {
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`
      )
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          // Update the results heading with user search input
          resultHeading.innerHTML = `<h2>Search results for '${searchInput}':</h2>`;
           // Clear previously search cocktails and update results heading if search input is unavailable
        if (data.drinks === null) {
            cocktailsElement.innerHTML = '';
            resultHeading.innerHTML = `<h2>There are no results for '${searchInput}'.</h2>`;
  
            // Else display the results from api in UI
          } else {
//Note: This function is not complete. I am supposed to add on click to show details about the searched cocktail
            cocktailsElement.innerHTML = data.drinks
              .map(
                (cocktail) => `
                  <div class="cocktail">
                      <img src="${cocktail.strDrinkThumb}" alt= "${cocktail.strDrink}" />
                      <div class="cocktail-info" data-cocktailID="${cocktail.idDrink}">
                          <h3>${cocktail.strDrink}</h3>
                      </div>
                  </div>
                  `
              )
              .join('');
          }
        });
 // End of function to research
          // Clear the text in search
    search.value = '';
} else {
  // If nothing was input in search
  alert('ENTER A SEARCH TERM!');
}
};
// Event listener
submit.addEventListener('submit', searchCocktail);

// Get indiviual cocktail information
const getCocktailInfo = (e) => {
  const cocktailInfo = e.path.find((item) => {
    // Find individual cocktail info
    if (item.classList) {
      return item.classList.contains('cocktail-info');
    } else {
      return false;
    }
  });
  // Get the cocktail ID
  if (cocktailInfo) {
    // create a variable for cocktail ID
    const cocktailID = cocktailInfo.getAttribute('data-cocktailID');
    //console.log(cocktailID);
    getCocktailById(cocktailID);
  }
};