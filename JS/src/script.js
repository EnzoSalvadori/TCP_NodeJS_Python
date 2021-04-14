const mensagem = document.querySelector('#mensagem');
const mensagemAlta = document.querySelector('#mensagemAlta');

function bin2string(array){
	var result = "";
	for(var i = 2; i < array.length - 1; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}

function enviar(){

    var net = require('net');
    var client = new net.Socket();

    mensagemAlta.innerHTML = '';
    var alta = "";

    client.connect(5001, '127.0.0.1', function() {
        console.log('Connected');
        client.write(mensagem.value);
    });
    client.on('data', function(data) {
        console.log('Received: ' + data);
        alta = bin2string(data);
        client.write("sair");
        client.destroy();
        let result = document.createTextNode(alta);
        return mensagemAlta.appendChild(result);
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
};