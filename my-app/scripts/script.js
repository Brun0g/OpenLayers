let btnEnviar = document.getElementById("btn-enviar");
let inputs = document.getElementsByClassName("dados");
let formulario = document.getElementById("formulario");
let mensagemSucesso = document.getElementById("mensagem-sucesso");
let mapa = document.getElementById("map");

btnEnviar.addEventListener("click", function () {
  // Verifica se todos os campos obrigatórios foram preenchidos
  let camposPreenchidos = true;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].hasAttribute("required") && inputs[i].value.trim() === "") {
      camposPreenchidos = false;
      break;
    }
  }

  if (camposPreenchidos) {
    // Simula o envio do formulário (você pode substituir por sua lógica de envio real)
    // Aqui, estamos apenas mostrando a mensagem de sucesso
    mensagemSucesso.style.display = "block";

    setTimeout(function () {
      mensagemSucesso.style.display = "none";

      // Após o envio bem-sucedido, adicione o ícone "danger" ao mapa
      addDangerIcon(event.coordinate); // Certifique-se de passar as coordenadas corretas
      console.log(event.coordinate);
    }, 3000);
  } else {
    // Caso algum campo obrigatório não tenha sido preenchido, você pode exibir uma mensagem de erro aqui
  }
});
