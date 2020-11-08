const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");
//const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

// Criador da lista de repositórios
const repositories = [];

app.get("/repositories", (request, response) => {

  // Retornar apenas a variável "repositories" enquanto o filtro não estiver preparado.
  return response.json(repositories)
});

// Criador de repositórios.
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);


  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex((repository) => repository.id == id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }



  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  };

  repositories[repoIndex] = repository;

  return response.json(repository)

});



app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repository) => repository.id == id)

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Bad Request" });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).json({ error: "No Content" });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repository) => repository.id == id);

  if (repoIndex == -1) {
    response.status(400).send("Bad request")
  }

  repositories[repoIndex].likes++;


  return response.json(repositories[repoIndex])

});

module.exports = app;
