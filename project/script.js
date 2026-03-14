const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector(".meal-details-content");
const backBtn = document.getElementById("back-btn");

const BASE_URL = "www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = '${BASE_URL}search.php?s=';
const LOOKUP_URL = '${BASE_URL}lookup.php?i=';

searchBtn.addEventListener("click", searchMeals);
searchInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") searchMeals();
})

async function searchMeals() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
        errorContainer.textContent = "Please enter a search term";
        errorContainer.classList.remove("hidden");
        return;
    }
}