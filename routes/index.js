const express = require('express');
const router = express.Router();
const db=require('../database');


router.get('/', function(req, res, next) {
  const query='SELECT * FROM produk order by nama_produk asc';
  db.query(query, function (err, data, fields) {

    if (err) throw err;

  res.render('index', { userData: data});
  });

});
router.post("/add", function(req, res, next) {
  const {nama,keterangan,harga,jumlah} = req.body;
  const query = `INSERT INTO produk (nama_produk,keterangan,harga,jumlah) VALUES ('${nama}','${keterangan}','${harga}','${jumlah}')`;

  db.query(query, function (err, data, fields) {
    if (err){
      res.send({"status":"error","message":"database error"});
    }

    res.send({status: 'success', "message": "data added"});
  })
})


router.put('/edit/:name', function(req, res, next) {
  let {name} = req.params;
  const {keterangan,harga,jumlah} = req.body;

  console.log(req.body);
  const query = `UPDATE produk SET keterangan='${keterangan}',harga='${harga}',jumlah='${jumlah}' WHERE nama_produk='${name}'`;

  db.query(query, function (err, data, fields) {
    if (err){
      res.send({"status":"error","message":"database error"});
    }

    res.send({status: 'success', "message": "data edited"});
  });
});

router.delete('/delete/:name', function(req, res, next) {
  let {name} = req.params;
  name = decodeURI(name);

  const query = `DELETE FROM produk WHERE nama_produk='${name}'`;
  db.query(query, function (err, data, fields) {
    if (err){
      res.send({"status":"error","message":"database error"});
    }

    res.send({status: 'success', "message": "data deleted"});
  });
});




module.exports = router;