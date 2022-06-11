let inputCodigo = document.getElementById('inputCodigo');
let inputDescricao = document.getElementById("inputDescricao");
let inputDetalhamento = document.getElementById("inputDetalhamento");
let botaoSalvarRegistro = document.getElementById("salvarRegistro");
let botaoSair = document.getElementById("sair");
let formCad = document.getElementById('formulario-recados');
let tabela = document.getElementById('tabela-recados');
let botaoAtualizar = document.getElementById('btn-atualizar');
let botaoCancelar = document.getElementById('btn-cancelar');

document.addEventListener('DOMContentLoaded', verificaUsuarioLogado);
document.addEventListener("DOMContentLoaded", pegarDadosStorage);

formCad.addEventListener("submit", (e) => {
    e.preventDefault();

    adicionarNovoRecado();
});

botaoSair.addEventListener("click", sairLogin);

function adicionarNovoRecado(){
    let listaRecados = buscarRecadosUsuario();

    let codigo = inputCodigo.value;

    let existe = listaRecados.some((recado) => {
        return recado.codigo == codigo
    });

    if(existe === true){
        alert("Esse código já existe");
        inputCodigo.value = '';
        inputCodigo.focus();
        return;
    }else {
        let novoRecado = {
            codigo: inputCodigo.value,
            descricao: inputDescricao.value,
            detalhamento: inputDetalhamento.value
        }

        listaRecados.push(novoRecado);
        mostrarRecadoNoHTML(novoRecado);
        atualizarRecados(listaRecados);
        alert("Recado adicionado!");

        inputCodigo.value = '';
        inputDescricao.value = '';
        inputDetalhamento.value = '';
    }
}

function mostrarRecadoNoHTML(recado){

    let novaLinha = document.createElement('tr');
    let colunaCodigo = document.createElement('td');
    let colunaDescricao = document.createElement('td');
    let colunaDetalhamento = document.createElement('td');
    let colunaAcoes = document.createElement('td');

    novaLinha.setAttribute('class', 'recados');
    novaLinha.setAttribute('id', recado.codigo);
    colunaCodigo.innerHTML = recado.codigo;
    colunaDescricao.innerHTML = recado.descricao;
    colunaDetalhamento.innerHTML = recado.detalhamento;
    colunaAcoes.innerHTML = `
                                <button class="editar" onclick="prepararEdicaoRecado(${recado.codigo})">Editar</button>
                                <button class="apagar" onclick="apagarRecado(${recado.codigo})">Apagar</button>
                            `;
    
    novaLinha.appendChild(colunaCodigo);
    novaLinha.appendChild(colunaDescricao);
    novaLinha.appendChild(colunaDetalhamento);
    novaLinha.appendChild(colunaAcoes);
    tabela.appendChild(novaLinha);
}


function buscarRecadosUsuario() {
    let emailUsuariologado = localStorage.getItem("usuarioLogado");
    let listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));
    console.log(listaUsuarios);


    let usuarioLogado = listaUsuarios.find((usuario) => {
        return usuario.login == emailUsuariologado
    });

    console.log(usuarioLogado.recados)

    return usuarioLogado.recados
}

function atualizarRecados(novaListaRecados) {
    let emailUsuariologado = localStorage.getItem("usuarioLogado");
    let listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));

    let indiceUsuario = listaUsuarios.findIndex((usuario) => {
        return usuario.login == emailUsuariologado
    });
     
    listaUsuarios[indiceUsuario].recados = novaListaRecados;
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}

function sairLogin() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "pagina-login.html";
}

function verificaUsuarioLogado() {
    //se não existir usuario logado, retorna null
    let usuariologado = localStorage.getItem("usuarioLogado");

    if (!usuariologado) {
        alert("Você precisa estar logado para acessar essa página!")
        window.location.href = "pagina-login.html";
    }
}

function pegarDadosStorage() {

    //getItem('chave')
    //transformar tudo de volta para array e objetos JSON.parse(valor)
    let listaRecados = buscarRecadosUsuario();

    for (let recado of listaRecados) {
        mostrarRecadoNoHTML(recado);
    }
}


function apagarRecado(codigo){

    let listaRecados = buscarRecadosUsuario();
    let indiceEncontrado = listaRecados.findIndex((recado) => recado.codigo == codigo);
    

    let confirma = window.confirm(`Tem certeza que deseja apagar recado ${codigo}?`);

    if(confirma){

        let listaLinhasRecado = document.querySelectorAll('.recados');

        for (let linha of listaLinhasRecado){
            
            if(linha.id == codigo){
                tabela.removeChild(linha);
                listaRecados.splice(indiceEncontrado, 1);
                alert("Recado removido");
            }
        }

        atualizarRecados(listaRecados);

    }else{
        return
    }
}


function prepararEdicaoRecado(codigo) {
    /* alert(`Editar recado ${codigo}`); */
    botaoSalvarRegistro.setAttribute('style', 'display: none');
    botaoAtualizar.setAttribute('style', 'display: inline-block');
    botaoCancelar.setAttribute('style', 'display: inline-block');
    botaoCancelar.setAttribute('onclick', 'cancelarEdicao()');
    botaoAtualizar.setAttribute('onclick', `editarRecado(${codigo})`);
    

    let listaRecados = buscarRecadosUsuario();
    let recadoEncontrado = listaRecados.find((recado) => recado.codigo == codigo);

    inputCodigo.value = recadoEncontrado.codigo;
    inputCodigo.setAttribute('readonly', 'true');
    inputCodigo.setAttribute('disabled', 'true');
    inputDescricao.value = recadoEncontrado.descricao;
    inputDetalhamento.value = recadoEncontrado.detalhamento;
    
}

function cancelarEdicao(){
    botaoSalvarRegistro.setAttribute('style', 'inline-block');
    botaoAtualizar.setAttribute('style', 'display: none');
    botaoCancelar.setAttribute('style', 'display: none');

    inputCodigo.value = '';
    inputCodigo.removeAttribute('readonly');
    inputCodigo.removeAttribute('disabled');
    inputDescricao.value = '';
    inputDetalhamento.value = '';
}

function editarRecado(codigo){
    //alert(`Recado Encontrado ${codigo}`);

    let listaRecados = buscarRecadosUsuario();
    let indiceEncontrado = listaRecados.findIndex((recado) => recado.codigo == codigo);

    let recadoEditado = {
        codigo: inputCodigo.value,
        descricao: inputDescricao.value,
        detalhamento: inputDetalhamento.value 
    }

    listaRecados[indiceEncontrado] = recadoEditado;
    atualizarRecados(listaRecados);
    window.location.reload();
}