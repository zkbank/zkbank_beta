const express = require('express');
const router = express.Router();
const zcash = require('../model/zcash')

// Should be removed when PAVLIK does his thing
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');


router.get('/', function(req, res, next) {
  var IndexPage = fs.readFileSync(path.join(__dirname, '..', 'views/index.ejs'), 'utf-8');
  res.end(ejs.render(IndexPage, { title: 'Zero-Knowledge Bank' }));
});

router.get('/testPT', function(req, res, next) {
  let TestPage = fs.readFileSync(path.join(__dirname, '..', 'views/test.ejs'), 'utf-8');
  res.end(ejs.render(TestPage, { title: 'Zero-Knowledge Bank' }));
});

router.get('/newZAddress', function(req, res) {
  const zaddr = zcash.newZAddress()
  const zkey  = zcash.exportZAddress(zaddr)
  res.redirect(`/show/${zkey}/?address=${zaddr}`)
})

router.get('/newTAddress', function(req, res) {
  const zaddr = zcash.newTAddress()
  const zkey  = zcash.exportTAddress(zaddr)
  res.redirect(`/show/${zkey}`)
})


router.post('/send', function (req,res) {
  const zaddr = req.body.zaddr
  const zkey = req.body.zkey
  const to = req.body.to
  const amount = parseFloat(req.body.amount)
    zcash.importZAddress(zkey)
    if(zcash.exportZAddress(zaddr) != zkey && zcash.exportTAddress(zaddr)!= zkey)
      res.send('Incorrect wallet/key pair')
    else if(!zcash.isValid(to))
      res.send('Incorrect recepient')
    else{
      let opid = zcash.send(zaddr,to,amount)
      res.redirect(`/opid/${opid}`)
    }
})

router.get('/open',function (req,res){
  const zaddr = req.query.zaddr
  const zkey  = req.query.zkey
  res.redirect(`/show/${zkey}/?address=${zaddr}`)
})

router.get('/opid/:opid', function (req,res) {
  const opid = req.params.opid
    let OpidPage = fs.readFileSync(path.join(__dirname, '..', 'views/opid.ejs'), 'utf-8')
    res.end(ejs.render(OpidPage, zcash.getOperationStatus(opid)))
  /*res.render('opid',zcash.getOperationStatus(opid))*/
})

router.get('/show/:privateKey',function (req,res) {
  let zkey = req.params.privateKey
  let taddr = zcash.importTAddress(zkey)
  let addr = taddr || req.query.address
    let WalletPage = fs.readFileSync(path.join(__dirname, '..', 'views/wallet.ejs'), 'utf-8')

  if(taddr){
    res.end(ejs.render(WalletPage, {
       title: 'Wallet — Zero-Knowledge Bank',
       balance: zcash.getBalance(addr),
       zaddr: addr,
       zkey: zkey
    }))
  }
  else{
    zcash.importZAddress(zkey)
    if( zcash.exportZAddress(addr) != zkey)
      res.send('Incorrect wallet')
    else
      res.end(ejs.render(WalletPage, {
         title: 'Wallet — Zero-Knowledge Bank',
         balance: zcash.getBalance(addr),
         zaddr: addr,
         zkey: zkey
      }))
      /* res.render('send',{
        balance: zcash.getBalance(addr),
        zaddr: addr,
        zkey: zkey
      })*/
  }


})

module.exports = router;
