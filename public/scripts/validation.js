const form = document.querySelector("form"); // Pegar o formulário da página
const inputs = form.querySelectorAll("input"); // Pegar os inputs do formulario

form.addEventListener("submit", (event) => {
  let stop = false;
  inputs.forEach((input) => {
    if (stop) {
      return;
    }
    if (!input.value || input.value <= 0) {
      event.preventDefault();
      alert("[ERRO] Preencha os dados corretamente!");
      stop = true;
    }
  });
});
