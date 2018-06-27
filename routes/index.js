const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  res.send('Hey! It woks!');
});

router.post('/saveJSON', (req, res) => {
  res.send('successfully sent json');
  //console.log("\n\n\nthe request", Object.keys(req));
  console.log("\n\n\nthe request", req.body);
  fs.writeFile(
    "/Users/al.avery/not_work_related/AudioPractice/AudioPracticeBackend/data.json",
    JSON.stringify(req.body),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
});

router.post('/saveFile', (req, res) => {
  console.log();
});

router.get('/addmove', rememberMoveController.fxn);



module.exports = router;
