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
    //console.log(searchInput);
  
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