const validationIcons = document.querySelectorAll('.icone-verif');
const validationTexts = document.querySelectorAll('.error-msg');

const userInput = document.querySelector(".input-group:nth-child(1) input");

// blur = on retire le focus de l'élément
userInput.addEventListener("blur", userValidation)
userInput.addEventListener("input", userValidation)

function userValidation() {
    if (userInput.value.length >= 3) {
        showValidation({ index: 0, validation: true })
    }
    else {
        showValidation({ index: 0, validation: false })
    }
}

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

const mailInput = document.querySelector(".input-group:nth-child(2) input");

mailInput.addEventListener("blur", mailValidation)
mailInput.addEventListener("input", mailValidation)

// On crée un objet Regex
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
function mailValidation() {
    if (regexEmail.test(mailInput.value)) {
        showValidation({ index: 1, validation: true })
    }
    else {
        showValidation({ index: 1, validation: false })
    }
}

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
    }
    else {
        showValidation({ index: 2, validation: true })
    }

    passwordStrength()
}

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

    if(validationIcons[3].style.display === "inline") {
        confirmPassword();
    }
}

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
    }
    else {
        showValidation({ index: 3, validation: true })
    }
}