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

const { Pool, Client } = require('pg');

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

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'Arroz',
        password: 'ozne1711',
        port: 5432,
    })

    client.connect();

    if ((data_fim.value != "") && (data_inicio.value != "")) {  // fazer todos os selects possiveis para cada caso
        client.query('SELECT * FROM amostra', (err, res) => {
            soma(res);
            preencher();
            tabela(res);
            client.end();
        })
    }

    else {  // fazer todos os selects possiveis para cada caso
        client.query("SELECT * FROM amostra WHERE UPPER(fornecedor) LIKE UPPER('%"+ produtor.value + "%')", (err, res) => {
            console.log(res);
            soma(res);
            preencher();
            tabela(res);
            client.end();
        })
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
    for (i = 0; i < res.rowCount; i++) {
        inteiro += res.rows[i].inteiro;
        tres_quartos += res.rows[i].tres_quartos;
        meio += res.rows[i].meio;
        um_quarto += res.rows[i].um_quarto;
        quirera += res.rows[i].quirera;
        com_casca += res.rows[i].com_casca;
        sem_casca += res.rows[i].sem_casca;
        total += res.rows[i].total;
        tipo1 += res.rows[i].tipo1;
        tipo2 += res.rows[i].tipo2;
        tipo3 += res.rows[i].tipo3;
        tipo4 += res.rows[i].tipo4;
        tipo5 += res.rows[i].tipo5;
        
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

function atualizarAmostra(){
    var ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.on('store-data', function (event,store) {
        const client2 = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'Arroz',
            password: 'ozne1711',
            port: 5432,
        })
        client2.connect();
        client2.query('SELECT * FROM imagem WHERE fk_amostra =' + store +'AND processada = true' , (err, res) => {
            console.log(res);
            tabelaAmostra(res);
            client2.end();
        })
    });
}

function tabelaAmostra(res){
    var template = document.querySelector("#templateAmostra");
    var a_img1 = document.createElement('button');
    var a_img2 = document.createElement('button');
    var a_img3 = document.createElement('button');
    for (i = 0; i < res.rowCount; i++) {
        lista_td = template.content.querySelectorAll("td");
        lista_td[0].textContent =  res.rows[i].inteiro;
        lista_td[1].textContent =  res.rows[i].tres_quartos;
        lista_td[2].textContent =  res.rows[i].meio;
        lista_td[3].textContent =  res.rows[i].um_quarto;
        lista_td[4].textContent =  res.rows[i].quirera;
        lista_td[5].textContent =  res.rows[i].com_casca;
        lista_td[6].textContent =  res.rows[i].sem_casca;
        lista_td[7].textContent =  res.rows[i].tipo1;
        lista_td[8].textContent =  res.rows[i].tipo2;
        lista_td[9].textContent =  res.rows[i].tipo3;
        lista_td[10].textContent =  res.rows[i].tipo4;
        lista_td[11].textContent =  res.rows[i].tipo5;
        lista_td[12].textContent =  res.rows[i].total;
        a_img1.innerHTML = '<img src="' + res.rows[i].caminho_img1 +'" width="128" height="72">';
        a_img1.setAttribute('class', 'm-0 p-0');
        a_img1.setAttribute('onclick', "abreImg("+"'" + res.rows[i].caminho_img1 + "'"+")");
        lista_td[13].innerHTML = "";
        lista_td[13].appendChild(a_img1);
        a_img2.innerHTML = '<img src="' + res.rows[i].caminho_img2 +'" width="128" height="72">';
        a_img2.setAttribute('class', 'm-0 p-0');
        a_img2.setAttribute('onclick', "abreImg("+"'" + res.rows[i].caminho_img2 + "'"+")");
        lista_td[14].innerHTML = "";
        lista_td[14].appendChild(a_img2);
        a_img3.innerHTML = '<img src="' + res.rows[i].caminho_img3 +'" width="128" height="72">';
        a_img3.setAttribute('class', 'm-0 p-0');
        a_img3.setAttribute('onclick', "abreImg("+"'" + res.rows[i].caminho_img3 + "'"+")");
        lista_td[15].innerHTML = "";
        lista_td[15].appendChild(a_img3);
        var nova_linha = document.importNode(template.content, true);
        corpo_tabela.appendChild(nova_linha);
    }
}

function tabela(res){
    var template = document.querySelector("#template");
    var lb_inp = document.createElement('button');
    document.querySelector("tbody").innerHTML = "";
    for (i = 0; i < res.rowCount; i++) {
        lista_td = template.content.querySelectorAll("td");
        //lista_td[0].textContent =  res.rows[i].data;
        lista_td[0].textContent =  res.rows[i].fornecedor;
        lista_td[1].textContent =  "28/04/2021";
        lista_td[2].textContent =  res.rows[i].codigo;
        lista_td[3].textContent =  res.rows[i].inteiro;
        lista_td[4].textContent =  res.rows[i].tres_quartos;
        lista_td[5].textContent =  res.rows[i].meio;
        lista_td[6].textContent =  res.rows[i].um_quarto;
        lista_td[7].textContent =  res.rows[i].quirera;
        lista_td[8].textContent =  res.rows[i].com_casca;
        lista_td[9].textContent =  res.rows[i].sem_casca;
        lista_td[10].textContent =  res.rows[i].tipo1;
        lista_td[11].textContent =  res.rows[i].tipo2;
        lista_td[12].textContent =  res.rows[i].tipo3;
        lista_td[13].textContent =  res.rows[i].tipo4;
        lista_td[14].textContent =  res.rows[i].tipo5;
        lista_td[15].textContent =  res.rows[i].total;
        lb_inp.innerHTML = 'Ver mais';
        lb_inp.setAttribute('onclick', 'createBrowserWindow('+res.rows[i].id+')');
        lb_inp.setAttribute('class', 'btn btn-primary btn-sm');
        lista_td[16].innerHTML = "";
        lista_td[16].appendChild(lb_inp);
        var nova_linha = document.importNode(template.content, true);
        corpo_tabela.appendChild(nova_linha);
    }
}

function abreImg(caminho) {
    console.log(caminho);
    const { BrowserWindow } = require('electron').remote;
    const win = new BrowserWindow({
        height: 480,
        width: 640
    });
    win.loadURL(`file://${__dirname}/`+caminho);
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
    console.log(id);
    win.webContents.on('did-finish-load', ()=>{
        win.webContents.send('store-data', id);
    })
    win.loadURL(`file://${__dirname}/../examples/amostras.html`);
}
