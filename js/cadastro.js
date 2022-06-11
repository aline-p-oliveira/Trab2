// # - quando for id
// . - quando for classe

let campoEmail = document.querySelector("#input-email");
let labelEmail = document.querySelector("#label-input-email");
let validEmail = false;

let campoSenha = document.querySelector("#input-senha");
let labelSenha = document.querySelector("#label-input-senha");
let validSenha = false;

let campoConfirmaSenha = document.querySelector("#input-confirma-senha");
let labelConfirmaSenha = document.querySelector("#label-input-confirm-senha");
let validConfirmaSenha = false;

// submit - submeter os dados do formulario (o evento deve ser setado ao formulario e não no botão)
// button - realizar uma ação que pode ser definir pelo desenvolver
let botaoCadastro = document.querySelector("#btn-cadastro");
botaoCadastro.addEventListener("click", verificaCampos);

// keyup - vai ficar observando cada tecla digitada pelo usuario
campoEmail.addEventListener("keyup", verificaEmail);
campoSenha.addEventListener("keyup", verificaSenha);
campoConfirmaSenha.addEventListener("keyup", verificaConfirmaSenha);

//significa que o campo de senha só será válido se tiver letras maiusculas, minusculas, numeros e caracteres especiais e for no mínimo 8
let regSenha =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function verificaEmail() {
  if (campoEmail.value.length < 10) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML = "E-mail: *Insira no mínimo 10 caracteres";
    campoEmail.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: red;"
    );
    validEmail = false;
  } else {
    labelEmail.setAttribute("style", "color: green");
    labelEmail.innerHTML = "E-mail:";
    campoEmail.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: green;"
    );
    validEmail = true;
  }
}

function verificaSenha() {
  let senhaValida = campoSenha.value.match(regSenha);
  console.log(senhaValida);

  if (campoSenha.value.length < 8) {
    labelSenha.setAttribute("style", "color: red");
    labelSenha.innerHTML = "Senha: *Insira no mínimo 8 caracteres";
    campoSenha.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: red;"
    );
    validSenha = false;
  } else if (senhaValida === null) {
    labelSenha.innerHTML = "Senha: *Deve conter uma letra maiuscula, caracter e numeros";
    validSenha = false;
  } else {
    labelSenha.setAttribute("style", "color: green");
    labelSenha.innerHTML = "Senha:";
    campoSenha.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: green;"
    );
    validSenha = true;
  }
}

function verificaConfirmaSenha() {
  if (campoSenha.value !== campoConfirmaSenha.value) {
    labelConfirmaSenha.setAttribute("style", "color: red");
    labelConfirmaSenha.innerHTML =
      "Confirme a Senha: *A senha digitada não corresponde";
    campoConfirmaSenha.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: red;"
    );
    validConfirmaSenha = false;
  } else {
    labelConfirmaSenha.setAttribute("style", "color: green");
    labelConfirmaSenha.innerHTML = "Confirme a Senha:";
    campoConfirmaSenha.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: green;"
    );
    validConfirmaSenha = true;
  }
}

function verificaCampos() {
  console.log(validEmail);
  console.log(validSenha);
  console.log(validConfirmaSenha);

  if (campoEmail.value === "" || campoSenha.value === "" || campoConfirmaSenha.value === "") {
    alert(
      "Algo deu errado! Por favor verifique se você preencheu todos os campos."
    );
    return;
  } else if (!validEmail || !validSenha || !validConfirmaSenha) {
    alert(
      "Campos incorretos! Por favor verifique se você preencheu todos os campos corretamente."
    );
    return;
  } else {
    

    criarConta();
  }
}

function criarConta(){
  let novoUsuario = {
    login: campoEmail.value,
    senha: campoSenha.value,
    recados: []
  }



  let usuariosExistentes = buscaUsuariosStorage();

  // existe === true ou existe === false
  let existe = usuariosExistentes.some((usuario) => {
    return usuario.login === campoEmail.value;
  });

  if(existe === true){
    alert("Esse usuario já esta cadastrado!");
    return;
  
  }else {
    usuariosExistentes.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuariosExistentes));

    alert("Conta foi criada com sucesso!");
    campoEmail.value = '';
    campoSenha.value = '';
    campoConfirmaSenha.value = '';

    window.location.href = 'pagina-login.html';
  }


}

function buscaUsuariosStorage(){
  // os dados no localStorage são sempre strings
  // a função de conversão é JSON.parse(aqui dentro o comando do localStorage)
  // localStorage.getItem('chave') <- buscar algo no localStorage

  return JSON.parse(localStorage.getItem("usuarios")) || [];
}
