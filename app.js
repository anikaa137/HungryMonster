const foodContainer = document.getElementById('food-container');
const foodCard = document.getElementById('food-card');

const searchMeal = () => {
	const searchMeal = document.getElementById('meal-input').value;
	if (searchMeal.length > 1) {
		const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => displayMeal(data.meals));
	} else {
		const url2 = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchMeal}`;
		fetch(url2)
			.then((res) => res.json())
			.then((data) => displayMeal(data.meals));
	}
};
// this function will display all meals
const displayMeal = (meals) => {
	meals.forEach((meal) => {
		const foodContainer = document.getElementById('food-container');
		foodContainer.innerHTML += `
	   <div class="mealItem" data-id= "${meal.idMeal}">
			   <img id="food-img" src = "${meal.strMealThumb}">
			   <h4>${meal.strMeal}</h4>
	   </div>
`;
	});
	getFoodID();
};

function getFoodID() {
	document.querySelectorAll('.mealItem').forEach((element) => {
		element.addEventListener('click', function (e) {
			const foodID = element.getAttribute('data-id');
			searchByID(foodID);
		});
	});
}

function searchByID(id) {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
		.then((response) => response.json())
		.then((data) => {
			const ul = document.querySelector('#foodIngredients ul');
			[...ul.children].forEach(children => children.remove());
			for (let i = 1; i <= 20; i++) {
				const mealIngredient = data.meals[0][`strIngredient${i}`];
				if (mealIngredient !== '' && mealIngredient !== null) {
					ul.innerHTML += `
					<li>${data.meals[0][`strIngredient${i}`]}</li>
				`;
				}
			}
		});
}
