const express = require('express');
const router = express.Router();
const zcash = require('../model/zcash')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function (req,res) {
  res.send('test')
})

router.get('/newAddress', function(req, res) {
  const zaddr = zcash.newAddress()
  const zkey  = zcash.exportKey(zaddr)
  res.redirect(`/show/${zkey}/?address=${zaddr}`)
})

router.post('/send', function (req,res) {
  const zaddr = req.body.zaddr
  const zkey = req.body.zkey
  const to = req.body.to
  const amount = parseFloat(req.body.amount)
  zcash.importKey(zkey)
  if(zcash.exportKey(zaddr) != zkey)
    res.send('херня какая-то c парой адрес-значение')
  if(!zcash.isValie(to))
    res.send('с получателем херня какая-то')
  let opid = zcash.send(zaddr,to,amount)
  res.redirect(`/opid/${opid}`)
})

router.get('/open',function (req,res){
  const zaddr = req.query.zaddr
  const zkey  = req.query.zkey
  res.redirect(`/show/${zkey}/?address=${zaddr}`)
})

router.get('/opid/:opid', function (req,res) {
  const opid = req.params.opid
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
