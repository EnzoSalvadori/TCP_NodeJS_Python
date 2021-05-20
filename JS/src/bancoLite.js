const total_span = document.querySelector('#total');
const inteiro_span = document.querySelector('#inteiro');
const tres_quartos_span = document.querySelector('#tres_quartos');
const meio_span = document.querySelector('#meio');
const um_quarto_span = document.querySelector('#um_quarto');
const quirera_span = document.querySelector('#quirera');
const com_casca_span = document.querySelector('#com_casca');
const sem_casca_span = document.querySelector('#sem_casca');
const tipo1_span = document.querySelector('#tipo1');
const tipo2_span = document.querySelector('#tipo2');
const tipo3_span = document.querySelector('#tipo3');
const tipo4_span = document.querySelector('#tipo4');
const tipo5_span = document.querySelector('#tipo5');

const p_com_casca_span = document.querySelector('#p_com_casca');
const p_sem_casca_span = document.querySelector('#p_sem_casca');
const p_inteiro_span = document.querySelector('#p_inteiro');
const p_tres_quartos_span = document.querySelector('#p_tres_quartos');
const p_meio_span = document.querySelector('#p_meio');
const p_um_quarto_span = document.querySelector('#p_um_quarto');
const p_quirera_span = document.querySelector('#p_quirera');
const p_tipo1_span = document.querySelector('#p_tipo1');
const p_tipo2_span = document.querySelector('#p_tipo2');
const p_tipo3_span = document.querySelector('#p_tipo3');
const p_tipo4_span = document.querySelector('#p_tipo4');
const p_tipo5_span = document.querySelector('#p_tipo5');
const p_total_span = document.querySelector('#p_total');

const data_inicio = document.querySelector('#data_inicio');
const data_fim = document.querySelector('#data_fim');
const usuario = document.querySelector('#usuario');
const codigo = document.querySelector('#codigo');
const produtor = document.querySelector('#produtor');

const corpo_tabela = document.querySelector("tbody");

const titulo = document.querySelector("#titulo");
const codigo_amostra = document.querySelector("#codigo_amostra");
const produtor_amostra = document.querySelector("#produtor_amostra");
const descricao_amostra = document.querySelector("#descricao_amostra");
const usuario_amostra = document.querySelector("#usuario_amostra");
const resultado = document.querySelector("#resultado");
const id_amostra = document.querySelector("#id_amostra");

const imagem = document.querySelector("#imagem");
const botaoDI = document.querySelector("#botao");

var ctxP1 = document.getElementById("pieChart1").getContext('2d');
var ctxP2 = document.getElementById("pieChart2").getContext('2d');
var ctxP3 = document.getElementById("pieChart3").getContext('2d');
var myPieChart1;
var myPieChart2;
var myPieChart3;

inteiro = 0;
tres_quartos = 0;
meio = 0;
um_quarto = 0;
quirera = 0;
com_casca = 0;
sem_casca = 0;
total = 0;
tipo1 = 0;
tipo2 = 0;
tipo3 = 0;
tipo4 = 0;
tipo5 = 0;

