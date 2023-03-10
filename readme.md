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

