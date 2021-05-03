var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('arroz');

db.serialize(function () {
    var d = new Date();
    var d2 = d.toLocaleDateString();
    //db.run("CREATE TABLE amostra (id INTEGER PRIMARY KEY AUTOINCREMENT,codigo TEXT,descricao TEXT,data DATE,inteiro INTEGER,tres_quartos INTEGER,meio INTEGER,um_quarto INTEGER,quirera INTEGER,com_casca INTEGER,sem_casca INTEGER,total INTEGER,tipo1 INTEGER,tipo2 INTEGER,tipo3 INTEGER,tipo4 INTEGER,tipo5 INTEGER, fk_fornecedor INTEGER, fk_usuario INTEGER)");
    //db.run("CREATE TABLE imagem (id INTEGER PRIMARY KEY AUTOINCREMENT,data DATE,caminho_img1 TEXT,caminho_img2 TEXT,caminho_img3 TEXT,inteiro INTEGER,tres_quartos INTEGER,meio INTEGER,um_quarto INTEGER,quirera INTEGER,com_casca INTEGER,sem_casca INTEGER,total INTEGER,tipo1 INTEGER,tipo2 INTEGER,tipo3 INTEGER,tipo4 INTEGER,tipo5 INTEGER, processada BOOLEAN, fk_amostra INTEGER)");

    //insert = db.prepare("INSERT INTO imagem(data,caminho_img1,caminho_img2,caminho_img3,inteiro,tres_quartos,meio,um_quarto,quirera,com_casca,sem_casca,tipo1,tipo2,tipo3,tipo4,tipo5,total,processada,fk_amostra)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    //insert.run(d2,"../fotos/aaaaaa.jpg","../fotos/aaaaaa.jpg","../fotos/aaaaaa.jpg",25,25,25,25,25,62,63,25,25,25,25,25,125,true,2);
    //db.run(" UPDATE imagem SET fk_amostra = 2 WHERE inteiro = 25");

    db.run("UPDATE  amostra SET codigo = "+1234+ ", fk_fornecedor = " +1+ ", descricao = " +"'amostra bla bla'"+ "WHERE id =" +1)
  
    db.all("SELECT * FROM amostra",
        (error, res) => {
            console.log(res[0].codigo);
    });
});
db.close;

