var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usuariosController")


/* GET users listing. */
router.post('/registro', usersController.registro);
router.post('/login', usersController.login);
module.exports = router;
