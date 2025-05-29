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

app.post("/projetos", (req, res) => {
  const { nome, descricao } = req.body;
  const sql = "INSERT INTO projetos (nome, descricao) VALUES (?, ?)";
  db.query(sql, [nome, descricao], (err, result) => {
    if (err) return res.status(500).send(err);
    res.render({ id: result.insertId, nome, descricao });
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

      res.render("projeto",{
        projetoName: result[0].nome,
        descricao: result[0].descricao,
      });
    }
  );
});
// if (req.params.projeto === "disney") {
//   res.render("projeto", {
//     projetoName: "Personagens Disney",
//     projetoIndentificador: req.params.projeto,
//     projetoImg: "/disney.png",
//     url: "https://disney-api-seven.vercel.app/",
//     descricao:
//       "Este projeto é uma aplicação de página única (SPA) desenvolvida para praticar o consumo eficiente de APIs externas. O objetivo é proporcionar aos usuários uma experiência simples e intuitiva, permitindo fácil acesso a informações detalhadas sobre personagens da Disney. A aplicação foi projetada com foco em desempenho, usabilidade e acessibilidade, utilizando tecnologias modernas para garantir uma navegação fluida e responsiva.",
//     tecnologias: [
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg",
//     ],
//   });
// }
// if (req.params.projeto === "url") {
//   res.render("projeto", {
//     projetoName: "Encurtador de URL",
//     projetoIndentificador: req.params.projeto,
//     projetoImg: "/url.png",
//     url: "https://url-short-three.vercel.app/",
//     descricao:
//       "Este projeto foi desenvolvido como parte de um desafio da Frontend Mentor, onde o principal objetivo foi criar uma página front-end seguindo um design fornecido no Figma. Além disso, a aplicação consome uma API externa para encurtar URLs, proporcionando uma experiência prática no consumo de APIs e na implementação de funcionalidades interativas e responsivas.",
//     tecnologias: [
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg",
//     ],
//   });
// }

// if (req.params.projeto === "trip") {
//   res.render("projeto", {
//     projetoName: "My Trips",
//     projetoIndentificador: req.params.projeto,
//     projetoImg: "/trip.png",
//     url: "https://my-trips-xi-three.vercel.app/",
//     descricao:
//       "Este projeto foi desenvolvido como parte de um curso focado em Next.js, onde aprendi a utilizar as diferentes camadas de renderização (estática, server-side e incremental). Além disso, o projeto integra a biblioteca de mapas Leaflet para exibir localizações de forma interativa, proporcionando uma experiência prática no uso de tecnologias modernas para desenvolvimento web.",
//     tecnologias: [
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
//     ],
//   });
// }
// if (req.params.projeto === "vereadores") {
//   res.render("projeto", {
//     projetoName: "Vereadores",
//     projetoIndentificador: req.params.projeto,
//     projetoImg: "/api.gif",
//     url: "https://github.com/matheuskarnas/api-1",
//     descricao:
//       "Este foi meu primeiro projeto na faculdade, onde simulamos o dia a dia do mercado de trabalho. Trabalhamos em equipe utilizando a metodologia Scrum, e tive o privilégio de atuar como Scrum Master. O projeto contou com um cliente interno e teve como objetivo técnico desenvolver um site para analisar o desempenho dos vereadores de São José dos Campos, auxiliando os eleitores na tomada de decisão de forma mais informada e prática.",
//     tecnologias: [
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg",
//     ],
//   });
// }
// if (req.params.projeto === "helpnei") {
//   res.render("projeto", {
//     projetoName: "Helpnei",
//     projetoIndentificador: req.params.projeto,
//     projetoImg: "/api2.png",
//     url: "https://unidos-helpnei.vercel.app/",
//     descricao:
//       "Este é meu segundo projeto na faculdade, com previsão de entrega em 25/05/2025, desenvolvido para um cliente real. O projeto foi conduzido utilizando a metodologia Scrum, onde atuei como Product Owner. O objetivo principal foi criar um site para monitorar o desempenho dos patrocinadores e seu impacto no empreendedorismo, além de facilitar a adesão de novos usuários e empresas patrocinadoras. O maior desafio foi trabalhar diretamente com um cliente real, compreendendo suas necessidades e expectativas. O projeto foi desenvolvido em equipe, utilizando metodologias ágeis para garantir uma entrega eficiente, de alta qualidade e alinhada às demandas do cliente.",
//     tecnologias: [
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
//       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
//       "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png",
//     ],
// });
// }
// });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
