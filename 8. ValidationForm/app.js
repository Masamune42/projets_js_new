const inputsValidity = {
    user: false,
    email: false,
    password: false,
    passwordConfirmation: false,
}

const form = document.querySelector("form");
const container = document.querySelector(".container");
form.addEventListener("submit", handleForm);

// Booléen de l'animation de shake du formulaire
let isAnimating = false;
function handleForm(e) {
    e.preventDefault()
    // On récupère tous les noms des propriétés de inputsValidity
    const keys = Object.keys(inputsValidity)
    // On récupère les clés non validées avec un filtre pour ne récupérer que celles qui sont à false
    // Ecriture simplifiée du bloc en dessous
    const failedInputs = keys.filter(key => !inputsValidity[key])
    // const failedInputs = keys.filter(key => {
    //     if (!inputsValidity[key]) {
    //         return key;
    //     }
    // })

    // Si on a repéré des champs en erreurs et que l'animation ne sait pas lancée
    if (failedInputs.length && !isAnimating) {
        isAnimating = true;
        container.classList.add("shake");
        setTimeout(() => {
            container.classList.remove("shake");
            isAnimating = false;
        }, 400)

        failedInputs.forEach(input => {
            const index = keys.indexOf(input)
            showValidation({ index: index, validation: false })
        })
    }
    else if(!failedInputs.length) {
        alert("Données envoyées avec succès.")
    }
}

const validationIcons = document.querySelectorAll('.icone-verif');
const validationTexts = document.querySelectorAll('.error-msg');
function showValidation({ index, validation }) {
    if (validation) {
        // Affichage du svg check
        validationIcons[index].style.display = "inline";
        validationIcons[index].src = "ressources/check.svg";
        // Si on se situe sur un champ qui possède un message d'erreur, on le fait disparaitre
        if (validationTexts[index])
            validationTexts[index].style.display = "none";
    } else {
        // Affichage du svg erreur
        validationIcons[index].style.display = "inline";
        validationIcons[index].src = "ressources/error.svg";
        // Si on se situe sur un champ qui possède un message d'erreur, on le fait aparaitre
        if (validationTexts[index])
            validationTexts[index].style.display = "block";
    }
}


// 1 -> Vérification du nom d'utilisateur
const userInput = document.querySelector(".input-group:nth-child(1) input");

// blur = on retire le focus de l'élément
userInput.addEventListener("blur", userValidation)
userInput.addEventListener("input", userValidation)

function userValidation() {
    if (userInput.value.length >= 3) {
        showValidation({ index: 0, validation: true })
        inputsValidity.user = true;
    }
    else {
        showValidation({ index: 0, validation: false })
        inputsValidity.user = false;
    }
}

// 2 -> Vérification du mail
const mailInput = document.querySelector(".input-group:nth-child(2) input");
mailInput.addEventListener("blur", mailValidation)
mailInput.addEventListener("input", mailValidation)

// On crée un objet Regex
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
function mailValidation() {
    if (regexEmail.test(mailInput.value)) {
        showValidation({ index: 1, validation: true })
        inputsValidity.email = true;
    }
    else {
        showValidation({ index: 1, validation: false })
        inputsValidity.email = false;
    }
}

// 3 -> Vérification du mot de passe
const pswInput = document.querySelector(".input-group:nth-child(3) input");
pswInput.addEventListener("blur", passwordValidation)
pswInput.addEventListener("input", passwordValidation)

const passwordVerification = {
    length: false,
    symbol: false,
    number: false
}

const regexList = {
    symbol: /[^a-zA-Z0-9\s]/,
    number: /[0-9]/
}

let passwordValue;
function passwordValidation(e) {
    passwordValue = pswInput.value;
    let validationResult = 0;

    for (const prop in passwordVerification) {
        if (prop === "length") {
            if (passwordValue.length < 6)
                passwordVerification.length = false;
            else {
                passwordVerification.length = true;
                validationResult++;
            }
            continue;
        }

        if (regexList[prop].test(passwordValue)) {
            passwordVerification[prop] = true;
            validationResult++;
        }
        else
            passwordVerification[prop] = false;
    }

    if (validationResult !== 3) {
        showValidation({ index: 2, validation: false })
        inputsValidity.password = false;
    }
    else {
        showValidation({ index: 2, validation: true })
        inputsValidity.password = true;
    }

    passwordStrength()
}

// Affichage de la force du mot de passe
const lines = document.querySelectorAll(".lines div");
function passwordStrength() {
    const passwordLength = pswInput.value.length;

    if (!passwordLength) {
        addLines(0)
    }
    else if (passwordLength > 9 && passwordVerification.symbol && passwordVerification.number) {
        addLines(3)
    }
    else if (passwordLength > 6 && (passwordVerification.symbol || passwordVerification.number)) {
        addLines(2)
    }
    else {
        addLines(1)
    }

    function addLines(numberOfLines) {
        lines.forEach((el, index) => {
            if (index < numberOfLines) {
                el.style.display = "block"
            }
            else {
                el.style.display = "none"
            }
        })
    }

    // Si on a rentré une valeur dans le champ de vérification de mot de passe (= on a affiché une icone check/error)
    if (validationIcons[3].style.display === "inline") {
        confirmPassword();
    }
}

// 4 -> Confirmation du mot de passe
const confirmInput = document.querySelector(".input-group:nth-child(4) input");
confirmInput.addEventListener("blur", confirmPassword)
confirmInput.addEventListener("input", confirmPassword)

function confirmPassword() {
    const confirmedValue = confirmInput.value;

    if (!confirmedValue && !passwordValue) {
        validationIcons[3].style.display = "none";
    }
    else if (confirmedValue !== passwordValue) {
        showValidation({ index: 3, validation: false })
        inputsValidity.passwordConfirmation = false;
    }
    else {
        showValidation({ index: 3, validation: true })
        inputsValidity.passwordConfirmation = true;
    }
}