// On récupère la class de la div que l'on utilisera pour le curseur
const customCursor = document.querySelector(".custom-cursor");

// A chaque fois que l'on bouge le curseur, on applique le curseur customisé
window.addEventListener("mousemove", handleCustomCursor);

function handleCustomCursor(e) {
  customCursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
}

const title = document.querySelector("h1");
const subtitle = document.querySelector(".subtitle");
const heroPushLink = document.querySelector(".hero-push-link");
const txt = "Porsche, set free.";

// Ecriture du titre
function typewriter(text, index) {
  // Apparition du sous-titre après la 3e lettre du titre
  if (index > 3) subtitle.classList.add("active");
  // Apparition de la flèche après la 6e lettre du titre
  if (index > 6) heroPushLink.classList.add("active");
  // Si on l'index est inférieur à la taille du texte à écrire, toutes les 200ms on écrit une lettre
  if (index < text.length) {
    setTimeout(() => {
      // On écrit chaque lettre en utilisant leur index dans le string
      title.innerHTML += `<span>${text[index]}</span>`;
      typewriter(text, index + 1);
    }, 200);
  }
}
// On attend 300ms avant de lancer le script d'écriture du titre
setTimeout(() => {
  typewriter(txt, 0);
}, 300);

// Push down button
heroPushLink.addEventListener("click", slideDown);

// Fonction qui descend à l'endroit cliqué
function slideDown(e) {
  // On preventDefault() pour ne pas sauter directement à l'endroit
  e.preventDefault();
  // On va plutôt faire un scroll jusqu'au href avec une animation
  window.scrollTo({
    // offsetTop -> on va se trouver à la limite du haut de la div sélectionnée
    top: document.querySelector(`${e.target.getAttribute("href")}`).offsetTop,
    behavior: "smooth",
  });
  // Option 2 : pas encore supporté par tous les navigateurs
  // Peut mieux fonctionné si le offsetTop a des éléments imbriquées
  // document.querySelector(`${e.target.getAttribute("href")}`).scrollIntoView({ behavior: "smooth" });
}

// Scroll animations
// On place tous les éléments h2 et .section-subtitle dans un tableau
const generalAnimatedElements = [
  ...document.querySelectorAll("h2"),
  ...document.querySelectorAll(".section-subtitle"),
];
const discoverSectionElements = [
  document.querySelector(".text-discover-content h3"),
  document.querySelector(".text-discover-content p"),
  document.querySelector(".discover-link"),
  document.querySelector(".discover-main-img"),
];
console.log(discoverSectionElements);
const slideInContent = [
  ...document.querySelectorAll(".side-apparition-container"),
];

// On place les tableaux dans un tableau commun
const animatedContents = [
  ...generalAnimatedElements,
  ...discoverSectionElements,
  ...slideInContent
]
// On crée un IntersectionObserver qui se déclenche 10% de la taille de l'écran après notre passage avec la fonction handleIntersect()
const intersectionObserver = new IntersectionObserver(handleIntersect, { rootMargin: "-10%" })
// On boucle sur chaque éléments de animatedContents pour leur appliquer un observe()
animatedContents.forEach(el => intersectionObserver.observe(el))

function handleIntersect(entries) {
  // Pour chaque entrée (de type IntersectionObserverEntry), on va détecter si on intersecte
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // On applique la class "active" pour afficher
      entry.target.classList.add("active");
      // On arrête de l'observer pour ne pas qu'il se répète à l'infini
      intersectionObserver.unobserve(entry.target)
    }
  })
}