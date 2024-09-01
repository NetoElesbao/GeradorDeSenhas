// Seleção de elementos--------------------------------------------------------------------------------------------------------------------------
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

// Novas funcionalidades
const openCloseGeneratorButton = document.querySelector(
  "#open-generate-password"
);
const generateOptions = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPassword = document.querySelector("#copy-password");

// Funções-------------------------------------------------------------------------------------------------------------------------------------

// Pega letra maiúscula
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

// Pega letra minúscula
const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Pega número
const getNumber = () => {
  return Math.floor(Math.random() * 10);
};

// Pega símbolo
const getSymbol = () => {
  const symbols = "(){}[]=<>/,.!@#$%&*+-";

  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Gera a senha
const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  const passwordLength = +lengthInput.value;

  const generators = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }
  if (numbersInput.checked) {
    generators.push(getNumber);
  }
  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  //   caso o usuário não marque nenhuma opção
  if (generators.length === 0) {
    return;
  }

  // debugger;;
  for (i = 0; i < passwordLength; i += generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();
      password += randomValue;
    });
  }

  // Normaliza e exibe a senha gerada
  password = password.slice(0, passwordLength);
  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};

// Eventos-----------------------------------------------------------------------------------------------------------------------------------------
generatePasswordButton.addEventListener("click", () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

// Exibe e esconde a parte de personalização de senha a se gerar
openCloseGeneratorButton.addEventListener("click", () => {
  generateOptions.classList.toggle("hide");
});

// Copia a senha gerada
copyPassword.addEventListener("click", (event) => {
  event.preventDefault();

  const password = generatedPasswordElement.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPassword.innerText = "Senha copiada com sucesso!";

    setTimeout(() => {
      copyPassword.innerText = "Copiar";
    }, 1000);
  });
});
