# Projets JS

## Résumé / bonnes pratiques

### 3. WikiApp
- Déclarer les variables au plus proche de leur première utilisation
```js
const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
```
Si on récupère un élément particulier qui ne sera pas modifié : on déclare en const

- Si on crée une fonction async on peut utiliser des await quand on attend une valeur
```js
async function wikiApiCall(searchInput) {
  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    // ...
  }

}
```

- Utiliser des backticks pour placer plus facilement des variables etc.
```js
card.innerHTML = `
    <h3 class="result-title">
    <a href=${url} target="_blank">${el.title}</a>
    </h3>
    <a href=${url} class="result-link" target="_blank">${url}</a>
    <span class="result-snippet">${el.snippet}</span>
    <br>
`;
```

- On peut créer une div en js avant de l'utiliser pour l'afficher
```js
// Déclaration d'un élément div
const card = document.createElement("div");
// Ajout d'une classe à la div
card.className = "result-item";
// Ajout de texte dans la div
card.innerHTML = `
    <h3 class="result-title">
    <a href=${url} target="_blank">${el.title}</a>
    </h3>
    <a href=${url} class="result-link" target="_blank">${url}</a>
    <span class="result-snippet">${el.snippet}</span>
    <br>
`;
// On place la div en tant qu'enfant de resultsDisplay
resultsDisplay.appendChild(card);
```

### ToDoJS
- On peut récupérer tous les attributs d'un élément de type data-*
```js
// On récupère la valeur de data-key
el.dataset.key
```

- On peut toggle une classe sur un élément
```js
// toggle la classe (classList) 'finDeTache' sur l'élément parent (parentNode) de la référence de l'élément (target) de l'évènement (e)
e.target.parentNode.classList.toggle('finDeTache');
```

- Exemple de déclaration d'éléments HTML et customisation
```js
// Fonction qui affiche la liste après l'ajout d'une tache
function afficherListe(todo) {
    // Création du li
    const item = document.createElement('li');
    item.setAttribute('data-key', todo.id);

    // Créaton de l'input checkbox
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', tacheFaite);
    // On ajoute la checkbox dans le li => <li><input></li>
    item.appendChild(input);

    // Création du texte associé
    const txt = document.createElement('span');
    txt.innerText = todo.text;
    // On ajoute le span dans le li => <li><input><span></span></li>
    item.appendChild(txt);

    // Création du bouton
    const btn = document.createElement('button');
    btn.addEventListener('click', supprimerTache);
    // Image à l'intérieur du bouton
    const img = document.createElement('img');
    img.setAttribute('src', 'ressources/fermer.svg');
    // On ajoute l'image dans le button => <button><img></button>
    btn.appendChild(img);
    // On ajoute le button dans le li => <li><input><span></span><button><img></button></li>
    item.appendChild(btn);

    // On ajout le li au ul => <ul><li><input><span></span><button><img></button></li></ul>
    liste.appendChild(item);
    // On ajoute la tache dans le tableau de toutes les tâches
    toutesLesTaches.push(item);
}
```

- Filtrage d'un tableau
```js
// On ne garde que les éléments HTML du tableau ayant data-key de li (itération) différents du data-key de el 
toutesLesTaches = toutesLesTaches.filter(li => li.dataset.key !== el.dataset.key);
```

### ValidationForm
Pour vérifier et valider un champ de formulaire, on le select et on détecte un Event blur ou un input dessus
```js
const userInput = document.querySelector(".input-group:nth-child(1) input");

// blur = on retire le focus de l'élément
userInput.addEventListener("blur", userValidation)
userInput.addEventListener("input", userValidation)
```

On peut déclarer directement un type Regex en JS et utiliser par la suite des fonctions qui lui sont associées
```js
// Déclaration de l'objet Regex
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
function mailValidation() {
    // On test la valeur de l'input avec le regex déclaré
    if (regexEmail.test(mailInput.value)) {
        showValidation({ index: 1, validation: true })
        inputsValidity.email = true;
    }
    else {
        showValidation({ index: 1, validation: false })
        inputsValidity.email = false;
    }
}
```

