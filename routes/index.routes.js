const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//ITERATION 3
//GET route for searching for 1 character
router.get('/all', (req, res, next) => {
  axios
    .get('http://localhost:8000/characters')
    .then((results) => {
      console.log(results.data);
      res.render('index', { allCharacters: results.data });
    })
    .catch((err) => {
      console.log(err);
    });
});

//ITERATION 4
//GET route for searching for 1 character
router.get('/search', (req, res, next) => {
  const { id } = req.query;
  axios
    .get(`http://localhost:8000/characters/${id}`)
    .then((results) => {
      res.render('index', { oneCharacter: results.data });
    })
    .catch((err) => {
      console.log(err);
    });
});

//ITERATION 5
//POST route for deleting 1 character
router.post('/search/delete', (req, res, next) => {
  const id = req.body.id;
  axios
    .delete(`http://localhost:8000/characters/${id}`)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});

//ITERATION 6
//POST route for creating a new character
router.post('/search/new-character', (req, res, next) => {
  const { name, occupation, cartoon, weapon } = req.body;
  axios.post(`http://localhost:8000/characters/`, { name, occupation, cartoon, weapon }).then(() => {
    res.redirect('/');
  });
});

//ITERATION 7
//POST route for editing 1 character
router.post('/search/edit', (req, res, next) => {
  axios.put(`http://localhost:8000/characters/${req.body.id}`, req.body).then(() => {
    res.redirect('/');
  });
});

module.exports = router;
