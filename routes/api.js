var express = require('express');
var router = express.Router();
const BackgroundRemover = require('../controller/bgremover.js')
const multer  = require('multer')
const { body, validationResult } = require('express-validator');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

function uploadAsync(req,res){
  return new Promise(function(resolve,reject){
       upload(req,res,function(err){
          if(err !== undefined) return reject(err);
          resolve();
       });
  });
}

var upload = multer({ storage: storage }).single('image');
/* GET home page. */
router.post('/api/remove-background',  async function(req, res, next) {

  await uploadAsync(req, res);
  let bgRemove = new BackgroundRemover(req);
  let data = await bgRemove.removeBackground();
  res.json({'result' : data});
}); 

module.exports = router;
