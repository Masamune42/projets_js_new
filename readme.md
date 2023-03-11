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