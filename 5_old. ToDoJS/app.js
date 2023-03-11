const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
// Tableau contenant toutes les tâches (en HTML)
let toutesLesTaches = [];


form.addEventListener('submit', event => {
    event.preventDefault();
    // Supression des espaces en trop
    const text = input.value.trim();
    // Si pas de texte vide, on ajoute la tâche entrée
    if (text !== '') {
        rajouterUneTache(text);
        // reset de l'input
        input.value = '';
    }
})

function rajouterUneTache(text) {
    // Objet todo avec le texte et l'id (définie par la date en ms)
    const todo = {
        text,
        // La méthode Date.now() renvoie le nb de ms depuis le 01/01/1970
        id: Date.now()
    }
    afficherListe(todo);
}

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

// Fonction qui coche / décoche le texte d'une tâche
function tacheFaite(e) {
    // Toggle la classe finDeTache sur l'élément parent (au-dessus)
    e.target.parentNode.classList.toggle('finDeTache');
}

// Fonction qui supprime une tâche
function supprimerTache(e) {
    // Pour chaque tâche présente dans le tableau
    toutesLesTaches.forEach(el => {
        // Si le li du bouton sur lequel on clique a la même clé que celui dans le tableau
        if (e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')) {
            // On supprime l'élément du DOM
            el.remove();
            // On supprime l'élément de la liste (par filtrage)
            // On ne garde que les éléments HTML du tableau ayant data-key de li (itération) différents du data-key de el 
            toutesLesTaches = toutesLesTaches.filter(li => li.dataset.key !== el.dataset.key);
        }
    })
}