// Declarando uma variável e atribuindo ela o formulário do HTML
const form = document.getElementById('form-atividade');

//Criando a inclusão das imagens para atribuir dentro do processo das adições das linhas.
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';

//Criando 2 arrays no escopo global para armazenar as atividades e as notas.
//Toda vez que o adicionar linha for chamado, vamos fazer um "push" para adicionar neste array.
const atividades = [];
const notas = [];

//Declarando a variável span referente a um parâmetro dentro do index.html para puxar a customização da aprovação final.
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

//Será a nota utilizada para definir a média para ser aprovado.
const notaMinima = prompt('Digite a nota minima!');

//Foi preciso tornar essa variável global, pois se colocarmos ela dentro do form.addEventListener sempre que ocorrer um "submit" ela seria resetada.
//A ideia é criar uma adição das linhas a essa variável e integra-la ao HTML
let linhas = '';

//Criando um evento de submit, que seria ao clicar no botão de adicionar
form.addEventListener('submit', function(e){

    //Bloqueando o comportamento de atualizar a página
    e.preventDefault();

    //A responsabilidade dessa função é apenas criar uma nova linha e suas colunas.
    adicionaLinha();

    //Função que deve ocorrer após a criação da linha, onde ela pegará o que foi criado e atualizará o corpo da tabela.
    atualizaTabela();

    //Função que irá ser chamada no evento para atualizar a média das notas.
    atualizaMediaFinal();
});

//Função criada para separar e organizar o código.
function adicionaLinha () {

    //Criando a variável para capturar esses elementos no momento em que os dados forem inseridos.
    const inputNomeAtividade = document.getElementById('nome-atividade')
    const inputNotaAtividade = document.getElementById('nota-atividade')

    //Criando a condição para se caso a atividade já existir, ele não executar a adição duplicada.
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida!`)
    } else {

     //Fazendo a inclusão dos dados dentro do array declarado no escopo global.
    atividades.push(inputNomeAtividade.value);
    //Usamos o parseFloat pois no momento do push, ele estava entendendo que a nota era uma String e não um número, assim quando fossemos soma-los para fazer a média, ele iria concatenar.
    notas.push(parseFloat(inputNotaAtividade.value));

    //Estamos criando a linha da tabela com suas colunas
    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado}</td>`;
    linha += '</tr>';

    //Inserindo a linha criada e somando elas na variável linha, para termos o efeito de varios registros de atividades no formulário
    linhas += linha;

    }


    //Limpando o campo de input após gerar o submit
    inputNomeAtividade.value = "";
    inputNotaAtividade.value = "";

}

//Função criada para atualizar a tabela com as informações da linha.
function atualizaTabela() {
        //Estamos resgatando o corpo da tabela, que é onde os dados serão registrados.
        const corpoTabela = document.querySelector('tbody');
        //Com essa ação, estamos incorporando a variável "corpoTabela ao código index.html e com essa incorporação, atribuímos a linha na variável corpoTabela"
        corpoTabela.innerHTML = linhas;
}

//Função criada para atualizar a média das notas atribuídas ao array notas
function atualizaMediaFinal() {

    //Declarando uma variável com o resultado da média feita na função de calculaMediaFinal.
    const mediaFinal = calculaMediaFinal();

    //Estamos inserindo os resultados originados da mediaFinal e da divisão dos resultado e inserindo no HTML atráves do ID.
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2) //limitando as casas decimais em 2;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

}

//Função utilizada para calcular a média.
function calculaMediaFinal() {

        //Declarando a variável que receberá a soma das notas
        let somaDasNotas = 0;

        //Criando uma estrutura de repetição onde irá realizar a soma das notas inseridas
        for (let i = 0; i<notas.length; i++) {
            somaDasNotas += notas[i];
        }
        
        //retornando o resultado da operação realizada dentro da função
        return somaDasNotas / notas.length;

}