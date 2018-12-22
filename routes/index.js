var express = require('express');
var router = express.Router();
const zcash = require('../model/zcash')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/newAddress', function(req, res) {
  let zaddr = zcash.newAddress()
  let zkey  = zcash.exportKey(zaddr)
  res.redirect(`/show/${zkey}/?address=${zaddr}`)
})

router.post('/send', function (req,res) {
  let pk = req.body.privateKey
  res.send( zcash.send() )
})

router.get('/test', function(req,res) {
  let zaddr = zcash.newAddress()
  let zkey  = zcash.exportKey(zaddr)
  res.send({
    zaddr:zaddr,
    zkey:zkey
  })
})

router.get('/open',function (req,res){
  let zaddr = req.query.zaddr
  let zkey  = req.query.zkey
  res.redirect(`/show/${zkey}/?address=${zaddr}`)
})

router.get('/show/:privateKey',function (req,res) {
  let privateKey = req.params.privateKey
  let address = req.query.address
  zcash.importKey(privateKey)
  if(zcash.exportKey(address) != privateKey)
    res.send('херня какая-то')
  else
    res.render('send',{
      balance: zcash.getBalance(address),
      zaddr: address,
      zkey: privateKey
    })
})

module.exports = router;
