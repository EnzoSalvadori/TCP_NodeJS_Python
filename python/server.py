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
while True:
	
	con, cliente = tcp.accept()
	print ('Concetado por ', cliente)
	while True:
		data = con.recv(1024)

		if data == (b'sair'):
			break

		if data:
			print(str(data))
			print(type(data))
			data = str(data).upper()
			data = bytes(data, 'utf-8')
			con.sendall(data)

	print ('Finalizando conexao do cliente', cliente)
	con.close()