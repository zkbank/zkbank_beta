var express = require('express');
var router = express.Router();
const zcash = require('../model/zcash')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/newAddress', function(req, res) {
  res.redirect(`/address/234123`)
})

router.post('/send', function (req,res) {
  let pk = req.body.privateKey
  res.send( zcash.send() )
})

router.get('/address/:privateKey',function (req,res) {
  res.render('send',{
    balance: zcash.balance(req.params.privateKey)
  })
})

module.exports = router;
