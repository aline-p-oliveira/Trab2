let inputEmail = document.querySelector("#input-email");
let inputSenha = document.querySelector("#input-senha");
let formularioLogin = document.querySelector("#formulario-login");

formularioLogin.addEventListener("submit", (evento) => {
  evento.preventDefault();

  entrarNoSistema();
});

function entrarNoSistema() {
  let emailDigitado = inputEmail.value;
  let senhaDigitada = inputSenha.value;

  let usuariosExistentes = buscaUsuariosStorage();

  // existe === true ou existe === false
  let existe = usuariosExistentes.some((usuario) => {
    return usuario.login === emailDigitado && usuario.senha === senhaDigitada;
  });

  if (existe === true) {
    localStorage.setItem('usuarioLogado', emailDigitado);
    window.location.href = "pagina-home.html";
  } else {
    alert("-mail ou senha incorretos!");
    return;;
  }
}

function buscaUsuariosStorage() {
  // os dados no localStorage são sempre strings
  // a função de conversão é JSON.parse(aqui dentro o comando do localStorage)
  // localStorage.getItem('chave') <- buscar algo no localStorage

  return JSON.parse(localStorage.getItem("usuarios")) || [];
}
