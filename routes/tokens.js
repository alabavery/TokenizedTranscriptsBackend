const express = require('express');
const tokensRouter = express.Router();
const fs = require('fs');

tokensRouter.post('/', (req, res) => {
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
module.exports = tokensRouter;
