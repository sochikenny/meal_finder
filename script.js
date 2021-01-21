//bringing in our DOM elements
const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal')


//Search meal and fetch from API
async function searchMeal(e){
    e.preventDefault();

    //Clear single meal
    single_mealEl.innerHTML = '';

    //Get search term
    const term = search.value;
    
    //Check for empty
    if (term.trim()){
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        const data = await response.json()
        updateUI(data, term)
        
        //Clear Search Text
        search.value = '';
    }else{
        alert('Please enter a search term')
    }
}

function updateUI(data, term){
    resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`
    if (data.meals === null){
        resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
    }else{
        mealsEl.innerHTML = data.meals.map(meal => `
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
            </div>
            </div>
        `).join('')
    }
}

//Fetch meal by ID
async function getMealById(mealID){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    const data = await response.json()
    const meal = data.meals[0]
    console.log(meal)

    //create a function updating this UI with the provided data
    addMealToDOM(meal)
}

//Add meal to DOM
function addMealToDOM(meal){
    
}


// Event Listner for when we search
submit.addEventListener('submit', searchMeal)

//Event Listener for each meal clicked(can get a little tricky)
mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }else{
            return false;
        }
    })
    // console.log(mealInfo)
    if (mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid')
        getMealById(mealID);
    }
})