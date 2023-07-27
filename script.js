// alert ("Hello Word!!")

// Algoritmo
// OK  1. Pegar os valores dos inputs
// OK  2. Fazer o calculo do IMC -> valorImc
// Ok  3. Gerar a classificaçao IMC -> classificacaoImc
// Ok  4. Organizar os dados do usuario para salvar na lista e gerar a data de cadastro
// Ok  5. inserir o usuario na lista(salvar no localStorage)
//   6. Funcao para carregar os usuarios(salvos no localStorage) chamar ao carregar a pagina
// 7.  renderizar o conteudo da tabela com os usuarios cadastrados = mostrar na tela
// Botao para limpar os registros (localStorage)

function calcular(event) {


  event.preventDefault()

  console.log ("Executada funçao calcular!!")

  // passo 1
  let usuario = receberValores()
  // passo 2
  let imcCalculado = calcularImc(usuario.altura, usuario.peso)
  // passo 3
  let classificacaoImc = classificarImc (imcCalculado)

  console.log (classificacaoImc)

  // passo 4
  usuario = organizarDados (usuario, imcCalculado, classificacaoImc)

  // passo 5
  cadastrarUsuario(usuario)


}

function receberValores() {
  let nomeRecebido = document.getElementById ("nome").value.trim()
  let alturaRecebida = document.getElementById ("altura").value
  let pesoRecebido = document.getElementById ('peso').value

  let dadosUsuario = {
    nome: nomeRecebido,
    altura: alturaRecebida,
    peso: pesoRecebido
  }
console.log (dadosUsuario)

return dadosUsuario
}

function calcularImc(altura, peso) {
  let imc = peso / (altura * altura)

  console.log (imc.toFixed(1))

  return imc
}

function classificarImc(imc) {

/*
Resultado              Situaçao

Abaixo de 18.5         Abaixo do peso
entre 18.5 e 24.99     Peso normal
entre 25.0 e 29.99     Sobrepeso 
Acima de 30            Obeso

*/ 

if (imc < 18.5) {
  return 'Abaixo do peso'
} else if (imc >= 18.5 && imc < 25){
  return 'Peso normal'
} else if (imc >= 25 && imc < 30) {
  return 'Sobrepeso' 
} else {
  return 'Obesidade'
}
}

function organizarDados (usuario, imcCalculado, classificacaoImc) {
  // pegar data e hora
let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())

console.log(dataHoraAtual)

// organizar dados

let dadosUsuarioAtualizado = {
  ...usuario,
  imc: imcCalculado.toFixed(1),
  situaçaoImc: classificacaoImc,
  dataCadastro: dataHoraAtual
}

return dadosUsuarioAtualizado;

}

function cadastrarUsuario(usuario) {

let listaUsuarios = []


if (localStorage.getItem('usuariosCadastrados') != null) {
  listaUsuarios = JSON.parse ( localStorage.getItem ('usuariosCadastrados'))
}

//Adiciona o usuario
listaUsuarios.push (usuario)

// Salva a lista usuario Localstorage
localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))

}

function carregarUsuarios () {
  let listaCarregada = []

  if (localStorage.getItem('usuariosCadastrados') != null) {
    listaCarregada = JSON.parse (localStorage.getItem('usuariosCadastrados'))
  }

  if (listaCarregada.length == 0) {
    // se nao tiver nenhum usuario cadastrado mostrar msg
    let tabela = document.getElementById('corpo-tabela')

    tabela.innerHTML = 'Nenhum usuario cadastrado'
  }

  console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())