function atualizarAnalise() {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./banco/arroz');

    if (usuario.name == "vazio") {
        var vazio = document.createElement('option');
        vazio.setAttribute('value', -1);
        vazio.innerHTML = "Todos os usuario";
        usuario.appendChild(vazio);
        usuario.name = "cheio";

        db.serialize(function () {
            db.all('SELECT * FROM usuario', (error, res) => {
                for (i = 0; i < res.length; i++) {
                    var opcao = document.createElement('option');
                    opcao.setAttribute('value', res[i].id);
                    opcao.innerHTML = res[i].nome;
                    usuario.appendChild(opcao);
                }
            });
        });
    }
    if (usuario.value == -1 && data_fim.value != "" && data_inicio.value != "") {
        dataF = formataData(data_fim.value);
        dataI = formataData(data_inicio.value);
        db.serialize(function () {
            db.all("SELECT * FROM amostra WHERE UPPER(codigo) LIKE UPPER('%" + codigo.value + "%') AND UPPER(fornecedor) LIKE UPPER('%" + produtor.value + "%') AND data_g >='" + dataI + "' AND data_g <='" + dataF + "'", (error, res) => {
                soma(res);
                preencher();
                tabela(res);
                graficos();
            });
        });
    }
    else if (usuario.value != -1 && data_fim.value == "" && data_inicio.value == "") {  // fazer todos os selects possiveis para cada caso
        db.serialize(function () {
            db.all("SELECT * FROM amostra WHERE UPPER(codigo) LIKE UPPER('%" + codigo.value + "%') AND UPPER(fornecedor) LIKE UPPER('%" + produtor.value + "%') AND fk_usuario =" + usuario.value, (error, res) => {
                soma(res);
                preencher();
                tabela(res);
                graficos();
            });
        });
    }
    else if (usuario.value != -1 && data_fim.value != "" && data_inicio.value != "") {
        dataF = formataData(data_fim.value);
        dataI = formataData(data_inicio.value);
        db.serialize(function () {
            db.all("SELECT * FROM amostra WHERE UPPER(codigo) LIKE UPPER('%" + codigo.value + "%') AND UPPER(fornecedor) LIKE UPPER('%" + produtor.value + "%') AND data_g >='" + dataI + "' AND data_g <='" + dataF + "' AND fk_usuario =" + usuario.value, (error, res) => {
                soma(res);
                preencher();
                tabela(res);
                graficos();
            });
        });
    }
    else {
        db.serialize(function () {
            db.all("SELECT * FROM amostra WHERE UPPER(codigo) LIKE UPPER('%" + codigo.value + "%') AND UPPER(fornecedor) LIKE UPPER('%" + produtor.value + "%')", (error, res) => {
                soma(res);
                preencher();
                tabela(res);
                graficos();
            });
        });
    }
    db.close();
}

