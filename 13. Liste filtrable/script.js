// "https://randomuser.me/api/?nat=fr&results=50"

let dataArray;

async function getUsers() {
  try {
    const response = await fetch("https://randomuser.me/api/?nat=fr&results=50")

    // On ne récupère que la propriété results du résultat obtenu
    const { results } = await response.json();
    orderList(results);
    dataArray = results;
    createUserlist(dataArray);
  } catch (error) {

  }
}

getUsers();

// Fonction de tri par nom de famille
function orderList(data) {
  data.sort((a, b) => {
    if (a.name.last < b.name.last) {
      return - 1;
    }
    else if (a.name.last > b.name.last) {
      return 1;
    }
    else {
      return 0;
    }
  })
}

const tableResults = document.querySelector(".table-results")

function createUserlist(array) {
  array.forEach(user => {
    const listItem = document.createElement("li");
    listItem.className = "table-item";

    listItem.innerHTML = `
          <p class="main-info">
            <img
              src="${user.picture.thumbnail}"
              alt="avatar picture"
            />
            <span> ${user.name.last} ${user.name.first}</span>
          </p>
          <p class="email">${user.email}</p>
          <p class="phone">${user.phone}</p>
    `;

    tableResults.appendChild(listItem);
  })
}

const searchInput = document.querySelector("#search")

searchInput.addEventListener("input", filterData)

function filterData(e) {
  tableResults.textContent = "";

  const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");
  // On récupère un table filtré par la valeur de recherche via une fonction de recherche "searchForOccurences"
  const filteredArr = dataArray.filter(userData => searchForOccurences(userData))

  function searchForOccurences(userData) {
    // On déclare les différents de types de recherches
    const searchTypes = {
      firstname: userData.name.first.toLowerCase(),
      lastname: userData.name.last.toLowerCase(),
      firstAndLast: `${userData.name.first + userData.name.last}`.toLowerCase(),
      lastAndFirst: `${userData.name.last + userData.name.first}`.toLowerCase(),
    }

    // Si uen valeur de propriété correspond à la recherche, on return true -> on ajoute la valeur à la recherche filtrée
    for (const prop in searchTypes) {
      if (searchTypes[prop].includes(searchedString)) {
        return true;
      }
    }
  }

  // On actualise la liste des users avec le filtre
  createUserlist(filteredArr)
}