On peut vérifier les propriétés et les fonctions d'un objet
```js
console.dir(regexEmail);
```

On peut utiliser le destructuring pour passer des paramètres dans une fonction
```js
// Déclaration
function showValidation({ index, validation }) {
    if (validation) {
        validationIcons[index].style.display = "inline";
        validationIcons[index].src = "ressources/check.svg";
        if (validationTexts[index])
            validationTexts[index].style.display = "none";
    } else {
        validationIcons[index].style.display = "inline";
        validationIcons[index].src = "ressources/error.svg";
        if (validationTexts[index])
            validationTexts[index].style.display = "block";
    }
}

// Utilisation
showValidation({ index: 1, validation: false })
```

On peut facilement créer des objets avec des valeurs associées (ex: booléen, Regex...) afin de les utiliser
```js
const passwordVerification = {
    length: false,
    symbol: false,
    number: false
}

const regexList = {
    symbol: /[^a-zA-Z0-9\s]/,
    number: /[0-9]/
}
// ...
// On boucle sur chaque élément de l'objet passwordVerification : prop prendra la valeur "length", "symbol" et "number" dans l'ordre
for (const prop in passwordVerification) {
    // Pour "length"
    if (prop === "length") {
        if (passwordValue.length < 6)
            passwordVerification.length = false;
        else {
            passwordVerification.length = true;
            validationResult++;
        }
        // Si on a vérifié on ne doit pas vérifier la suite car length n'a pas de Regex à tester
        continue;
    }

    // Pour les cas "symbol" et "number", on vérifie leur Regex
    if (regexList[prop].test(passwordValue)) {
        passwordVerification[prop] = true;
        validationResult++;
    }
    else
        passwordVerification[prop] = false;
}
```


### ScrollInfini
On peut créer un observer de type "IntersectionObserver" qui va se déclencher lorsque que l'élément indiqué dans la fonction observe() entre dans la fenêtre. On peut ajouter un paramètre rootMargin pour spécifier si l'élément doit se déclencher un nombre de % de hauteur de fenêtre avant
```js
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
```

Exemple de création d'un bouton permettant de remonter tout en haut de la page
```js
const scrollToTop = document.querySelector(".scroll-to-top");
// On défini la fonction permettant de remonter tout en haut de la page au bouton sélectionné
scrollToTop.addEventListener("click", pushToTop);

function pushToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
```

### Liste filtrable
On peut créer des fonctions de tri personnalisé
```js
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
```

Création d'une fonction de recherche et filtrage personnalisé d'éléments
```js
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
```


### Animations
On peut créer une customisation pour notre curseur
```js
// On récupère la class de la div que l'on utilisera pour le curseur
const customCursor = document.querySelector(".custom-cursor");

// A chaque fois que l'on bouge le curseur, on applique le curseur customisé
window.addEventListener("mousemove", handleCustomCursor);

function handleCustomCursor(e) {
  customCursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
}
```

Création d'un texte dynamique (+ apparition d'éléments en parallèle)
```js
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
```

Bouton pour aller en bas de la page en mode "smooth"
```js
// Push down button
heroPushLink.addEventListener("click", slideDown);

// Fonction qui descend à l'endroit cliqué
function slideDown(e) {
  // On preventDefault() pour ne pas sauter directement à l'endroit
  e.preventDefault();
  // On va plutôt faire un scroll jusqu'au href avec une animation
  // Option 1 : classique, supporté sur tous les navigateurs
  window.scrollTo({
    // offsetTop -> on va se trouver à la limite du haut de la div sélectionnée
    top: document.querySelector(`${e.target.getAttribute("href")}`).offsetTop,
    behavior: "smooth",
  });
  // Option 2 : pas encore supporté par tous les navigateurs
  // Peut mieux fonctionné si le offsetTop a des éléments imbriquées
  document.querySelector(`${e.target.getAttribute("href")}`).scrollIntoView({ behavior: "smooth" });
}
```

On peut créer des tableaux avec des ...document.querySelectorAll() et les placer par la suite dans un tableau commun avec les ...
```js
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
```

2e exemple d'utilisation de IntersectionObserver
```js
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
```