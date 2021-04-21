const { Router } = require('express');

const { getAllTypes, getPokemonsOfType } = require('../services/Type');
const responseManager = require('./Response');

const router = Router();

router.route('/').get((req, res) => {
  const result = getAllTypes();
  res.status(200).send(result);
});

router.route('/:typeName').get((req, res) => {
  responseManager(getPokemonsOfType, res, 200, [req.params.typeName]);
});

module.exports = router;
