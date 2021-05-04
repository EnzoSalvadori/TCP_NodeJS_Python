const total_span = document.querySelector('#total');
const inteiro_span = document.querySelector('#inteiro');
const tres_quartos_span = document.querySelector('#tres_quartos');
const meio_span = document.querySelector('#meio');
const um_quarto_span = document.querySelector('#um_quarto');
const quirera_span = document.querySelector('#quirera');
const com_casca_span = document.querySelector('#com_casca');
const sem_casca_span = document.querySelector('#sem_casca');
const p_com_casca_span = document.querySelector('#p_com_casca');
const tipo1_span = document.querySelector('#tipo1');
const tipo2_span = document.querySelector('#tipo2');
const tipo3_span = document.querySelector('#tipo3');
const tipo4_span = document.querySelector('#tipo4');
const tipo5_span = document.querySelector('#tipo5');

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
const resultado = document.querySelector("#resultado");
const id_amostra = document.querySelector("#id_amostra");

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

    if ((data_fim.value != "") && (data_inicio.value != "")) {  // fazer todos os selects possiveis para cada caso
        client.query('SELECT * FROM amostra', (err, res) => {
            soma(res);
            preencher();
            tabela(res);
            client.end();
        })
    }
    else {  // fazer todos os selects possiveis para cada caso
        db.serialize(function () {
            db.all("SELECT * FROM amostra WHERE UPPER(codigo) LIKE UPPER('%" + codigo.value + "%')", (error, res) => {
                soma(res);
                preencher();
                tabela(res);
            });
        });
    }
    db.close();
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
}

function atualizarAmostra() {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./banco/arroz');

    var ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.on('store-data', function (event, store) {
        id_amostra.value = store;
        db.serialize(function () {
            db.all('SELECT * FROM amostra WHERE id =' + store, (error, res) => {
                titulo.innerHTML = "Amostra codigo  " + res[0].codigo;
                codigo_amostra.value = res[0].codigo;
                produtor_amostra.value = res[0].fk_fornecedor;
                descricao_amostra.innerHTML = res[0].descricao;
            });
            db.all('SELECT * FROM imagem WHERE fk_amostra =' + store, (error, res) => {
                tabelaAmostra(res);
            });
        });
        db.close();
    });
}

function tabelaAmostra(res) {
    var template = document.querySelector("#templateAmostra");
    var a_img1 = document.createElement('button');
    var a_img2 = document.createElement('button');
    var a_img3 = document.createElement('button');
    for (i = 0; i < res.length; i++) {
        lista_td = template.content.querySelectorAll("td");
        lista_td[0].textContent = res[i].inteiro;
        lista_td[1].textContent = res[i].tres_quartos;
        lista_td[2].textContent = res[i].meio;
        lista_td[3].textContent = res[i].um_quarto;
        lista_td[4].textContent = res[i].quirera;
        lista_td[5].textContent = res[i].com_casca;
        lista_td[6].textContent = res[i].sem_casca;
        lista_td[7].textContent = res[i].tipo1;
        lista_td[8].textContent = res[i].tipo2;
        lista_td[9].textContent = res[i].tipo3;
        lista_td[10].textContent = res[i].tipo4;
        lista_td[11].textContent = res[i].tipo5;
        lista_td[12].textContent = res[i].total;
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
    document.querySelector("tbody").innerHTML = "";
    for (i = 0; i < res.length; i++) {
        lista_td = template.content.querySelectorAll("td");
        //lista_td[0].textContent =  res[i].data;
        lista_td[0].textContent = res[i].fk_fornecedor;
        lista_td[1].textContent = "28/04/2021";
        lista_td[2].textContent = res[i].codigo;
        lista_td[3].textContent = res[i].inteiro;
        lista_td[4].textContent = res[i].tres_quartos;
        lista_td[5].textContent = res[i].meio;
        lista_td[6].textContent = res[i].um_quarto;
        lista_td[7].textContent = res[i].quirera;
        lista_td[8].textContent = res[i].com_casca;
        lista_td[9].textContent = res[i].sem_casca;
        lista_td[10].textContent = res[i].tipo1;
        lista_td[11].textContent = res[i].tipo2;
        lista_td[12].textContent = res[i].tipo3;
        lista_td[13].textContent = res[i].tipo4;
        lista_td[14].textContent = res[i].tipo5;
        lista_td[15].textContent = res[i].total;
        lb_inp.innerHTML = 'Ver mais';
        lb_inp.setAttribute('onclick', 'createBrowserWindow(' + res[i].id + ')');
        lb_inp.setAttribute('class', 'btn btn-primary btn-sm');
        lista_td[16].innerHTML = "";
        lista_td[16].appendChild(lb_inp);
        var nova_linha = document.importNode(template.content, true);
        corpo_tabela.appendChild(nova_linha);
    }
}

function alterar_amostra() {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./banco/arroz');
    if (codigo_amostra.value == "" || produtor_amostra == "" || descricao_amostra.value == "") {
        resultado.setAttribute('class', ' alert alert-warning text-center');
        resultado.innerHTML = "TODOS OS CAMPOS PRECISAM ESTAR PREENCHIDOS";
        console.log(id_amostra.value)
    }
    else {
        db.serialize(function () {
            db.run("UPDATE  amostra SET codigo = " + codigo_amostra.value + ", fk_fornecedor = " + produtor_amostra.value + ", descricao = '" + descricao_amostra.value + "'WHERE id =" + id_amostra.value);
        });
        titulo.innerHTML = "Amostra codigo  " + codigo_amostra.value;
        resultado.setAttribute('class', 'alert alert-success text-center');
        resultado.innerHTML = "SALVO COM SUCESSO"
    }
    db.close();
}

function abreImg(caminho) {
    console.log(caminho);
    const { BrowserWindow } = require('electron').remote;
    const win = new BrowserWindow({
        height: 480,
        width: 640
    });
    win.loadURL(`file://${__dirname}/` + caminho);
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
