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
  let zaddr = req.body.zaddr
  let zkey = req.body.zkey
  let to = req.body.to
  let amount = parseFloat(req.body.amount)
  zcash.importKey(zkey)
  if(zcash.exportKey(zaddr) != zkey)
    res.send('херня какая-то c парой адрес-значение')
  if(!zcash.isValie(to))
    res.send('с получателем херня какая-то')
  let opid = zcash.send(zaddr,to,amount)
  res.redirect(`/opid/${opid}`)
})

router.get('/test', function(req,res) {
  res.send('мазафака')
})

router.get('/open',function (req,res){
  let zaddr = req.query.zaddr
  let zkey  = req.query.zkey
  res.redirect(`/show/${zkey}/?address=${zaddr}`)
})

router.get('/opid/:opid', function (req,res) {
  let opid = req.params.opid
  res.render('opid',zcash.getOperationStatus(opid))
})

router.get('/show/:privateKey',function (req,res) {
  let zkey = req.params.privateKey
  let zaddr = req.query.address
  zcash.importKey(zkey)
  if(zcash.exportKey(zaddr) != zkey)
    res.send('херня какая-то')
  else
    res.render('send',{
      balance: zcash.getBalance(zaddr),
      zaddr: zaddr,
      zkey: zkey
    })
})

module.exports = router;