function graficos() {
    if (myPieChart1 != null){
        myPieChart1.destroy();
    }
    if (myPieChart2 != null){
        myPieChart2.destroy();
    }
    if (myPieChart3 != null){
        myPieChart3.destroy();
    }

    if (total == 0) {
        myPieChart1 = new Chart(ctxP1, {
            type: 'pie',
            data: {
                labels: [""],
                datasets: [{
                    data: [1],
                    backgroundColor: ["#555"],
                }]
            },
            options: {
                responsive: true
            }
        });
        myPieChart2 = new Chart(ctxP2, {
            type: 'pie',
            data: {
                labels: [""],
                datasets: [{
                    data: [1],
                    backgroundColor: ["#555"],
                }]
            },
            options: {
                responsive: true
            }
        });
        myPieChart3 = new Chart(ctxP3, {
            type: 'pie',
            data: {
                labels: [""],
                datasets: [{
                    data: [1],
                    backgroundColor: ["#555"],
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    else {
        myPieChart1 = new Chart(ctxP1, {
            type: 'pie',
            data: {
                labels: ["Com Casca", "Sem Casca"],
                datasets: [{
                    data: [(com_casca / total).toPrecision(2), (sem_casca / total).toPrecision(2)],
                    backgroundColor: ["#32CD32", "#DAA520"],
                }]
            },
            options: {
                responsive: true
            }
        });
        myPieChart2 = new Chart(ctxP2, {
            type: 'pie',
            data: {
                labels: ["Inteiro", "(3/4)", "(1/2)", "(1/4)", "Quiera"],
                datasets: [{
                    data: [(inteiro / total).toPrecision(2), (tres_quartos / total).toPrecision(2), (meio / total).toPrecision(2), (um_quarto / total).toPrecision(2), (quirera / total).toPrecision(2)],
                    backgroundColor: ["#8B0000", "#FF4500", "#FF8C00", "#FF7F50", "#FFD700"],
                }]
            },
            options: {
                responsive: true
            }
        });
        myPieChart3 = new Chart(ctxP3, {
            type: 'pie',
            data: {
                labels: ["Tipo 1", "Tipo 2", "Tipo 3", "Tipo 4", "Tipo 5"],
                datasets: [{
                    data: [(tipo1 / total).toPrecision(2), (tipo2 / total).toPrecision(2), (tipo3 / total).toPrecision(2), (tipo4 / total).toPrecision(2), (tipo5 / total).toPrecision(2)],
                    backgroundColor: ["#00008B", "#0000FF", "#00BFFF", "#1E90FF", "#4169E1"],
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}

function soma(res) {
    inteiro = 0;
    tres_quartos = 0;
    meio = 0;
    um_quarto = 0;
    quirera = 0;
    com_casca = 0;
    sem_casca = 0;
    total = 0;
    total = 0;
    tipo1 = 0;
    tipo2 = 0;
    tipo3 = 0;
    tipo4 = 0;
    tipo5 = 0;
    for (i = 0; i < res.length; i++) {
        inteiro += res[i].inteiro;
        tres_quartos += res[i].tres_quartos;
        meio += res[i].meio;
        um_quarto += res[i].um_quarto;
        quirera += res[i].quirera;
        com_casca += res[i].com_casca;
        sem_casca += res[i].sem_casca;
        total += res[i].total;
        tipo1 += res[i].tipo1;
        tipo2 += res[i].tipo2;
        tipo3 += res[i].tipo3;
        tipo4 += res[i].tipo4;
        tipo5 += res[i].tipo5;

    }
}

function preencher() {
    inteiro_span.innerHTML = inteiro;
    total_span.innerHTML = total;
    tres_quartos_span.innerHTML = tres_quartos;
    meio_span.innerHTML = meio;
    um_quarto_span.innerHTML = um_quarto;
    quirera_span.innerHTML = quirera;
    com_casca_span.innerHTML = com_casca;
    sem_casca_span.innerHTML = sem_casca;
    tipo1_span.innerHTML = tipo1;
    tipo2_span.innerHTML = tipo2;
    tipo3_span.innerHTML = tipo3;
    tipo4_span.innerHTML = tipo4;
    tipo5_span.innerHTML = tipo5;
    p_com_casca_span.innerHTML = ((com_casca / total) * 100).toPrecision(3) + "%";
    p_sem_casca_span.innerHTML = ((sem_casca / total) * 100).toPrecision(3) + "%";
    p_inteiro_span.innerHTML = ((inteiro / total) * 100).toPrecision(3) + "%";
    p_tres_quartos_span.innerHTML = ((tres_quartos / total) * 100).toPrecision(3) + "%";
    p_meio_span.innerHTML = ((meio / total) * 100).toPrecision(3) + "%";
    p_um_quarto_span.innerHTML = ((um_quarto / total) * 100).toPrecision(3) + "%";
    p_quirera_span.innerHTML = ((quirera / total) * 100).toPrecision(3) + "%";
    p_tipo1_span.innerHTML = ((tipo1 / total) * 100).toPrecision(3) + "%";
    p_tipo2_span.innerHTML = ((tipo2 / total) * 100).toPrecision(3) + "%";
    p_tipo3_span.innerHTML = ((tipo3 / total) * 100).toPrecision(3) + "%";
    p_tipo4_span.innerHTML = ((tipo4 / total) * 100).toPrecision(3) + "%";
    p_tipo5_span.innerHTML = ((tipo5 / total) * 100).toPrecision(3) + "%";
    p_total_span.innerHTML = 100 + "%";
    if (total == 0) {
        p_com_casca_span.innerHTML = 0 + "%";
        p_sem_casca_span.innerHTML = 0 + "%";
        p_inteiro_span.innerHTML = 0 + "%";
        p_tres_quartos_span.innerHTML = 0 + "%";
        p_meio_span.innerHTML = 0 + "%";
        p_um_quarto_span.innerHTML = 0 + "%";
        p_quirera_span.innerHTML = 0 + "%";
        p_tipo1_span.innerHTML = 0 + "%";
        p_tipo2_span.innerHTML = 0 + "%";
        p_tipo3_span.innerHTML = 0 + "%";
        p_tipo4_span.innerHTML = 0 + "%";
        p_tipo5_span.innerHTML = 0 + "%";
        p_total_span.innerHTML = 0 + "%";
    }
}

function atualizarAmostra() {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./banco/arroz');
    var db2 = new sqlite3.Database('./banco/arroz');

    var ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.on('store-data', function (event, store) {
        id_amostra.value = store;
        db.serialize(function () {
            db.all('SELECT * FROM amostra WHERE id =' + store, (error, res) => {
                titulo.innerHTML = "Amostra codigo  " + res[0].codigo;
                codigo_amostra.value = res[0].codigo;
                produtor_amostra.value = res[0].fornecedor;
                descricao_amostra.innerHTML = res[0].descricao;
                db2.all('SELECT * FROM usuario WHERE id =' + res[0].fk_usuario, (error, res) => {
                    usuario_amostra.value = res[0].nome;
                });
            });

            db.all('SELECT * FROM imagem WHERE fk_amostra =' + store, (error, res) => {
                tabelaAmostra(res);
                soma(res);
                preencher();
            });
        });
        db.close();
    });
}

function atualizarImagem() {
    var ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.on('store-data', function (event, store) {
        imagem.setAttribute('src', store);
        botaoDI.setAttribute('href', store)
    });
}

function baixarImagens() {
    botaoI.disabled = true;
    botaoI.innerHTML = "Aguarde baixando as imagens ...";
    var id = id_amostra.value;
    var path = process.env.USERPROFILE + "\\Downloads";
    var zipFolder = require('zip-folder');
    zipFolder(__dirname + '\\..\\fotos\\' + id + '\\', path + '/amostra_' + id + '.zip', function (err) {
        if (err) {
            console.log('oh no!', err);
        } else {
            console.log('EXCELLENT');
        }
        const { shell } = require('electron').remote
        shell.showItemInFolder(path + '\\amostra_' + id + '.zip');
        botaoI.disabled = false;
        botaoI.innerHTML = "Baixar todas as imagens";
    });
}

function tabelaAmostra(res) {
    var template = document.querySelector("#templateAmostra");
    var a_img1 = document.createElement('button');
    var a_img2 = document.createElement('button');
    var a_img3 = document.createElement('button');

    var valor0 = document.createElement('span');
    var porcentagem0 = document.createElement('span');
    porcentagem0.setAttribute('class', 'text-info');

    var valor1 = document.createElement('span');
    var porcentagem1 = document.createElement('span');
    porcentagem1.setAttribute('class', 'text-info');

    var valor2 = document.createElement('span');
    var porcentagem2 = document.createElement('span');
    porcentagem2.setAttribute('class', 'text-info');

    var valor3 = document.createElement('span');
    var porcentagem3 = document.createElement('span');
    porcentagem3.setAttribute('class', 'text-info');

    var valor4 = document.createElement('span');
    var porcentagem4 = document.createElement('span');
    porcentagem4.setAttribute('class', 'text-info');

    var valor5 = document.createElement('span');
    var porcentagem5 = document.createElement('span');
    porcentagem5.setAttribute('class', 'text-info');

    var valor6 = document.createElement('span');
    var porcentagem6 = document.createElement('span');
    porcentagem6.setAttribute('class', 'text-info');

    var valor7 = document.createElement('span');
    var porcentagem7 = document.createElement('span');
    porcentagem7.setAttribute('class', 'text-info');

    var valor8 = document.createElement('span');
    var porcentagem8 = document.createElement('span');
    porcentagem8.setAttribute('class', 'text-info');

    var valor9 = document.createElement('span');
    var porcentagem9 = document.createElement('span');
    porcentagem9.setAttribute('class', 'text-info');

    var valor10 = document.createElement('span');
    var porcentagem10 = document.createElement('span');
    porcentagem10.setAttribute('class', 'text-info');

    var valor11 = document.createElement('span');
    var porcentagem11 = document.createElement('span');
    porcentagem11.setAttribute('class', 'text-info');

    var valor12 = document.createElement('span');
    var porcentagem12 = document.createElement('span');
    porcentagem12.setAttribute('class', 'text-info');

    for (i = 0; i < res.length; i++) {
        lista_td = template.content.querySelectorAll("td");
        valor0.innerHTML = res[i].inteiro;
        porcentagem0.innerHTML = "&nbsp " + (res[i].inteiro / res[i].total * 100).toPrecision(3) + "%";
        lista_td[0].appendChild(valor0);
        lista_td[0].appendChild(porcentagem0);
        valor1.innerHTML = res[i].tres_quartos;
        porcentagem1.innerHTML = "&nbsp " + (res[i].tres_quartos / res[i].total * 100).toPrecision(3) + "%";
        lista_td[1].appendChild(valor1);
        lista_td[1].appendChild(porcentagem1);
        valor2.innerHTML = res[i].meio;
        porcentagem2.innerHTML = "&nbsp " + (res[i].meio / res[i].total * 100).toPrecision(3) + "%";
        lista_td[2].appendChild(valor2);
        lista_td[2].appendChild(porcentagem2);
        valor3.innerHTML = res[i].um_quarto;
        porcentagem3.innerHTML = "&nbsp " + (res[i].um_quarto / res[i].total * 100).toPrecision(3) + "%";
        lista_td[3].appendChild(valor3);
        lista_td[3].appendChild(porcentagem3);
        valor4.innerHTML = res[i].quirera;
        porcentagem4.innerHTML = "&nbsp " + (res[i].quirera / res[i].total * 100).toPrecision(3) + "%";
        lista_td[4].appendChild(valor4);
        lista_td[4].appendChild(porcentagem4);
        valor5.innerHTML = res[i].com_casca;
        porcentagem5.innerHTML = "&nbsp " + (res[i].com_casca / res[i].total * 100).toPrecision(3) + "%";
        lista_td[5].appendChild(valor5);
        lista_td[5].appendChild(porcentagem5);
        valor6.innerHTML = res[i].sem_casca;
        porcentagem6.innerHTML = "&nbsp " + (res[i].sem_casca / res[i].total * 100).toPrecision(3) + "%";
        lista_td[6].appendChild(valor6);
        lista_td[6].appendChild(porcentagem6);
        valor7.innerHTML = res[i].tipo1;
        porcentagem7.innerHTML = "&nbsp " + (res[i].tipo1 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[7].appendChild(valor7);
        lista_td[7].appendChild(porcentagem7);
        valor8.innerHTML = res[i].tipo2;
        porcentagem8.innerHTML = "&nbsp " + (res[i].tipo2 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[8].appendChild(valor8);
        lista_td[8].appendChild(porcentagem8);
        valor9.innerHTML = res[i].tipo3;
        porcentagem9.innerHTML = "&nbsp " + (res[i].tipo3 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[9].appendChild(valor9);
        lista_td[9].appendChild(porcentagem9);
        valor10.innerHTML = res[i].tipo4;
        porcentagem10.innerHTML = "&nbsp " + (res[i].tipo4 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[10].appendChild(valor10);
        lista_td[10].appendChild(porcentagem10);
        valor11.innerHTML = res[i].tipo5;
        porcentagem11.innerHTML = "&nbsp " + (res[i].tipo5 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[11].appendChild(valor11);
        lista_td[11].appendChild(porcentagem11);
        valor12.innerHTML = res[i].total;
        lista_td[12].appendChild(valor12)
        a_img1.innerHTML = '<img src="' + res[i].caminho_img1 + '" width="128" height="72">';
        a_img1.setAttribute('class', 'm-0 p-0');
        a_img1.setAttribute('onclick', "abreImg(" + "'" + res[i].caminho_img1 + "'" + ")");
        lista_td[13].innerHTML = "";
        lista_td[13].appendChild(a_img1);
        a_img2.innerHTML = '<img src="' + res[i].caminho_img2 + '" width="128" height="72">';
        a_img2.setAttribute('class', 'm-0 p-0');
        a_img2.setAttribute('onclick', "abreImg(" + "'" + res[i].caminho_img2 + "'" + ")");
        lista_td[14].innerHTML = "";
        lista_td[14].appendChild(a_img2);
        a_img3.innerHTML = '<img src="' + res[i].caminho_img3 + '" width="128" height="72">';
        a_img3.setAttribute('class', 'm-0 p-0');
        a_img3.setAttribute('onclick', "abreImg(" + "'" + res[i].caminho_img3 + "'" + ")");
        lista_td[15].innerHTML = "";
        lista_td[15].appendChild(a_img3);
        var nova_linha = document.importNode(template.content, true);
        corpo_tabela.appendChild(nova_linha);
    }
}

function tabela(res) {
    var template = document.querySelector("#template");
    var lb_inp = document.createElement('button');

    var valor0 = document.createElement('span');
    var porcentagem0 = document.createElement('span');
    porcentagem0.setAttribute('class', 'text-info');

    var valor1 = document.createElement('span');
    var porcentagem1 = document.createElement('span');
    porcentagem1.setAttribute('class', 'text-info');

    var valor2 = document.createElement('span');
    var porcentagem2 = document.createElement('span');
    porcentagem2.setAttribute('class', 'text-info');

    var valor3 = document.createElement('span');
    var porcentagem3 = document.createElement('span');
    porcentagem3.setAttribute('class', 'text-info');

    var valor4 = document.createElement('span');
    var porcentagem4 = document.createElement('span');
    porcentagem4.setAttribute('class', 'text-info');

    var valor5 = document.createElement('span');
    var porcentagem5 = document.createElement('span');
    porcentagem5.setAttribute('class', 'text-info');

    var valor6 = document.createElement('span');
    var porcentagem6 = document.createElement('span');
    porcentagem6.setAttribute('class', 'text-info');

    var valor7 = document.createElement('span');
    var porcentagem7 = document.createElement('span');
    porcentagem7.setAttribute('class', 'text-info');

    var valor8 = document.createElement('span');
    var porcentagem8 = document.createElement('span');
    porcentagem8.setAttribute('class', 'text-info');

    var valor9 = document.createElement('span');
    var porcentagem9 = document.createElement('span');
    porcentagem9.setAttribute('class', 'text-info');

    var valor10 = document.createElement('span');
    var porcentagem10 = document.createElement('span');
    porcentagem10.setAttribute('class', 'text-info');

    var valor11 = document.createElement('span');
    var porcentagem11 = document.createElement('span');
    porcentagem11.setAttribute('class', 'text-info');

    var valor12 = document.createElement('span');
    var porcentagem12 = document.createElement('span');
    porcentagem12.setAttribute('class', 'text-info');

    document.querySelector("tbody").innerHTML = "";
    for (i = 0; i < res.length; i++) {
        lista_td = template.content.querySelectorAll("td");
        lista_td[3].innerHTML = " ";
        lista_td[4].innerHTML = " ";
        lista_td[5].innerHTML = " ";
        lista_td[6].innerHTML = " ";
        lista_td[7].innerHTML = " ";
        lista_td[8].innerHTML = " ";
        lista_td[9].innerHTML = " ";
        lista_td[10].innerHTML = " ";
        lista_td[11].innerHTML = " ";
        lista_td[12].innerHTML = " ";
        lista_td[13].innerHTML = " ";
        lista_td[14].innerHTML = " ";
        lista_td[15].innerHTML = " ";
        lista_td[0].textContent = res[i].fornecedor;
        lista_td[1].textContent = res[i].data_g;
        lista_td[2].textContent = res[i].codigo;
        valor0.innerHTML = res[i].inteiro;
        porcentagem0.innerHTML = "&nbsp " + (res[i].inteiro / res[i].total * 100).toPrecision(3) + "%";
        lista_td[3].appendChild(valor0);
        lista_td[3].appendChild(porcentagem0);
        valor1.innerHTML = res[i].tres_quartos;
        porcentagem1.innerHTML = "&nbsp " + (res[i].tres_quartos / res[i].total * 100).toPrecision(3) + "%";
        lista_td[4].appendChild(valor1);
        lista_td[4].appendChild(porcentagem1);
        valor2.innerHTML = res[i].meio;
        porcentagem2.innerHTML = "&nbsp " + (res[i].meio / res[i].total * 100).toPrecision(3) + "%";
        lista_td[5].appendChild(valor2);
        lista_td[5].appendChild(porcentagem2);
        valor3.innerHTML = res[i].um_quarto;
        porcentagem3.innerHTML = "&nbsp " + (res[i].um_quarto / res[i].total * 100).toPrecision(3) + "%";
        lista_td[6].appendChild(valor3);
        lista_td[6].appendChild(porcentagem3);
        valor4.innerHTML = res[i].quirera;
        porcentagem4.innerHTML = "&nbsp " + (res[i].quirera / res[i].total * 100).toPrecision(3) + "%";
        lista_td[7].appendChild(valor4);
        lista_td[7].appendChild(porcentagem4);
        valor5.innerHTML = res[i].com_casca;
        porcentagem5.innerHTML = "&nbsp " + (res[i].com_casca / res[i].total * 100).toPrecision(3) + "%";
        lista_td[8].appendChild(valor5);
        lista_td[8].appendChild(porcentagem5);
        valor6.innerHTML = res[i].sem_casca;
        porcentagem6.innerHTML = "&nbsp " + (res[i].sem_casca / res[i].total * 100).toPrecision(3) + "%";
        lista_td[9].appendChild(valor6);
        lista_td[9].appendChild(porcentagem6);
        valor7.innerHTML = res[i].tipo1;
        porcentagem7.innerHTML = "&nbsp " + (res[i].tipo1 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[10].appendChild(valor7);
        lista_td[10].appendChild(porcentagem7);
        valor8.innerHTML = res[i].tipo2;
        porcentagem8.innerHTML = "&nbsp " + (res[i].tipo2 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[11].appendChild(valor8);
        lista_td[11].appendChild(porcentagem8);
        valor9.innerHTML = res[i].tipo3;
        porcentagem9.innerHTML = "&nbsp " + (res[i].tipo3 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[12].appendChild(valor9);
        lista_td[12].appendChild(porcentagem9);
        valor10.innerHTML = res[i].tipo4;
        porcentagem10.innerHTML = "&nbsp " + (res[i].tipo4 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[13].appendChild(valor10);
        lista_td[13].appendChild(porcentagem10);
        valor11.innerHTML = res[i].tipo5;
        porcentagem11.innerHTML = "&nbsp " + (res[i].tipo5 / res[i].total * 100).toPrecision(3) + "%";
        lista_td[14].appendChild(valor11);
        lista_td[14].appendChild(porcentagem11);
        valor12.innerHTML = res[i].total;
        lista_td[15].appendChild(valor12)
        lb_inp.innerHTML = 'Ver mais';
        lb_inp.setAttribute('onclick', 'createBrowserWindow(' + res[i].id + ')');
        lb_inp.setAttribute('class', 'btn btn-primary btn-sm');
        lista_td[16].innerHTML = "";
        lista_td[16].appendChild(lb_inp);
        var nova_linha = document.importNode(template.content, true);
        corpo_tabela.appendChild(nova_linha);
    }
}

function alterarAmostra() {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./banco/arroz');
    if (codigo_amostra.value == "" || produtor_amostra == "" || descricao_amostra.value == "") {
        resultado.setAttribute('class', 'text-center text-warning');
        resultado.innerHTML = "TODOS OS CAMPOS PRECISAM ESTAR PREENCHIDOS";
        console.log(id_amostra.value)
    }
    else {
        db.serialize(function () {
            db.run("UPDATE  amostra SET codigo = " + codigo_amostra.value + ", fornecedor = '" + produtor_amostra.value + "', descricao = '" + descricao_amostra.value + "'WHERE id =" + id_amostra.value);
        });
        titulo.innerHTML = "Amostra codigo  " + codigo_amostra.value;
        resultado.setAttribute('class', 'text-center text-success');
        resultado.innerHTML = "OS CAMPOS FORAM SALVOS COM SUCESSO"
    }
    db.close();
}

function formataData(data) {
    data = data.split("-");
    var result = "";
    for (i = data.length - 1; i >= 0; i--) {
        if (i == 0) {
            result = result + data[i]
        } else {
            result = result + data[i] + "/"
        }
    }
    return result;
}

function abreImg(caminho) {
    const { BrowserWindow } = require('electron').remote;
    const win = new BrowserWindow({
        height: 630,
        width: 750,
        resizable: false,
        webPreferences: {
            nodeIntegration: true, // para poder usar o require no script
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('store-data', caminho);
    })
    win.loadURL(`file://${__dirname}/../examples/imagem.html`);
}

function createBrowserWindow(id) {
    const { BrowserWindow } = require('electron').remote;
    const win = new BrowserWindow({
        height: 1000,
        width: 1850,
        resizable: false,
        webPreferences: {
            nodeIntegration: true, // para poder usar o require no script
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('store-data', id);
    })
    win.loadURL(`file://${__dirname}/../examples/amostras.html`);
}
