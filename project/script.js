const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector(".meal-details-content");
const backBtn = document.getElementById("back-btn");

const BASE_URL = `https://www.themealdb.com/api/json/v1/1/`;
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

searchBtn.addEventListener("click", searchMeals);
mealsContainer.addEventListener("click", handleMealClick);
backBtn.addEventListener("click", () => mealDetails.classList.add("hidden"));
searchInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") searchMeals();
})

async function searchMeals() {
    const searchTerm = searchInput.value.trim();

    //handle the edege case
    if (!searchTerm) {
        errorContainer.textContent = "Please enter a search term";
        errorContainer.classList.remove("hidden");
        return;
    }

    try {
        resultHeading.textContent = `Searching for "${searchTerm}"...`
        mealsContainer.innerHTML = "";
        errorContainer.classList.add("hidden")

        //fetch the meals from api
        const responce = await fetch(`${SEARCH_URL}${searchTerm}`)
        const data = await responce.json()

        console.log("data is here:", data)
        if(!data.meals) {
            resultHeading.textContent = ``;
            mealsContainer.innerHTML = "";
            errorContainer.textContent = `No recipies found for ${searchTerm}. Try another search term!`
            errorContainer.classList.remove("hidden")
        }
        else {
            resultHeading.textContent = `Search results for "${searchTerm}":`;
            displayMeals(data.meals)
            searchInput.value = ""
        }
    } catch (error) {
        errorContainer.textContent = "Something went wrong. Please try again later.";
    }
}

function displayMeals(meals) {
  mealsContainer.innerHTML = "";

  // loop through meals and create a card for each meal
  meals.forEach((meal) => {
    mealsContainer.innerHTML += `
      <div class="meal" data-meal-id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-info">
          <h3 class="meal-title">${meal.strMeal}</h3>
          ${meal.strCategory ? `<div class="meal-category">${meal.strCategory}</div>` : ""}
        </div>
      </div>
    `;
  });
}

async function handleMealClick(e) {
    const mealEl = e.target.closest(".meal")
    if(!mealEl) return
    const mealId = mealEl.getAttribute("data-meal-id")

    try {
        const responce = await fetch (`${LOOKIP_URL}${mealId}`)
        const data = await responce.json();

        console.log(data);
    } catch (error) {}
}
