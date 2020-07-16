"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { clients } = require("./data/clients");
const { v4: uuidv4 } = require("uuid");

const { words } = require("./data/words");
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
  let number = Math.floor(Math.random() * 11);
  const chosenWord = {
    id: words[number].id,
    letterCount: words[number].letterCount,
  };
  console.log("words", words);
  console.log("number", number);
  console.log("chosenword", chosenWord);
  return res.json(chosenWord);
};

const wordChecker = (req, res) => {
  // console.log("req", req);
  let foundWordId = req.params.id;
  let guessedLetter = req.params.letter;
  const foundWord = words.find((element) => {
    console.log("elementid", element.id);
    console.log("foundwordId", foundWordId);
    return element.id === foundWordId;
  });

  let wordArray = foundWord.word.split("");

  let testResult = wordArray.map((letter) => {
    if (letter === guessedLetter) {
      return true;
    } else {
      return false;
    }
  });
  return res.json(testResult);
};

/*
receive the id and guessed letter
select the object in the words array based on id match (make foundWord)
check if guessed letter is in foundWord

if its a string, you can try calling array method; if this doesn't work, split it into an array,
and loop through that array of letters checking for a match, and return an array of booleans
describing the result of that test

send back array of booleans

make a an empty boolArray = {}
loop through word array[]
loop through it, if word[i] === word at re.params, do bool array.push true, else push false
*/

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

  .get("/hangman/word", hangmanHandler)

  .get("/hangman/guess/:id/:letter", wordChecker)

  .listen(8000, () => console.log(`Listening on port 8000`));
