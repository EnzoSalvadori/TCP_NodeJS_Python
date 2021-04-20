#Servidor TCP
import socket
# Endereco IP do Servidor
HOST = ''
# Porta que o Servidor vai escutar
PORT = 5001
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
orig = (HOST, PORT)
tcp.bind(orig)
tcp.listen(2)

maquina = False

print("iniciando servidor")

while True:
	
	con, cliente = tcp.accept()
	print ('Concetado por ', cliente)
	while True:
		data = con.recv(1024)

		if data == (b'recebido'):
			break

		if data == (b'ligar'):
			if maquina == False:
				print("Ligando a maquina")
				data = b'Maquina foi ligada'
				maquina = True
				con.sendall(data)
			elif maquina == True:
				print("A maquina ja esta ligada")
				data = b'A maquina ja esta ligada'
				con.sendall(data)

		if data == (b'desligar'):
			if maquina == False:
				print("A maquina ja esta desligada")
				data = b'A maquina ja esta desligada'
				con.sendall(data)
			elif maquina == True:
				print("Desligando a maquina")
				data = b'desligando a maquina'
				maquina = False
				con.sendall(data)

	print ('Finalizando conexao do cliente', cliente)
	con.close()