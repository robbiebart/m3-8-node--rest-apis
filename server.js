"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { clients } = require("./data/clients");
const { v4: uuidv4 } = require("uuid");

/*
const handleHomepage = (req, res) => {
  console.log(users);
  res
    .status(200)
    .render("pages/homepage", { users: users, myName: "Daniel", currentUser }); // what's happening here?
};
};
*/

const clientHandler = (req, res) => {
  res.status(200).send({ clients: clients });
};

const singleClientHandler = (req, res) => {
  const matchingClient = clients.find((client) => {
    return client.id === req.params.id;
  });
  res.status(200).send({ matchingClient });
};

const addClientHandler = (req, res) => {
  const newClient = req.body;
  newClient.id = uuidv4();
  let duplicateEmail = clients.find((client) => {
    return client.email === newClient.email;
  });

  if (duplicateEmail !== undefined) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: "duplicate email",
    });
  }

  clients.push(newClient);
  res.status(200).send({ clients: clients });
};

const hangmanHandler = (req, res) => {
  
}

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/clients", clientHandler)

  .get("/clients/:id", singleClientHandler)

  .post("/clients/add", addClientHandler)

  .get("/hangman/word/:id", hangmanHandler)

  .listen(8000, () => console.log(`Listening on port 8000`));
