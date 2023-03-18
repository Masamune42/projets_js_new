const imagesList = document.querySelector('.images-list');
const errorMsg = document.querySelector('.error-msg');

let searchQuery = "random";
let pageIndex = 1;

async function fetchData() {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=NXt-iwIC3rQzQophEICK1yQHx8Pb0GCKBJQYWxtnwbg`)

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`)
    }

    const data = await response.json();
    // Si on a pas trouvé de résultat on renvoie un message d'erreur
    if (!data.total) {
      imagesList.textContent = "";
      throw new Error('Wopsy, rien de tel dans notre base de données ... tentez un mot clé plus précis !')
    }
    createImages(data.results)

  } catch (error) {
    errorMsg.textContent = `${error}`
  }
}

fetchData();

function createImages(data) {
  data.forEach(img => {
    const newImg = document.createElement("img");
    newImg.src = img.urls.regular;
    imagesList.appendChild(newImg)
  });
}

// On va détecter l'évolution de l'intersection d'un élément
// rootMargin: "50%" -> déclenche 50% plus tôt par rapport à la hauteur de la fenêtre
const observer = new IntersectionObserver(handleIntersect, { rootMargin: "50%" })
// On précise l'élément à observer -> dès que la div avec la class infinite-marker rentre dans notre fenêtre
observer.observe(document.querySelector(".infinite-marker"))


function handleIntersect(entries) {
  console.log(entries)
  // Si j'ai déjà scrollé supérieur à la hauteur de la fenêtre et si je suis en train d'intersecter 
  if (window.scrollY > window.innerHeight && entries[0].isIntersecting) {
    // On passe à la page suivante avant de faire un nouvel appel à l'API et d'afficher les images suivantes
    pageIndex++;
    fetchData();
  }
}


const input = document.querySelector("#search");
const form = document.querySelector("form");

form.addEventListener("submit", handleSearch)

function handleSearch(e) {
  e.preventDefault();

  imagesList.textContent = "";
  if (!input.value) {
    errorMsg.textContent = "L'objet de la recherche ne peut être vide."
    return;
  }

  errorMsg.textContent = "";
  searchQuery = input.value;
  pageIndex = 1;
  fetchData();
}

const scrollToTop = document.querySelector(".scroll-to-top");
// On défini la fonction permettant de remonter tout en haut de la page au bouton sélectionné
scrollToTop.addEventListener("click", pushToTop);

function pushToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}