const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fatec",
  database: "portifolio",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao MySQL!");
});

//ok
app.get("/", (req, res) => {
  res.render("index");
});

//ok

app.post("/projetos", (req, res) => {
  const { nome, descricao } = req.body;
  const sql = "INSERT INTO projetos (nome, descricao) VALUES (?, ?)";
  db.query(sql, [nome, descricao], (err, result) => {
    if (err) return res.status(500).send(err);
    res.redirect(`/projetos/${result.insertId}`);
  });
});

//ok
app.get("/projetos", (req, res) => {
  db.query("SELECT * FROM projetos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.render("projetos", { projetos: results });
  });
});

//ok
app.get("/projetos/:id", (req, res) => {
  db.query(
    "SELECT * FROM projetos WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0)
        return res.status(404).send({ mensagem: "Projeto não encontrado" });

      res.render("projeto", {
        id: result[0].id,
        projetoName: result[0].nome,
        descricao: result[0].descricao,
      });
    }
  );
});

//ok
app.post("/projetos/delete/:id", (req, res) => {
  db.query("DELETE FROM projetos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);

    res.redirect("/projetos");
  });
});

// UPDATE

app.post("/projetos/update/:id", (req, res) => {
  const { nome, descricao } = req.body;
  const sql = "UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?";
  db.query(sql, [nome, descricao, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/projetos/" + req.params.id);
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
