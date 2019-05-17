const express = require('express');
const router = express.Router();
const listaOggetti = require('../data/listaOggetti')

// Query
// http://localhost:2223/api/v1/todos/
router.get
(
  '/', 
  function(req, res, next)
  {
    res.send(listaOggetti)
  }
)

// Parametri
// http://localhost:2223/api/v1/todos/1
router.get
(
  '/:id',
  function (req, res)
  {
    const parametroID = Number(req.params.id)
    res.json
    ( 
        listaOggetti.listaOggetti.filter(lista => lista.id === parametroID)
    )
  }
)

// Metodo POST
// http://localhost:2223/api/v1/todos/form
router.post
(
  '/form',
  function (req, res)
  {
    const body = req.body
    const {
            id,
            titolo,
            descrizione
          } = req.body

  const status = {}
  console.log(id, titolo, descrizione)
  if (titolo)
  {
    status.code = 'ok'
    status.message = `Benvenuto ${titolo}`
  }
  else
  {
    status.code = 'error'
    status.message = 'Titolo non valido'
  }
  res.send(status)
})

// Update
// http://localhost:2223/api/v1/todos/1
router.put
(
  '/form/:id',
  function (req, res)
  {
    const body = req.body
    const {
            id,
            titolo,
            descrizione
          } = req.body

  const status = {}
  console.log(id, titolo, descrizione)
  if (titolo)
  {
    status.code = 'ok'
    status.message = `UPDATE`
  }
  else
  {
    status.code = 'error'
    status.message = 'UPDATE non è andato a buon fine'
  }
  
  res.send(status)
})

// Delete
// http://localhost:2223/api/v1/todos/1
router.delete
(
  '/form/:id',
  function (req, res)
  {
    const body = req.body
    const {
            id,
            titolo,
            descrizione
          } = req.body

  const status = {}
  console.log(id, titolo, descrizione)
  if (titolo)
  {
    status.code = 'ok'
    status.message = `DELETE`
  }
  else
  {
    status.code = 'error'
    status.message = 'DELETE non è andato a buon fine'
  }
  res.send(status)
})

module.exports = router