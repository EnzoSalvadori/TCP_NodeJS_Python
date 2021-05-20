var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('arroz');

db.serialize(function () {
    var d = new Date();
    var d2 = d.toLocaleDateString();
    /*db.run("CREATE TABLE amostra (id INTEGER PRIMARY KEY AUTOINCREMENT,codigo TEXT,fornecedor TEXT, descricao TEXT,data_g DATE,inteiro INTEGER,tres_quartos INTEGER,meio INTEGER,um_quarto INTEGER,quirera INTEGER,com_casca INTEGER,sem_casca INTEGER,total INTEGER,tipo1 INTEGER,tipo2 INTEGER,tipo3 INTEGER,tipo4 INTEGER,tipo5 INTEGER, fk_usuario INTEGER)");
    db.run("CREATE TABLE imagem (id INTEGER PRIMARY KEY AUTOINCREMENT,data_g DATE,caminho_img1 TEXT,caminho_img2 TEXT,caminho_img3 TEXT,inteiro INTEGER,tres_quartos INTEGER,meio INTEGER,um_quarto INTEGER,quirera INTEGER,com_casca INTEGER,sem_casca INTEGER,total INTEGER,tipo1 INTEGER,tipo2 INTEGER,tipo3 INTEGER,tipo4 INTEGER,tipo5 INTEGER, processada BOOLEAN, fk_amostra INTEGER)");
    db.run("CREATE TABLE usuario (id INTEGER PRIMARY KEY AUTOINCREMENT,nome TEXT,senha TEXT)");
    insert = db.prepare("INSERT INTO usuario (nome,senha)VALUES (?,?)");
    insert.run("Enzo","12345");
    insert.run("Lin","54321");
    insert = db.prepare("INSERT INTO amostra (codigo,fornecedor,descricao,data_g,inteiro,tres_quartos,meio,um_quarto,quirera,com_casca,sem_casca,tipo1,tipo2,tipo3,tipo4,tipo5,total,fk_usuario)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    insert.run("123","João Henrrique","amostra bla bla",d2,100,100,100,100,100,250,250,100,100,100,100,100,500,1);
    insert.run("456","Paulo","amostra bla bla",d2,100,100,100,100,100,250,250,100,100,100,100,100,500,2);
    insert.run("789","Pedro","amostra bla bla",d2,100,0,100,0,100,300,0,0,100,0,100,100,300,1);
    insert = db.prepare("INSERT INTO imagem(data_g,caminho_img1,caminho_img2,caminho_img3,inteiro,tres_quartos,meio,um_quarto,quirera,com_casca,sem_casca,tipo1,tipo2,tipo3,tipo4,tipo5,total,processada,fk_amostra)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    insert.run(d2,"../fotos/1/aaaaaa.jpg","../fotos/1/aaaaaa.jpg","../fotos/1/aaaaaa.jpg",50,50,50,50,50,125,125,50,50,50,50,50,250,true,1);
    insert.run(d2,"../fotos/1/aaaaaa.jpg","../fotos/1/aaaaaa.jpg","../fotos/1/aaaaaa.jpg",50,50,50,50,50,125,125,50,50,50,50,50,250,true,1);
    insert.run(d2,"../fotos/2/aaaaaa.jpg","../fotos/2/aaaaaa.jpg","../fotos/2/aaaaaa.jpg",25,25,25,25,25,62,63,25,25,25,25,25,125,true,2);
    insert.run(d2,"../fotos/2/aaaaaa.jpg","../fotos/2/aaaaaa.jpg","../fotos/2/aaaaaa.jpg",25,25,25,25,25,62,63,25,25,25,25,25,125,true,2);
    insert.run(d2,"../fotos/2/aaaaaa.jpg","../fotos/2/aaaaaa.jpg","../fotos/2/aaaaaa.jpg",25,25,25,25,25,63,62,25,25,25,25,25,125,true,2);
    insert.run(d2,"../fotos/2/aaaaaa.jpg","../fotos/2/aaaaaa.jpg","../fotos/2/aaaaaa.jpg",25,25,25,25,25,63,62,25,25,25,25,25,125,true,2);
    insert.run(d2,"../fotos/3/aaaaaa.jpg","../fotos/3/aaaaaa.jpg","../fotos/3/aaaaaa.jpg",100,0,100,0,100,300,0,0,100,0,100,100,300,true,3);
    */
    
    db.all("SELECT * FROM amostra",
    (error, res) => {
        console.log(res[0].data_g);
    });
});
db.close;

