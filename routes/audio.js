const express = require('express');
const audioRoute = express.Router();
const multer = require('multer');
// this is just the destination directory to save to, NOT the url to post to
let upload = multer({ dest: 'audioUploads/' });

audioRoute.post('/', upload.single('track'), function (req, res, next) {
  // this will only work for multipart/form-data requests
  //
  // req.file is the `track` file according to the docs... -- I haven't gotten this to work yet, primarily because I
  // don't know how to send a file with a mp/form req.
  //
  // req.body will hold the text fields, if there were any. If you send a multipart/form-data req from postman,
  // this will print a json looking object with the keys and vals to the console
  console.log(req.body);
});

module.exports = audioRoute;
