const mensagem = document.querySelector('#mensagem');
const mensagemAlta = document.querySelector('#mensagemAlta');
const total_span = document.querySelector('#total');
const inteiro_span = document.querySelector('#inteiro');
const tres_quartos_span = document.querySelector('#tres_quartos');
const meio_span = document.querySelector('#meio');
const um_quarto_span = document.querySelector('#um_quarto');
const quirera_span = document.querySelector('#quirera');

const data_inicio = document.querySelector('#data_inicio');
const data_fim = document.querySelector('#data_fim');

//var resposta; talvez depois precise mudar isso talvez deixar global???

inteiro = 0;
tres_quartos = 0;
meio = 0;
um_quarto = 0;
quirera = 0;
com_casca = 0; 
sem_casca = 0;
total = 0;

function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}

function atualizarAnalise(){
    const { Pool, Client } = require('pg');

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'Arroz',
        password: 'ozne1711',
        port: 5432,
    })

    client.connect();

    if ((data_fim.value != "") && (data_inicio.value != "")){  // fazer todos os selects possiveis para cada caso
        client.query('SELECT * FROM analise', (err, res) => {
            soma(res);
            preencher();
            client.end(); 
        })
    }

    client.query('SELECT * FROM analise', (err, res) => {
        soma(res);
        preencher();
        client.end(); 
    })
}

function soma(res){
    inteiro = 0;
    tres_quartos = 0;
    meio = 0;
    um_quarto = 0;
    quirera = 0;
    com_casca = 0; 
    sem_casca = 0;
    total = 0;
    for (i = 0; i < res.rowCount; i++) {
        console.log(res.rows[i]);
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

function preencher(){
    inteiro_span.innerHTML = inteiro;
    total_span.innerHTML = total;
    tres_quartos_span.innerHTML = tres_quartos;
    meio_span.innerHTML = meio;
    um_quarto_span.innerHTML = um_quarto;
    quirera_span.innerHTML = quirera;
}

function ligar(){
    var net = require('net');
    var client = new net.Socket();

    client.connect(5001, '127.0.0.1', function() {
        console.log('Connected');
        client.write("ligar");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        resposta = bin2string(data);
        client.write("recebido");
        console.log(resposta);
        //alert(resposta);
        client.destroy();
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
};

function desligar(){
    var net = require('net');
    var client = new net.Socket();

    client.connect(5001, '127.0.0.1', function() {
        console.log('Connected');
        client.write("desligar");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        resposta = bin2string(data);
        client.write("recebido");
        console.log(resposta);
        //alert(resposta);
        client.destroy();
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
};

const button = document.getElementById('imagen');
button.addEventListener('click', () => {
  createBrowserWindow();
});

function createBrowserWindow() {
  const {BrowserWindow} = require('electron').remote;
  const win = new BrowserWindow({
    height: 720,
    width: 1280
  });
  win.loadURL(`file://${__dirname}/../examples/login.html`);
}

