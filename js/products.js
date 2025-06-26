const API_URL = "https://dummyjson.com";
const limit = 8;
let skip = 0;
let currentEndpoint = `/products`;

const wrapperEl = document.querySelector(".wrapper");
const btnEl = document.querySelector(".btn");
const collectionEl = document.querySelector(".collection");
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
  const products = data.products || data;
  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
    `;

    fragment.appendChild(card);
  });

  wrapperEl.appendChild(fragment);
}

function createCategory(data) {
  const fragment = document.createDocumentFragment();

  data.forEach((category) => {
    const li = document.createElement("li");
    const categoryName = typeof category === "string"
      ? category
      : category.name || category.category || "no-name";
    li.dataset.endpoint = `/products/category/${categoryName}`;
    li.textContent = categoryName;

    fragment.appendChild(li);
  });

  collectionEl.appendChild(fragment);
}

window.onload = () => {
  fetchData(`${currentEndpoint}?limit=${limit}&skip=${skip}`, createCard);
  fetchData(`/products/categories`, createCategory);
};

btnEl.onclick = () => {
  skip += limit;
  fetchData(`${currentEndpoint}?limit=${limit}&skip=${skip}`, createCard);
};
collectionEl.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const endpoint = event.target.dataset.endpoint;
    currentEndpoint = endpoint;
    skip = 0;
    wrapperEl.innerHTML = "";
    fetchData(`${endpoint}?limit=${limit}&skip=${skip}`, createCard);
  }
});
