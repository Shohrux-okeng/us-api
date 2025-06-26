const API_URL = "https://dummyjson.com";
const limit = 4;
let skip = 0;
let currentEndpoint = `/users`;

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
  const users = data.users || data;
  const fragment = document.createDocumentFragment();

  users.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${user.image}" alt="${user.firstName}" />
      <h3>${user.firstName} ${user.lastName}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Age:</strong> ${user.age}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
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
