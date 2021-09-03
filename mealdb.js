const loadSearchData = () => {
  const inputData = document.getElementById("input-field");
  const inputFieldText = inputData.value;
  inputData.value = "";
  //   console.log(inputData);
  if (inputFieldText == "") {
    //
  } else {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldText}`
    )
      .then((res) => res.json())
      .then((data) => displaySearchData(data.meals));
  }
};

const displaySearchData = (meals) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  meals.forEach((meal) => {
    // console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div onclick = loadMealDetails("${meal.idMeal}") class="card">
            <img src="${
              meal.strMealThumb
            }"  class="img-fluid card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">
                ${meal.strInstructions.slice(0, 200)}
              </p>
            </div>
          </div>
    `;
    cardContainer.appendChild(div);
  });
};

const loadMealDetails = (mealId) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
};

const displayMealDetails = (mealsDetail) => {
  console.log(mealsDetail);
  const displayMealDetails = document.getElementById("display-details");
  displayMealDetails.innerHTML = `
    <div class="card w-50 mx-auto">
    <img  src="${mealsDetail.strMealThumb}" class=" card-img-top" alt="..." />
        <div class="card-body">
          <h5  class="card-title">${mealsDetail.strMeal}</h5>
          <p class="card-text">
           ${mealsDetail.strInstructions.slice(0, 150)}
          </p>
          <a href="${
            mealsDetail.strYoutube
          }" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  `;
};
