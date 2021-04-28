const mensagem = document.querySelector('#mensagem');
const mensagemAlta = document.querySelector('#mensagemAlta');
const total_span = document.querySelector('#total');
const inteiro_span = document.querySelector('#inteiro');
const tres_quartos_span = document.querySelector('#tres_quartos');
const meio_span = document.querySelector('#meio');
const um_quarto_span = document.querySelector('#um_quarto');
const quirera_span = document.querySelector('#quirera');
const com_casca_span = document.querySelector('#com_casca');
const sem_casca_span = document.querySelector('#sem_casca');
const p_com_casca_span = document.querySelector('#p_com_casca');

const data_inicio = document.querySelector('#data_inicio');
const data_fim = document.querySelector('#data_fim');

const corpo_tabela = document.querySelector("tbody");

const { Pool, Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Arroz',
    password: 'ozne1711',
    port: 5432,
})

const client2 = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Arroz',
    password: 'ozne1711',
    port: 5432,
})
//novo cliente para fazer query para a tabela de imagens

inteiro = 0;
tres_quartos = 0;
meio = 0;
um_quarto = 0;
quirera = 0;
com_casca = 0;
sem_casca = 0;
total = 0;

function bin2string(array) {
    var result = "";
    for (var i = 0; i < array.length; ++i) {
        result += (String.fromCharCode(array[i]));
    }
    return result;
}

function atualizarAnalise() {

    client.connect();

    if ((data_fim.value != "") && (data_inicio.value != "")) {  // fazer todos os selects possiveis para cada caso
        client.query('SELECT * FROM amostra', (err, res) => {
            soma(res);
            tabela(res);
            preencher();
            client.end();
        })
    }

    client.query('SELECT * FROM amostra', (err, res) => {
        soma(res);
        tabela(res);
        preencher();
        client.end();
    })
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
    for (i = 0; i < res.rowCount; i++) {
        inteiro += res.rows[i].inteiro;
        tres_quartos += res.rows[i].tres_quartos;
        meio += res.rows[i].meio;
        um_quarto += res.rows[i].um_quarto;
        quirera += res.rows[i].quirera;
        com_casca += res.rows[i].com_casca;
        sem_casca += res.rows[i].sem_casca;
        total += res.rows[i].total;
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
    p_com_casca_span.innerHTML = ((com_casca / total) * 100).toPrecision(3) + "%";
}

function amostra(id) {
    createBrowserWindow();

    client2.connect();
    client2.query('SELECT * FROM imagem WHERE fk_amostra =' + id, (err, res) => {
        console.log(res)
        //fazer todo o preenchimento da tabela ...
        client2.end();
    })
}

function tabela(res){
    var template = document.querySelector("#template");
    for (i = 0; i < res.rowCount; i++) {
        lista_td = template.content.querySelectorAll("td");
        //lista_td[0].textContent =  res.rows[i].data;
        lista_td[0].textContent =  "28/04/2021";
        lista_td[1].textContent =  res.rows[i].codigo;
        lista_td[2].textContent =  res.rows[i].inteiro;
        lista_td[3].textContent =  res.rows[i].tres_quartos;
        lista_td[4].textContent =  res.rows[i].meio;
        lista_td[5].textContent =  res.rows[i].um_quarto;
        lista_td[6].textContent =  res.rows[i].quirera;
        lista_td[7].textContent =  res.rows[i].com_casca;
        lista_td[8].textContent =  res.rows[i].sem_casca;
        lista_td[9].textContent =  res.rows[i].tipo1;
        lista_td[10].textContent =  res.rows[i].tipo2;
        lista_td[11].textContent =  res.rows[i].tipo3;
        lista_td[12].textContent =  res.rows[i].tipo4;
        lista_td[13].textContent =  res.rows[i].tipo5;
        lista_td[14].textContent =  res.rows[i].total;
        var lb_inp = document.createElement('button');
        lb_inp.innerHTML = 'Imagem';
        lb_inp.setAttribute('onclick', 'amostra('+1+')');
        lb_inp.setAttribute('class', 'btn btn-primary btn-lg active)');
        lista_td[15].appendChild(lb_inp);
        var nova_linha = document.importNode(template.content, true);
        corpo_tabela.appendChild(nova_linha);
    }
}

function abreImg() {
    const { BrowserWindow } = require('electron').remote;
    const win = new BrowserWindow({
        height: 480,
        width: 640
    });
    win.loadURL(`file://${__dirname}/../fotos/aaaaaa.jpg`);
}

function createBrowserWindow() {
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
    win.loadURL(`file://${__dirname}/../examples/amostras.html`);
}

function ligar() {
    var net = require('net');
    var client = new net.Socket();

    client.connect(5001, '127.0.0.1', function () {
        console.log('Connected');
        client.write("ligar");
    });

    client.on('data', function (data) {
        console.log('Received: ' + data);
        resposta = bin2string(data);
        client.write("recebido");
        console.log(resposta);
        //alert(resposta);
        client.destroy();
    });

    client.on('close', function () {
        console.log('Connection closed');
    });
};

function desligar() {
    var net = require('net');
    var client = new net.Socket();

    client.connect(5001, '127.0.0.1', function () {
        console.log('Connected');
        client.write("desligar");
    });

    client.on('data', function (data) {
        console.log('Received: ' + data);
        resposta = bin2string(data);
        client.write("recebido");
        console.log(resposta);
        //alert(resposta);
        client.destroy();
    });

    client.on('close', function () {
        console.log('Connection closed');
    });
};