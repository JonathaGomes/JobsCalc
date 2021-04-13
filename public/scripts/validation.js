const form = document.querySelector("form"); // Pegar o formulário da página
const inputs = form.querySelectorAll("input"); // Pegar os inputs do formulario

form.addEventListener("submit", (event) => {
  let stop = false;
  inputs.forEach((input) => {
    if (stop) {
      return;
    }
    if (!input.value) {
      event.preventDefault();
      alert("[ERRO] Preencha todos os dados!");
      stop = true;
    }
  });
});
