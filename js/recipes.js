const API_URL = "https://dummyjson.com";
const limit = 8;
let skip = 0;
let currentEndpoint = `/recipes`;

const wrapperEl = document.querySelector(".wrapper");
const btnEl = document.querySelector(".btn");

async function fetchData(endpoint, callback) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    const data = await res.json();
    callback(data);
  } catch (err) {
    console.error("Xatolik:", err);
  }
}
function createCard(data) {
  const recipes = data.recipes || data;
  const fragment = document.createDocumentFragment();

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <h3>${recipe.name}</h3>
      <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
      <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
      <p><strong>Prep Time:</strong> ${recipe.prepTimeMinutes} mins</p>
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions.slice(
        0,
        100
      )}...</p>
    `;

    fragment.appendChild(card);
  });

  wrapperEl.appendChild(fragment);
}
window.onload = () => {
  fetchData(`${currentEndpoint}?limit=${limit}&skip=${skip}`, createCard);
};
btnEl.onclick = () => {
  skip += limit;
  fetchData(`${currentEndpoint}?limit=${limit}&skip=${skip}`, createCard);
};
